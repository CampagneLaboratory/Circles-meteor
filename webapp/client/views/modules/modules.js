var pageSession = new ReactiveDict();

Template.Modules.rendered = function() {
	
};

Template.Modules.events({
	
});

Template.Modules.helpers({
	
});

var ModulesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ModulesViewSearchString");
	var sortBy = pageSession.get("ModulesViewSortBy");
	var sortAscending = pageSession.get("ModulesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "createdBy"];
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

var ModulesViewExport = function(cursor, fileType) {
	var data = ModulesViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ModulesView.rendered = function() {
	pageSession.set("ModulesViewStyle", "table");
	
};

Template.ModulesView.events({
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
				pageSession.set("ModulesViewSearchString", searchString);
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
					pageSession.set("ModulesViewSearchString", searchString);
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
					pageSession.set("ModulesViewSearchString", "");
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
		ModulesViewExport(this.list_modules, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ModulesViewExport(this.list_modules, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ModulesViewExport(this.list_modules, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ModulesViewExport(this.list_modules, "json");
	}

	
});

Template.ModulesView.helpers({

	"insertButtonClass": function() {
		return Modules.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.list_modules || this.list_modules.count() == 0;
	},
	"isNotEmpty": function() {
		return this.list_modules && this.list_modules.count() > 0;
	},
	"isNotFound": function() {
		return this.list_modules && pageSession.get("ModulesViewSearchString") && ModulesViewItems(this.list_modules).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ModulesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ModulesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ModulesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ModulesViewStyle") == "gallery";
	}

	
});


Template.ModulesViewTable.rendered = function() {
	
};

Template.ModulesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ModulesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ModulesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ModulesViewSortAscending") || false;
			pageSession.set("ModulesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ModulesViewSortAscending", true);
		}
	}
});

Template.ModulesViewTable.helpers({
	"tableItems": function() {
		return ModulesViewItems(this.list_modules);
	}
});


Template.ModulesViewTableItems.rendered = function() {
	
};

Template.ModulesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("modules.module_details", {moduleId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Modules.update({ _id: this._id }, { $set: values });

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
						Modules.remove({ _id: me._id });
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

Template.ModulesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Modules.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Modules.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	},

	"isLanguage": function() {
		return this.type === "language";
	},
	
	"isSolution": function() {
		return this.type === "solution";
	}
});
