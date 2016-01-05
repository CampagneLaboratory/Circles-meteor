Models.allow({
	insert: function (userId, doc) {
		return Models.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Models.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Models.userCanRemove(userId, doc);
	}
});

Models.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Models.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Models.before.remove(function(userId, doc) {
	
});

Models.after.insert(function(userId, doc) {
	
});

Models.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Models.after.remove(function(userId, doc) {
	
});
