this.ModelsModelDetailsInsertController = RouteController.extend({
	template: "ModelsModelDetails",
	

	yieldTemplates: {
		'ModelsModelDetailsInsert': { to: 'ModelsModelDetailsSubcontent'}
		
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
			Meteor.subscribe("root_nodes_empty"),
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
			root_nodes_empty: RootNodes.findOne({_id:null}, {}),
			find_model: Models.findOne({_id:this.params.modelId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});