this.RootNodes = new Mongo.Collection("root_nodes");

this.RootNodes.userCanInsert = function(userId, doc) {
	return true;
}

this.RootNodes.userCanUpdate = function(userId, doc) {
	return true;
}

this.RootNodes.userCanRemove = function(userId, doc) {
	return true;
}
