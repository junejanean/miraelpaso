module.exports = {
	slug: 'users',
	fields: [
		{
			name: 'uid',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'email',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'displayName',
			type: 'text',
			required: true,
		},
		{
			name: 'role',
			type: 'text',
		},
		{
			name: 'likes',
			type: 'array',
			field: {
				type: 'relationship',
				relationTo: 'events',
			},
		},
	],
};
