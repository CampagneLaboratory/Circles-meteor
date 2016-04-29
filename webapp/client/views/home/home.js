var pageSession = new ReactiveDict();

Template.Home.rendered = function() {
	
};

Template.Home.events({
	
});

Template.Home.helpers({
	
});

var HomeSummaryItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("HomeSummarySearchString");
	var sortBy = pageSession.get("HomeSummarySortBy");
	var sortAscending = pageSession.get("HomeSummarySortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "createdBy", "moduleId"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var HomeSummaryExport = function(cursor, fileType) {
	var data = HomeSummaryItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.HomeSummary.rendered = function() {
	pageSession.set("HomeSummaryStyle", "table");
	
};

Template.HomeSummary.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("HomeSummarySearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("HomeSummarySearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("HomeSummarySearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		HomeSummaryExport(this.list_projects, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		HomeSummaryExport(this.list_projects, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		HomeSummaryExport(this.list_projects, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		HomeSummaryExport(this.list_projects, "json");
	}

	
});

Template.HomeSummary.helpers({

	"insertButtonClass": function() {
		return Projects.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.list_projects || this.list_projects.count() == 0;
	},
	"isNotEmpty": function() {
		return this.list_projects && this.list_projects.count() > 0;
	},
	"isNotFound": function() {
		return this.list_projects && pageSession.get("HomeSummarySearchString") && HomeSummaryItems(this.list_projects).length == 0;
	},
	"searchString": function() {
		return pageSession.get("HomeSummarySearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("HomeSummaryStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("HomeSummaryStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("HomeSummaryStyle") == "gallery";
	}

	
});


Template.HomeSummaryTable.rendered = function() {
	
};

Template.HomeSummaryTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("HomeSummarySortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("HomeSummarySortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("HomeSummarySortAscending") || false;
			pageSession.set("HomeSummarySortAscending", !sortAscending);
		} else {
			pageSession.set("HomeSummarySortAscending", true);
		}
	}
});

Template.HomeSummaryTable.helpers({
	"tableItems": function() {
		return HomeSummaryItems(this.list_projects);
	}
});


Template.HomeSummaryTableItems.rendered = function() {
	
};

Template.HomeSummaryTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("projects", {});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Projects.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Projects.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.HomeSummaryTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Projects.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Projects.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
