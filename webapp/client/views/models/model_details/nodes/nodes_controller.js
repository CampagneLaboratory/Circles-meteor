this.ModelsModelDetailsNodesController = RouteController.extend({
	template: "ModelsModelDetails",
	

	yieldTemplates: {
		'ModelsModelDetailsNodes': { to: 'ModelsModelDetailsSubcontent'}
		
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
			Meteor.subscribe("find_nodes_model", this.params.modelId),
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
			find_nodes_model: RootNodes.find({modelId:this.params.modelId},{fields:{name:1, createdBy:1}}, {}),
			find_model: Models.findOne({_id:this.params.modelId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});