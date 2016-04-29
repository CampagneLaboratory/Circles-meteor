Modules.allow({
	insert: function (userId, doc) {
		return Modules.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Modules.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Modules.userCanRemove(userId, doc);
	}
});

Modules.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Modules.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Modules.before.remove(function(userId, doc) {
	
});

Modules.after.insert(function(userId, doc) {
	
});

Modules.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Modules.after.remove(function(userId, doc) {
	
});
