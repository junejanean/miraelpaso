import { db } from '../../../../utils/firebase';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405);
	}

	const { id } = req.query;

	// Fetch user likes from users collection
	let userLikes = ['You have no liked events']; // default to an empty array if likes not found
	try {
		const userSnapshot = await getDoc(doc(db, 'users', id));
		const userData = userSnapshot.data();
		if (userData && Array.isArray(userData.likes)) {
			// check if likes is an array
			userLikes = userData.likes;
		} else {
			console.warn('User likes not found or not an array:', userData);
		}
	} catch (error) {
		console.error('Error fetching user likes:', error);
		return res.status(500).json({ error: 'Error fetching user likes' });
	}

	if (!userLikes) {
		return res.status(404).json({ error: 'User likes not found' });
	}

	// Query the events collection
	const eventCollectionRef = collection(db, 'events');
	const eventQuery = query(
		eventCollectionRef,
		where('likes', 'array-contains', id)
	);
	const eventQuerySnapshot = await getDocs(eventQuery);

	console.log('LIKED EVENTS', userLikes);

	// Filter out events that are not in the user's 'likes' array
	const likedEvents = eventQuerySnapshot.docs
		.map((docSnapshot) => ({
			id: docSnapshot.id,
			...docSnapshot.data(),
		}))
		.filter((event) => userLikes.includes(event.id));

	return res.status(200).json(likedEvents);
}
