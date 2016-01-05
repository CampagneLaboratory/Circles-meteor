Meteor.publish("project_empty", function() {
	return Projects.publishJoinedCursors(Projects.find({_id:null}, {}));
});

Meteor.publish("find_project", function(id) {
	return Projects.publishJoinedCursors(Projects.find({_id:id}, {}));
});

Meteor.publish("list_projects", function() {
	return Projects.publishJoinedCursors(Projects.find({}, {sort:{name:1}}));
});

