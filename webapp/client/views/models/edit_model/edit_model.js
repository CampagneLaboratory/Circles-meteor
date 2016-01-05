var pageSession = new ReactiveDict();

Template.ModelsEditModel.rendered = function() {
	
};

Template.ModelsEditModel.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("models", {  });
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("models", {  });
	}
});

Template.ModelsEditModel.helpers({
	
});

Template.ModelsEditModelEditModel.rendered = function() {
	

	pageSession.set("modelsEditModelEditModelInfoMessage", "");
	pageSession.set("modelsEditModelEditModelErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.ModelsEditModelEditModel.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modelsEditModelEditModelInfoMessage", "");
		pageSession.set("modelsEditModelEditModelErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modelsEditModelEditModelMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(modelsEditModelEditModelMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modelsEditModelEditModelInfoMessage", message);
					}; break;
				}
			}

			Router.go("models", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modelsEditModelEditModelErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Models.update({ _id: t.data.find_model._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("models", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("models", {});
	}

	
});

Template.ModelsEditModelEditModel.helpers({
	"infoMessage": function() {
		return pageSession.get("modelsEditModelEditModelInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modelsEditModelEditModelErrorMessage");
	}
	
});
