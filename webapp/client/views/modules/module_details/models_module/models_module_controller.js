this.ModulesModuleDetailsModelsModuleController = RouteController.extend({
	template: "ModulesModuleDetails",
	

	yieldTemplates: {
		'ModulesModuleDetailsModelsModule': { to: 'ModulesModuleDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ModulesModuleDetails"); this.render("loading", { to: "ModulesModuleDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("find_models_module", this.params.moduleId),
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
		

		return {
			params: this.params || {},
			find_models_module: Models.find({moduleId:this.params.moduleId}, {}),
			find_module: Modules.findOne({_id:this.params.moduleId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});