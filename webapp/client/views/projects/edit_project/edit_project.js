var pageSession = new ReactiveDict();

Template.ProjectsEditProject.rendered = function() {
	
};

Template.ProjectsEditProject.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("projects", {  });
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("projects", {  });
	}
});

Template.ProjectsEditProject.helpers({
	
});

Template.ProjectsEditProjectEditProject.rendered = function() {
	

	pageSession.set("projectsEditProjectEditProjectInfoMessage", "");
	pageSession.set("projectsEditProjectEditProjectErrorMessage", "");

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

Template.ProjectsEditProjectEditProject.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("projectsEditProjectEditProjectInfoMessage", "");
		pageSession.set("projectsEditProjectEditProjectErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var projectsEditProjectEditProjectMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(projectsEditProjectEditProjectMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("projectsEditProjectEditProjectInfoMessage", message);
					}; break;
				}
			}

			Router.go("projects", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("projectsEditProjectEditProjectErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Projects.update({ _id: t.data.find_project._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

		Router.go("projects", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("projects", {});
	}

	
});

Template.ProjectsEditProjectEditProject.helpers({
	"infoMessage": function() {
		return pageSession.get("projectsEditProjectEditProjectInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("projectsEditProjectEditProjectErrorMessage");
	}
	
});
