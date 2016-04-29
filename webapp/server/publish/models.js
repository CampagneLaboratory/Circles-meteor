Meteor.publish("model_empty", function() {
	return Models.find({_id:null}, {});
});

Meteor.publish("list_models", function() {
	return Models.find({}, {sort:{name:1}});
});

Meteor.publish("find_model", function(modelId) {
	return Models.find({_id:modelId}, {});
});

