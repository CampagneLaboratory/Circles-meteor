this.ProjectsProjectDetailsModulesProjectController = RouteController.extend({
	template: "ProjectsProjectDetails",
	

	yieldTemplates: {
		'ProjectsProjectDetailsModulesProject': { to: 'ProjectsProjectDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ProjectsProjectDetails"); this.render("loading", { to: "ProjectsProjectDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("find_modules_project", this.params.projectId),
			Meteor.subscribe("find_project", this.params.projectId)
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
			find_modules_project: Modules.find({projectId:this.params.projectId}, {}),
			find_project: Projects.findOne({_id:this.params.projectId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		
	}
});