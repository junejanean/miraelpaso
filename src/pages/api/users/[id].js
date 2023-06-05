// import { db } from '../../../utils/firebase';
import { db } from '../../../utils/firebaseAdmin';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	console.log('[[[id]]]', id);
	const userDocRef = db.collection('users').doc(id);

	if (method === 'GET') {
		try {
			// console.log('DB____________________', id);
			// const userDocRef = db.collection('users').doc(id);
			const userDocSnap = await userDocRef.get();

			console.log('[[[USER GET]]]', userDocSnap);

			if (userDocSnap.exists()) {
				console.log('User data:', userDocSnap.data());
			} else {
				console.log('User not found!');
			}

			if (!userDocSnap.exists()) {
				res.status(404).json({ error: 'User not found.' });
			} else {
				console.log('Document data:', userDocSnap.data());
				res.status(200).json({ data: userDocSnap.data(), status: 'YESSSSS' });
			}
		} catch (error) {
			console.error('*********Error fetching user:*********', error);
			res.status(500).json({ error: 'FAILING!! Failed to fetch user.' });
		}
	} else if (method === 'PATCH') {
		const { events } = req.body; // get events from the request body

		try {
			// const userDocRef = db.collection('users').doc(id);
			await userDocRef.update({ likes: events }); // update events field

			res.status(200).json({ id, events }); // send updated events back in the response
		} catch (error) {
			console.error('ERROR---------', error);
			res.status(500).json({ error: 'Failed to update user events.', error });
		}
	} else if (method === 'DELETE') {
		try {
			// const userDocRef = db.collection('users').doc(id);
			await deleteDoc(userDocRef);

			res.status(200).json({ id });
		} catch (error) {
			res.status(500).json({ error: 'Failed to delete user.' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed.' });
	}
}
