// const express = require('express');
// const cors = require('cors');
// const next = require('next');
// // const payload = require('payload');
// // const payloadConfig = require('./payload/config');
// const { app } = require('firebase-admin');
// // const dotenv = require('dotenv').config({ path: __dirname + '/.env.local' });

// // const dev = process.env.NODE_ENV !== 'production';
// // const nextApp = next({ dev });
// // const handle = nextApp.getRequestHandler();

// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
// 	res.send('Hello World!');
// });

// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}`);
// });

// // nextApp.prepare().then(async () => {
// // 	const app = express();

// // 	// Initialize Payload
// // 	await payload.init({
// // 		...payloadConfig,
// // 		express: app,
// // 	});

// // 	// Setup Next.js request handler
// // 	app.all('*', (req, res) => {
// // 		return handle(req, res);
// // 	});

// // 	// Start the server
// // 	const port = process.env.PORT || 3000;
// // 	app.listen(port, (err) => {
// // 		if (err) throw err;
// // 		console.log(`> Ready on http://localhost:${port}`);
// // 	});
// // });
