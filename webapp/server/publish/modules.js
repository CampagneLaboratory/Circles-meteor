Meteor.publish("module_empty", function() {
	return Modules.publishJoinedCursors(Modules.find({_id:null}, {}));
});

Meteor.publish("list_modules", function() {
	return Modules.publishJoinedCursors(Modules.find({}, {fields:{name:1, createdBy:1}}, {sort:{name:1}}));
});

Meteor.publish("find_module", function(moduleId) {
	return Modules.publishJoinedCursors(Modules.find({_id:moduleId}, {}));
});

