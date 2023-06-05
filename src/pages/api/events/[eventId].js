import { db } from '../../../utils/firebaseAdmin';
// import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default async function handler(req, res) {
	console.log('REQUIRE METHOD', req.method); // Should print "PATCH"
	console.log('REQUIRE BODY', req.body); // Should print your request body

	try {
		const {
			query: { eventId },
			method,
		} = req;

		const eventRef = db.collection('events').doc(eventId);

		switch (method) {
			case 'GET':
				try {
					const docSnap = await eventRef.get();

					if (!docSnap.exists()) {
						res.status(404).json({ error: 'Event not found' });
						return;
					}

					const data = docSnap.data();
					res.status(200).json({
						id: docSnap.id,
						...data,
						date: data.date.toDate(),
						likes: data.likes || [],
					});
				} catch (error) {
					res.status(500).json({ error: 'Error retrieving event' });
				}
				break;

			case 'PATCH':
				console.log('Inside PATCH');
				try {
					const { likes } = req.body;
					console.log(`Received likes: ${likes}`);
					console.log('Received likes: ', likes); // Add this line to log the received likes
					if (!likes) {
						res.status(400).json({ error: 'Missing likes in request body' });
						return;
					}
					await eventRef.update({ likes });
					console.log('Successfully updated event with likes: ', likes);

					res.status(200).json({ message: 'Event updated successfully' });
				} catch (error) {
					console.error('PATCH error:', error);
					// console.log('Error: ', error); // Modify this line to log the error
					res.status(500).json({ error: 'Error updating event' });
				}
				break;

			case 'DELETE':
				try {
					await eventRef.delete();
					res.status(200).json({ message: 'Event deleted successfully' });
				} catch (error) {
					res.status(500).json({ error: 'Error deleting event' });
				}
				break;
		}
	} catch (error) {
		console.error('General error:', error);
	}

	// 	default:
	// 		res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
	// 		res.status(405).end(`Method ${method} Not Allowed`);
	// }
}
