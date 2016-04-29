this.ModelsEditModelController = RouteController.extend({
	template: "ModelsEditModel",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("find_model", this.params.modelId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			find_model: Models.findOne({_id:this.params.modelId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});