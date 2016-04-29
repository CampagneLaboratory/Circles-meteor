var pageSession = new ReactiveDict();

Template.ModelsInsertModel.rendered = function() {
	
};

Template.ModelsInsertModel.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("models", {  });
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("models", {  });
	}
});

Template.ModelsInsertModel.helpers({
	
});

Template.ModelsInsertModelInsertNewModel.rendered = function() {
	

	pageSession.set("modelsInsertModelInsertNewModelInfoMessage", "");
	pageSession.set("modelsInsertModelInsertNewModelErrorMessage", "");

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

Template.ModelsInsertModelInsertNewModel.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modelsInsertModelInsertNewModelInfoMessage", "");
		pageSession.set("modelsInsertModelInsertNewModelErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modelsInsertModelInsertNewModelMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(modelsInsertModelInsertNewModelMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modelsInsertModelInsertNewModelInfoMessage", message);
					}; break;
				}
			}

			Router.go("models", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modelsInsertModelInsertNewModelErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Models.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("models", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("models", {});
	}

	
});

Template.ModelsInsertModelInsertNewModel.helpers({
	"infoMessage": function() {
		return pageSession.get("modelsInsertModelInsertNewModelInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modelsInsertModelInsertNewModelErrorMessage");
	}
	
});
