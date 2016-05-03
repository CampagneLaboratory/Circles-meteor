Meteor.publish("root_nodes_empty", function() {
	return RootNodes.find({_id:null}, {});
});

Meteor.publish("list_nodes", function() {
	return RootNodes.find({}, {sort:{name:1}});
});

Meteor.publish("find_node", function(nodeId) {
	return RootNodes.find({_id:nodeId}, {});
});

Meteor.publish("find_nodes_model", function(modelId) {
	return RootNodes.find({modelId:modelId},{fields:{name:1, createdBy:1,modelId:1}}, {});
});

