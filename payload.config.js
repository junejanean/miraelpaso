const Event = require('./src/collections/Event');
const Category = require('./src/collections/Category');

module.exports = {
	serverURL: 'http://localhost:3000',
	admin: {
		email: 'admin@example.com',
		password: 'yourpassword',
	},
	collections: [Event, Category],
};
