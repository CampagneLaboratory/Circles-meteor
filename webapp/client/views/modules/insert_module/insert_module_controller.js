this.ModulesInsertModuleController = RouteController.extend({
	template: "ModulesInsertModule",
	

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
			Meteor.subscribe("module_empty"),
			Meteor.subscribe("list_models")
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
			module_empty: Modules.findOne({_id:null}, {}),
			list_models: Models.find({}, {sort:{name:1}})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});