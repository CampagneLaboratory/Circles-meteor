this.ModulesModuleDetailsController = RouteController.extend({
	template: "ModulesModuleDetails",
	

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
			Meteor.subscribe("find_module", this.params.moduleId)
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
			find_module: Modules.findOne({_id:this.params.moduleId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});