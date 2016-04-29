this.Models = new Mongo.Collection("models");

this.Models.userCanInsert = function(userId, doc) {
	return true;
};

this.Models.userCanUpdate = function(userId, doc) {
	return true;
};

this.Models.userCanRemove = function(userId, doc) {
	return true;
};
