var pageSession = new ReactiveDict();

Template.ModulesEditModule.rendered = function() {
	
};

Template.ModulesEditModule.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("modules", {  });
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("modules", {  });
	}
});

Template.ModulesEditModule.helpers({
	
});

Template.ModulesEditModuleEditModule.rendered = function() {
	

	pageSession.set("modulesEditModuleEditModuleInfoMessage", "");
	pageSession.set("modulesEditModuleEditModuleErrorMessage", "");

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

Template.ModulesEditModuleEditModule.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modulesEditModuleEditModuleInfoMessage", "");
		pageSession.set("modulesEditModuleEditModuleErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modulesEditModuleEditModuleMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(modulesEditModuleEditModuleMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modulesEditModuleEditModuleInfoMessage", message);
					}; break;
				}
			}

			Router.go("modules", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modulesEditModuleEditModuleErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Modules.update({ _id: t.data.find_module._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

		Router.go("modules", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("modules", {});
	}

	
});

Template.ModulesEditModuleEditModule.helpers({
	"infoMessage": function() {
		return pageSession.get("modulesEditModuleEditModuleInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modulesEditModuleEditModuleErrorMessage");
	}
	
});
