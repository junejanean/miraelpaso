// pages/api/events/likes.js
import { db } from '../../../utils/firebaseAdmin';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405);
	}

	try {
		const eventSnapshot = await getDocs(collection(db, 'events'));
		const eventLikes = {};

		eventSnapshot.forEach((doc) => {
			const data = doc.data();
			eventLikes[doc.id] = data.likes ? data.likes.length : 0;
		});

		return res.status(200).json(eventLikes);
	} catch (error) {
		console.error('Error fetching likes:', error);
		return res.status(500).json({ message: 'Error fetching likes' });
	}
}
