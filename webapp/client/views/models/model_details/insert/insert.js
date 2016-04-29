var pageSession = new ReactiveDict();

Template.ModelsModelDetailsInsert.rendered = function() {
	
};

Template.ModelsModelDetailsInsert.events({
	
});

Template.ModelsModelDetailsInsert.helpers({
	
});

Template.ModelsModelDetailsInsertInsertForm.rendered = function() {
	

	pageSession.set("modelsModelDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("modelsModelDetailsInsertInsertFormErrorMessage", "");

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

Template.ModelsModelDetailsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("modelsModelDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("modelsModelDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var modelsModelDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(modelsModelDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("modelsModelDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("models.model_details", {modelId: self.params.modelId});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("modelsModelDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.modelId = self.params.modelId;

				newId = RootNodes.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.ModelsModelDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("modelsModelDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("modelsModelDetailsInsertInsertFormErrorMessage");
	}
	
});
