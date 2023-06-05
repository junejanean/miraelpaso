const path = require('path');
// const dotenv = require('dotenv').config();

const User = require(path.resolve('collections', 'User'));
const Event = require(path.resolve('collections', 'Event'));

module.exports = {
	collections: [User, Event],
	serverURL: 'http://localhost:3000/payload',
	secret: 'esDA86h7AvAzcX',
	mongoURL: process.env.MONGO_DB_PAYLOAD,
	// admin: {
	// 	user: 'junejanean@gmail.com',
	// 	pass: 'miraelp',
	// },
};
