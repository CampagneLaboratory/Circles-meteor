var pageSession = new ReactiveDict();

Template.ModulesInsertModule.rendered = function() {
	
};

Template.ModulesInsertModule.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("modules", {  });
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("modules", {  });
	}
});

Template.ModulesInsertModule.helpers({
	
});

Template.ModulesInsertModuleInsertNewModule.rendered = function() {
	

	pageSession.set("modulesInsertModuleInsertNewModuleInfoMessage", "");
	pageSession.set("modulesInsertModuleInsertNewModuleErrorMessage", "");

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

Template.ModulesInsertModuleInsertNewModule.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modulesInsertModuleInsertNewModuleInfoMessage", "");
		pageSession.set("modulesInsertModuleInsertNewModuleErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modulesInsertModuleInsertNewModuleMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(modulesInsertModuleInsertNewModuleMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modulesInsertModuleInsertNewModuleInfoMessage", message);
					}; break;
				}
			}

			Router.go("modules", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modulesInsertModuleInsertNewModuleErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Modules.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("modules", {});
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

Template.ModulesInsertModuleInsertNewModule.helpers({
	"infoMessage": function() {
		return pageSession.get("modulesInsertModuleInsertNewModuleInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modulesInsertModuleInsertNewModuleErrorMessage");
	}
	
});
