var pageSession = new ReactiveDict();

Template.ProjectsInsertProject.rendered = function() {
	
};

Template.ProjectsInsertProject.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("projects", {  });
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("projects", {  });
	}
});

Template.ProjectsInsertProject.helpers({
	
});

Template.ProjectsInsertProjectInsertNewProject.rendered = function() {
	

	pageSession.set("projectsInsertProjectInsertNewProjectInfoMessage", "");
	pageSession.set("projectsInsertProjectInsertNewProjectErrorMessage", "");

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

Template.ProjectsInsertProjectInsertNewProject.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("projectsInsertProjectInsertNewProjectInfoMessage", "");
		pageSession.set("projectsInsertProjectInsertNewProjectErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var projectsInsertProjectInsertNewProjectMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(projectsInsertProjectInsertNewProjectMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("projectsInsertProjectInsertNewProjectInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("projectsInsertProjectInsertNewProjectErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Projects.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("projects", {});
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

Template.ProjectsInsertProjectInsertNewProject.helpers({
	"infoMessage": function() {
		return pageSession.get("projectsInsertProjectInsertNewProjectInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("projectsInsertProjectInsertNewProjectErrorMessage");
	}
	
});
