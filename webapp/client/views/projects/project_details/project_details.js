var pageSession = new ReactiveDict();

Template.ProjectsProjectDetails.rendered = function() {

};

Template.ProjectsProjectDetails.events({

});

Template.ProjectsProjectDetails.helpers({

});

Template.ProjectsProjectDetailsDetailsForm.rendered = function() {


	pageSession.set("projectsProjectDetailsDetailsFormInfoMessage", "");
	pageSession.set("projectsProjectDetailsDetailsFormErrorMessage", "");

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

Template.ProjectsProjectDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("projectsProjectDetailsDetailsFormInfoMessage", "");
		pageSession.set("projectsProjectDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var projectsProjectDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(projectsProjectDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("projectsProjectDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("projectsProjectDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {



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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("projects", {});
	}


});

Template.ProjectsProjectDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("projectsProjectDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("projectsProjectDetailsDetailsFormErrorMessage");
	}

});
