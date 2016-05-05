Meteor.publish("module_empty", function() {
	return Modules.publishJoinedCursors(Modules.find({_id:null}, {}));
});

Meteor.publish("list_modules", function() {
	return Modules.publishJoinedCursors(Modules.find({}, {fields:{name:1, type: 1,createdBy:1}}, {sort:{name:1}}));
});

Meteor.publish("find_module", function(moduleId) {
	return Modules.publishJoinedCursors(Modules.find({_id:moduleId}, {}));
});

Meteor.publish("find_modules_project", function(projectId) {
	return Modules.publishJoinedCursors(Modules.find({projectId:projectId}, {}));
});
