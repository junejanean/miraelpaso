// Import Firestore from your Firebase utility file
// import { db } from '../../utils/firebase';
import { db } from '../../utils/firebaseAdmin';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Handle POST request
		const { title, date, location, url, category, ownerId } = req.body;

		try {
			const newEvent = await db.collection('events').add({
				title,
				date: new Date(date),
				location,
				url,
				category,
				ownerId,
				likes: [],
				createdAt: new Date().toISOString(),
			});

			res.status(200).json({ message: 'Event created!', id: newEvent.id });
		} catch (error) {
			console.error('Error creating event:', error);
			res.status(500).json({ message: 'Error creating event' });
		}
	}

	if (req.method === 'GET') {
		const { title, date, location, url, category, ownerId } = req.body;
		try {
			const eventsRef = db.collection('events');
			const snapshot = await eventsRef.get();

			const events = snapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					...data,
					date: data.date.toDate(), // Convert Firestore Timestamp to JavaScript Date
					likes: data.likes || [],
				};
			});

			res.status(200).json(events);
		} catch (error) {
			console.error('Error fetching events:', error);
			res.status(500).json({ message: 'Error fetching events' });
		}
	}
}
