var pageSession = new ReactiveDict();

Template.Models.rendered = function() {
	
};

Template.Models.events({
	
});

Template.Models.helpers({
	
});

var ModelsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ModelsViewSearchString");
	var sortBy = pageSession.get("ModelsViewSortBy");
	var sortAscending = pageSession.get("ModelsViewSortAscending");
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

var ModelsViewExport = function(cursor, fileType) {
	var data = ModelsViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ModelsView.rendered = function() {
	pageSession.set("ModelsViewStyle", "table");
	
};

Template.ModelsView.events({
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
				pageSession.set("ModelsViewSearchString", searchString);
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
					pageSession.set("ModelsViewSearchString", searchString);
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
					pageSession.set("ModelsViewSearchString", "");
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
		ModelsViewExport(this.list_models, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ModelsViewExport(this.list_models, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ModelsViewExport(this.list_models, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ModelsViewExport(this.list_models, "json");
	}

	
});

Template.ModelsView.helpers({

	"insertButtonClass": function() {
		return Models.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.list_models || this.list_models.count() == 0;
	},
	"isNotEmpty": function() {
		return this.list_models && this.list_models.count() > 0;
	},
	"isNotFound": function() {
		return this.list_models && pageSession.get("ModelsViewSearchString") && ModelsViewItems(this.list_models).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ModelsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ModelsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ModelsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ModelsViewStyle") == "gallery";
	}

	
});


Template.ModelsViewTable.rendered = function() {
	
};

Template.ModelsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ModelsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ModelsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ModelsViewSortAscending") || false;
			pageSession.set("ModelsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ModelsViewSortAscending", true);
		}
	}
});

Template.ModelsViewTable.helpers({
	"tableItems": function() {
		return ModelsViewItems(this.list_models);
	}
});


Template.ModelsViewTableItems.rendered = function() {
	
};

Template.ModelsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("models.model_details", {modelId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Models.update({ _id: this._id }, { $set: values });

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
						Models.remove({ _id: me._id });
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

Template.ModelsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Models.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Models.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
