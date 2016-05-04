var pageSession = new ReactiveDict();

Template.ProjectsProjectDetailsModulesProject.rendered = function() {
	
};

Template.ProjectsProjectDetailsModulesProject.events({
	
});

Template.ProjectsProjectDetailsModulesProject.helpers({
	
});

var ProjectsProjectDetailsModulesProjectModulesProjectViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewSearchString");
	var sortBy = pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewSortBy");
	var sortAscending = pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "modelId"];
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

var ProjectsProjectDetailsModulesProjectModulesProjectViewExport = function(cursor, fileType) {
	var data = ProjectsProjectDetailsModulesProjectModulesProjectViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ProjectsProjectDetailsModulesProjectModulesProjectView.rendered = function() {
	pageSession.set("ProjectsProjectDetailsModulesProjectModulesProjectViewStyle", "table");
	
};

Template.ProjectsProjectDetailsModulesProjectModulesProjectView.events({
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
				pageSession.set("ProjectsProjectDetailsModulesProjectModulesProjectViewSearchString", searchString);
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
					pageSession.set("ProjectsProjectDetailsModulesProjectModulesProjectViewSearchString", searchString);
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
					pageSession.set("ProjectsProjectDetailsModulesProjectModulesProjectViewSearchString", "");
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
		ProjectsProjectDetailsModulesProjectModulesProjectViewExport(this.find_modules_project, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ProjectsProjectDetailsModulesProjectModulesProjectViewExport(this.find_modules_project, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ProjectsProjectDetailsModulesProjectModulesProjectViewExport(this.find_modules_project, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ProjectsProjectDetailsModulesProjectModulesProjectViewExport(this.find_modules_project, "json");
	}

	
});

Template.ProjectsProjectDetailsModulesProjectModulesProjectView.helpers({

	"insertButtonClass": function() {
		return Modules.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.find_modules_project || this.find_modules_project.count() == 0;
	},
	"isNotEmpty": function() {
		return this.find_modules_project && this.find_modules_project.count() > 0;
	},
	"isNotFound": function() {
		return this.find_modules_project && pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewSearchString") && ProjectsProjectDetailsModulesProjectModulesProjectViewItems(this.find_modules_project).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewStyle") == "gallery";
	}

	
});


Template.ProjectsProjectDetailsModulesProjectModulesProjectViewTable.rendered = function() {
	
};

Template.ProjectsProjectDetailsModulesProjectModulesProjectViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ProjectsProjectDetailsModulesProjectModulesProjectViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ProjectsProjectDetailsModulesProjectModulesProjectViewSortAscending") || false;
			pageSession.set("ProjectsProjectDetailsModulesProjectModulesProjectViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ProjectsProjectDetailsModulesProjectModulesProjectViewSortAscending", true);
		}
	}
});

Template.ProjectsProjectDetailsModulesProjectModulesProjectViewTable.helpers({
	"tableItems": function() {
		return ProjectsProjectDetailsModulesProjectModulesProjectViewItems(this.find_modules_project);
	}
});


Template.ProjectsProjectDetailsModulesProjectModulesProjectViewTableItems.rendered = function() {
	
};

Template.ProjectsProjectDetailsModulesProjectModulesProjectViewTableItems.events({
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

Template.ProjectsProjectDetailsModulesProjectModulesProjectViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Modules.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Modules.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
