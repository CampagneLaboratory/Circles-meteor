this.ModelsModelDetailsEditController = RouteController.extend({
	template: "ModelsModelDetails",
	

	yieldTemplates: {
		'ModelsModelDetailsEdit': { to: 'ModelsModelDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ModelsModelDetails"); this.render("loading", { to: "ModelsModelDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("find_node", this.params.nodeId),
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
			find_node: RootNodes.findOne({_id:this.params.nodeId}, {}),
			find_model: Models.findOne({_id:this.params.modelId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});