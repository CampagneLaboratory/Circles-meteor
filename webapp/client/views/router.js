Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var publicRoutes = [
	"home",
	"projects",
	"projects.project_details",
	"projects.insert_project",
	"projects.edit_project",
	"modules",
	"modules.module_details",
	"modules.insert_module",
	"modules.edit_module",
	"models",
	"models.model_details",
	"models.model_details.nodes",
	"models.model_details.show_node",
	"models.model_details.insert",
	"models.model_details.edit",
	"models.insert_model",
	"models.edit_model"
];

var privateRoutes = [
	
];

var freeRoutes = [
	
];

var roleMap = [
	
];

this.firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		// what to do?
		console.log("All routes are restricted for current user.");
	}

	return "";
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		var redirectRoute = firstGrantedRoute("home");
		this.redirect(redirectRoute);
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to first granted route
			var redirectRoute = firstGrantedRoute("");
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

// called for pages in free zone - some of pages can be restricted
Router.ensureGranted = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!routeGranted(this.route.getName())) {
		// user is not in allowedRoles - redirect to first granted route
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	} else {
		this.next();
	}
};

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("home", {path: "/", controller: "HomeController"});
	this.route("projects", {path: "/projects", controller: "ProjectsController"});
	this.route("projects.project_details", {path: "/projects/project_details/:id", controller: "ProjectsProjectDetailsController"});
	this.route("projects.insert_project", {path: "/projects/insert_project", controller: "ProjectsInsertProjectController"});
	this.route("projects.edit_project", {path: "/projects/edit_project/:id", controller: "ProjectsEditProjectController"});
	this.route("modules", {path: "/modules", controller: "ModulesController"});
	this.route("modules.module_details", {path: "/modules/module_details/:moduleId", controller: "ModulesModuleDetailsController"});
	this.route("modules.insert_module", {path: "/modules/insert_module", controller: "ModulesInsertModuleController"});
	this.route("modules.edit_module", {path: "/modules/edit_module/:moduleId", controller: "ModulesEditModuleController"});
	this.route("models", {path: "/models", controller: "ModelsController"});
	this.route("models.model_details", {path: "/models/model_details/:modelId", controller: "ModelsModelDetailsController"});
	this.route("models.model_details.nodes", {path: "/models/model_details/:modelId/nodes", controller: "ModelsModelDetailsNodesController"});
	this.route("models.model_details.show_node", {path: "/models/model_details/:modelId/show_node/:nodeId", controller: "ModelsModelDetailsShowNodeController"});
	this.route("models.model_details.insert", {path: "/models/model_details/:modelId/insert", controller: "ModelsModelDetailsInsertController"});
	this.route("models.model_details.edit", {path: "/models/model_details/:modelId/edit/:modelId/:nodeId", controller: "ModelsModelDetailsEditController"});
	this.route("models.insert_model", {path: "/models/insert_model", controller: "ModelsInsertModelController"});
	this.route("models.edit_model", {path: "/models/edit_model/:modelId", controller: "ModelsEditModelController"});
});
