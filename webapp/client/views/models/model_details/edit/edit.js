var pageSession = new ReactiveDict();

Template.ModelsModelDetailsEdit.rendered = function() {
	
};

Template.ModelsModelDetailsEdit.events({
	
});

Template.ModelsModelDetailsEdit.helpers({
	
});

Template.ModelsModelDetailsEditEditForm.rendered = function() {
	

	pageSession.set("modelsModelDetailsEditEditFormInfoMessage", "");
	pageSession.set("modelsModelDetailsEditEditFormErrorMessage", "");

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

Template.ModelsModelDetailsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modelsModelDetailsEditEditFormInfoMessage", "");
		pageSession.set("modelsModelDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modelsModelDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(modelsModelDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modelsModelDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("models.model_details", {modelId: self.params.modelId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modelsModelDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				RootNodes.update({ _id: t.data.find_node._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("models.model_details", {modelId: this.params.modelId});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ModelsModelDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("modelsModelDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modelsModelDetailsEditEditFormErrorMessage");
	}
	
});
