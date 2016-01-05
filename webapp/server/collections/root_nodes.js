RootNodes.allow({
	insert: function (userId, doc) {
		return RootNodes.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return RootNodes.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return RootNodes.userCanRemove(userId, doc);
	}
});

RootNodes.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

RootNodes.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

RootNodes.before.remove(function(userId, doc) {
	
});

RootNodes.after.insert(function(userId, doc) {
	
});

RootNodes.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

RootNodes.after.remove(function(userId, doc) {
	
});
