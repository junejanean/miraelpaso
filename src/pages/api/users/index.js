// import db from '../../utils/firebase';
import db from '../../utils/firebaseAdmin';

export default async function handler(req, res) {
	console.log('MADE IT HERE');
	if (req.method === 'GET') {
		console.log('GET request started');
		try {
			console.log('DB Type:', typeof db);
			const usersSnapshot = await db.collection('users').get();
			const users = [];

			usersSnapshot.forEach((doc) => {
				users.push({ id: doc.id, ...doc.data() });
			});

			console.log('GET request successful', users);
			res.status(200).json(users, 'Hello USER');
		} catch (error) {
			console.log('GET request failed', error);
			res.status(500).json({ error: 'Failed to fetch users.' });
		}
	} else if (req.method === 'POST') {
		const { name, email, role } = req.body;
		console.log('POST request started', req.body);

		try {
			const newUser = await db.collection('users').add({
				name,
				email,
				role,
			});

			console.log('POST request successful', { id: newUser.id, ...req.body });
			res.status(201).json({ id: newUser.id, ...req.body });
		} catch (error) {
			console.log('POST request failed', error);
			res.status(500).json({ error: 'Failed to create user.' });
		}
	} else {
		console.log('Unsupported method', req.method);
		res.status(405).json({ error: 'Method not allowed.' });
	}
}
