var pageSession = new ReactiveDict();

Template.ModelsModelDetailsNodes.rendered = function() {
	
};

Template.ModelsModelDetailsNodes.events({
	
});

Template.ModelsModelDetailsNodes.helpers({
	
});

var ModelsModelDetailsNodesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ModelsModelDetailsNodesViewSearchString");
	var sortBy = pageSession.get("ModelsModelDetailsNodesViewSortBy");
	var sortAscending = pageSession.get("ModelsModelDetailsNodesViewSortAscending");
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

var ModelsModelDetailsNodesViewExport = function(cursor, fileType) {
	var data = ModelsModelDetailsNodesViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ModelsModelDetailsNodesView.rendered = function() {
	pageSession.set("ModelsModelDetailsNodesViewStyle", "table");
	
};

Template.ModelsModelDetailsNodesView.events({
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
				pageSession.set("ModelsModelDetailsNodesViewSearchString", searchString);
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
					pageSession.set("ModelsModelDetailsNodesViewSearchString", searchString);
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
					pageSession.set("ModelsModelDetailsNodesViewSearchString", "");
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
		ModelsModelDetailsNodesViewExport(this.find_nodes_model, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ModelsModelDetailsNodesViewExport(this.find_nodes_model, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ModelsModelDetailsNodesViewExport(this.find_nodes_model, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ModelsModelDetailsNodesViewExport(this.find_nodes_model, "json");
	}

	
});

Template.ModelsModelDetailsNodesView.helpers({

	"insertButtonClass": function() {
		return RootNodes.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.find_nodes_model || this.find_nodes_model.count() == 0;
	},
	"isNotEmpty": function() {
		return this.find_nodes_model && this.find_nodes_model.count() > 0;
	},
	"isNotFound": function() {
		return this.find_nodes_model && pageSession.get("ModelsModelDetailsNodesViewSearchString") && ModelsModelDetailsNodesViewItems(this.find_nodes_model).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ModelsModelDetailsNodesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ModelsModelDetailsNodesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("ModelsModelDetailsNodesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ModelsModelDetailsNodesViewStyle") == "gallery";
	}

	
});


Template.ModelsModelDetailsNodesViewTable.rendered = function() {
	
};

Template.ModelsModelDetailsNodesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ModelsModelDetailsNodesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ModelsModelDetailsNodesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ModelsModelDetailsNodesViewSortAscending") || false;
			pageSession.set("ModelsModelDetailsNodesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ModelsModelDetailsNodesViewSortAscending", true);
		}
	}
});

Template.ModelsModelDetailsNodesViewTable.helpers({
	"tableItems": function() {
		return ModelsModelDetailsNodesViewItems(this.find_nodes_model);
	}
});


Template.ModelsModelDetailsNodesViewTableItems.rendered = function() {
	
};

Template.ModelsModelDetailsNodesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("models.model_details.show_node", {modelId: UI._parentData(1).params.modelId, nodeId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		RootNodes.update({ _id: this._id }, { $set: values });

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
						RootNodes.remove({ _id: me._id });
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

Template.ModelsModelDetailsNodesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return RootNodes.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return RootNodes.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
