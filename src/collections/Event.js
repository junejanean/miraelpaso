const Category = require('./Category');

module.exports = {
	slug: 'events',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'date',
			type: 'date',
			required: true,
		},
		{
			name: 'location',
			type: 'text',
			required: true,
		},
		{
			name: 'url',
			type: 'text',
			required: true,
		},
		{
			name: 'category',
			type: 'relationship',
			relationTo: Category.slug,
			required: true,
		},
		{
			name: 'likes',
			type: 'array',
			field: {
				type: 'relationship',
				relationTo: 'users',
			},
			admin: {
				readOnly: true,
			},
		},
	],
};
