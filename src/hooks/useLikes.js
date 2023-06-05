import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { auth } from '../utils/firebase';
import { UserContext } from '../utils/userContext';

const useLikes = () => {
	const { user, updateUser } = useContext(UserContext);
	const [likedEvents, setLikedEvents] = useState([]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			updateUser(user);
			if (user) {
				try {
					const { data } = await axios.get(`/api/users/${user.uid}/likes`);
					setLikedEvents(data);
				} catch (error) {
					console.error('Error fetching liked events:', error);
				}
			}
		});
		// Unsubscribe from the listener when the component unmounts
		return () => unsubscribe();
	}, [updateUser]);

	const handleLike = async (eventId, isLiked) => {
		if (!user) return;

		try {
			const likeAction = isLiked ? 'pull' : 'push';
			await axios.patch(`/api/events/${eventId}`, {
				op: 'arrayUpdate',
				path: 'likes',
				value: user.uid,
				arrayUpdateType: likeAction,
			});
		} catch (error) {
			console.error('Error updating likes:', error);
		}
	};

	return { user, handleLike, likedEvents };
};

export default useLikes;
