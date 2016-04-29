this.Modules = new Mongo.Collection("modules");

this.Modules.userCanInsert = function(userId, doc) {
	return true;
};

this.Modules.userCanUpdate = function(userId, doc) {
	return true;
};

this.Modules.userCanRemove = function(userId, doc) {
	return true;
};
