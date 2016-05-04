var pageSession = new ReactiveDict();

Template.ModulesModuleDetails.rendered = function() {
	
};

Template.ModulesModuleDetails.events({
	
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("modules", {  });
	}
});

Template.ModulesModuleDetails.helpers({
	
});

Template.ModulesModuleDetailsDetailsForm.rendered = function() {
	

	pageSession.set("modulesModuleDetailsDetailsFormInfoMessage", "");
	pageSession.set("modulesModuleDetailsDetailsFormErrorMessage", "");

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

Template.ModulesModuleDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modulesModuleDetailsDetailsFormInfoMessage", "");
		pageSession.set("modulesModuleDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modulesModuleDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(modulesModuleDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modulesModuleDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modulesModuleDetailsDetailsFormErrorMessage", message);
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

		Router.go("modules", {});
	}

	
});

Template.ModulesModuleDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("modulesModuleDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modulesModuleDetailsDetailsFormErrorMessage");
	}
	
});
