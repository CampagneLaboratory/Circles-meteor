var pageSession = new ReactiveDict();

Template.ModulesModuleDetailsModelsModule.rendered = function() {
	
};

Template.ModulesModuleDetailsModelsModule.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("models", {  });
	}
});

Template.ModulesModuleDetailsModelsModule.helpers({
	
});

var ModulesModuleDetailsModelsModuleModelsModuleViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewSearchString");
	var sortBy = pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewSortBy");
	var sortAscending = pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name"];
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

var ModulesModuleDetailsModelsModuleModelsModuleViewExport = function(cursor, fileType) {
	var data = ModulesModuleDetailsModelsModuleModelsModuleViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ModulesModuleDetailsModelsModuleModelsModuleView.rendered = function() {
	pageSession.set("ModulesModuleDetailsModelsModuleModelsModuleViewStyle", "table");
	
};

Template.ModulesModuleDetailsModelsModuleModelsModuleView.events({
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
				pageSession.set("ModulesModuleDetailsModelsModuleModelsModuleViewSearchString", searchString);
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
					pageSession.set("ModulesModuleDetailsModelsModuleModelsModuleViewSearchString", searchString);
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
					pageSession.set("ModulesModuleDetailsModelsModuleModelsModuleViewSearchString", "");
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
		ModulesModuleDetailsModelsModuleModelsModuleViewExport(this.find_models_module, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ModulesModuleDetailsModelsModuleModelsModuleViewExport(this.find_models_module, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ModulesModuleDetailsModelsModuleModelsModuleViewExport(this.find_models_module, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ModulesModuleDetailsModelsModuleModelsModuleViewExport(this.find_models_module, "json");
	}

	
});

Template.ModulesModuleDetailsModelsModuleModelsModuleView.helpers({

	"insertButtonClass": function() {
		return Models.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.find_models_module || this.find_models_module.count() == 0;
	},
	"isNotEmpty": function() {
		return this.find_models_module && this.find_models_module.count() > 0;
	},
	"isNotFound": function() {
		return this.find_models_module && pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewSearchString") && ModulesModuleDetailsModelsModuleModelsModuleViewItems(this.find_models_module).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewStyle") == "gallery";
	}

	
});


Template.ModulesModuleDetailsModelsModuleModelsModuleViewTable.rendered = function() {
	
};

Template.ModulesModuleDetailsModelsModuleModelsModuleViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ModulesModuleDetailsModelsModuleModelsModuleViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ModulesModuleDetailsModelsModuleModelsModuleViewSortAscending") || false;
			pageSession.set("ModulesModuleDetailsModelsModuleModelsModuleViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ModulesModuleDetailsModelsModuleModelsModuleViewSortAscending", true);
		}
	}
});

Template.ModulesModuleDetailsModelsModuleModelsModuleViewTable.helpers({
	"tableItems": function() {
		return ModulesModuleDetailsModelsModuleModelsModuleViewItems(this.find_models_module);
	}
});


Template.ModulesModuleDetailsModelsModuleModelsModuleViewTableItems.rendered = function() {
	
};

Template.ModulesModuleDetailsModelsModuleModelsModuleViewTableItems.events({
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

Template.ModulesModuleDetailsModelsModuleModelsModuleViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Models.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Models.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
