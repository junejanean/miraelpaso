// import { db } from '../../../utils/firebase';
import { db } from '../../../utils/firebaseAdmin';
// import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	const userDocRef = db.doc(`users/${id}`);

	if (method === 'GET') {
		try {
			console.log('DB____________________', id);
			// const userDocRef = db.collection('users').doc(id);
			const userDocSnap = await userDocRef.get();

			if (userDocSnap.exists) {
				console.log('User data:', userDocSnap.data());
			} else {
				console.log('User not found!');
			}

			if (!userDocSnap.exists) {
				res.status(404).json({ error: 'User not found.' });
			} else {
				console.log('Document data:', userDocSnap.data());
				res.status(200).json({ data: userDocSnap.data(), status: 'YESSSSS' });
			}
		} catch (error) {
			console.error('*********Error fetching user:*********', error);
			res.status(500).json({
				error: 'FAILING!! Failed to fetch user.',
				message: error.message,
			});
		}
	} else if (method === 'PATCH') {
		// const { events } = req.body; // get events from the request body

		try {
			// await userDocRef.update({ likes: events }); // update events field

			// Update user fields
			await userDocRef.update(req.body);

			// Get updated user data
			const updatedUserDocSnap = await userDocRef.get();
			const updatedUserData = updatedUserDocSnap.data();

			// Send updated user data back in the response
			res.status(200).json({ id, ...updatedUserData });
		} catch (error) {
			console.error('ERROR---------', error);
			res.status(500).json({ error: 'Failed to update user.', error });
		}
	} else if (method === 'DELETE') {
		try {
			// const userDocRef = db.collection('users').doc(id);
			await userDocRef.delete();

			res.status(200).json({ id });
		} catch (error) {
			res.status(500).json({ error: 'Failed to delete user.' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed.' });
	}
}
