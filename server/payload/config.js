const path = require('path');
// const dotenv = require('dotenv').config();

const User = require(path.resolve('collections', 'User'));
const Event = require(path.resolve('collections', 'Event'));

module.exports = {
	collections: [User, Event],
	serverURL: 'http://localhost:3000/payload',
	secret: 'esDA86h7AvAzcX',
	mongoURL:
		'mongodb+srv://junejanean:HhNPEE4lfafD7dIU@cluster0.k0vcqym.mongodb.net/test',
	// admin: {
	// 	user: 'junejanean@gmail.com',
	// 	pass: 'miraelp',
	// },
};
