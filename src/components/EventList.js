import React, { useState, useContext } from 'react';
import { format } from 'date-fns';
import useEvents from '../hooks/useEvents';
import axios from 'axios';
import { UserContext } from '../utils/userContext';

const EventList = () => {
	const {
		events,
		categories,
		setSelectedCategory,
		setSelectedDate,
		refetchEvents,
	} = useEvents();
	// const { user, handleLike } = useLikes();
	const [showModal, setShowModal] = useState(false);
	const [likes, setLikes] = useState({});
	const { user, updateUser } = useContext(UserContext);

	console.log('[[[user]]]', user);

	const isEventLiked = (event) => {
		if (!user || !event.likes) return false;
		return event.likes.includes(user.data.uid);
	};

	const handleLikeClick = async (event) => {
		const eventId = event.id;
		const userId = user.data.uid;

		if (!user) {
			setShowModal(true);
		} else {
			const isLiked = isEventLiked(event);
			let updatedLikes = [];

			// If the user has already liked the event, unlike it
			if (isLiked) {
				updatedLikes = event.likes.filter((uid) => uid !== user.data.uid);
				// Also remove the event from the user's likes
				user.data.likes = user.data.likes.filter(
					(eventId) => eventId !== event.id
				);
			} else {
				console.log('[[[user]]]', user);
				// Otherwise, add the user's uid to the likes
				updatedLikes = [...event.likes, user.data.uid];
				// Also add the event to the user's likes
				user.data.likes.push(event.id);
			}

			// Send a PATCH request to update the likes
			try {
				console.log(`Sending PATCH request with likes: ${updatedLikes}`);
				// Update the likes array in the event document
				await axios.patch(`/api/events/${event.id}`, { likes: updatedLikes });

				console.log(`Sending PATCH request with eventId: ${event.id}`);

				console.log(`Sending PATCH request with userId: ${userId}`);
				console.log(
					`Sending PATCH request with user likes: ${user.data.likes}`
				);

				// Update the likes array in the user document
				await axios.patch(`/api/users/${userId}`, { events: user.data.likes });
				// Also update the user
				updateUser(user);
				// Fetch events again to refresh the likes
				refetchEvents();
			} catch (error) {
				console.error('Error updating likes:', error);
			}
		}
	};

	// const toggleLike = (event) => {
	// 	if (!user) {
	// 		setShowModal(true);
	// 	} else {
	// 		handleLike(event.id, isEventLiked(event));
	// 	}
	// };

	const closeModal = () => {
		setShowModal(false);
	};

	// useEffect(() => {
	// 	// Fetch likes for all events
	// 	const fetchLikes = async () => {
	// 		const newLikes = {};

	// 		for (const event of events) {
	// 			try {
	// 				const res = await axios.get(`/api/events/likes`);
	// 				newLikes[event.id] = res.data.likes;
	// 			} catch (error) {
	// 				console.error('Error fetching likes:', error);
	// 			}
	// 		}

	// 		setLikes(newLikes);
	// 	};

	// 	fetchLikes();
	// }, [events]); // Fetch likes whenever the events change

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>El Paso Events</h1>

			<div className='mb-6'>
				<label htmlFor='category' className='block text-sm font-medium'>
					Filter by category
				</label>
				<select
					id='category'
					onChange={(e) => setSelectedCategory(e.target.value)}
					className='mt-1 block w-full'
				>
					<option value=''>All categories</option>
					{categories.map((category) => (
						<option key={category.name} value={category.name}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div className='mb-6'>
				<label htmlFor='date' className='block text-sm font-medium'>
					Filter by date
				</label>
				<input
					id='date'
					type='date'
					onChange={(e) => setSelectedDate(e.target.value)}
					className='mt-1 block w-full'
				/>
			</div>
			<ul>
				{events.map((event) => (
					<li key={event.id} className='border-b border-gray-200 py-4'>
						<h2 className='text-xl font-semibold'>{event.title}</h2>
						<p>{event.description}</p>
						<p>
							<span className='font-medium'>Location:</span> {event.location}
						</p>
						{/* <p>
							<span className='font-medium'>Organizer:</span> {event.organizer}
						</p> */}
						<p>
							<span className='font-medium'>Category:</span>
							{event.category}
						</p>
						<p>
							<span className='font-medium'>Date:</span>{' '}
							{format(new Date(event.date), 'MMMM dd, yyyy')}
						</p>
						<a href={event.url} target='_blank' rel='noopener noreferrer'>
							Visit event website
						</a>
						<p>
							<span className='font-medium'>Likes:</span> {event.likes.length}
						</p>
						<button
							onClick={() => handleLikeClick(event)}
							className={`ml-4 py-1 px-3 rounded ${
								isEventLiked(event)
									? 'bg-blue-500 text-white'
									: 'border border-gray-300'
							}`}
						>
							{isEventLiked(event) ? 'Unlike' : 'Like'}
						</button>
					</li>
				))}
			</ul>

			{showModal && (
				<div className='fixed inset-0 flex items-center justify-center z-50'>
					<div className='bg-white p-6 rounded shadow'>
						<h2 className='text-lg mb-4'>Please sign in to like an event</h2>
						<p className='mb-4'>
							You need to have an account and be signed in to like events.
						</p>
						<button
							className='bg-blue-500 text-white py-1 px-3 rounded'
							onClick={closeModal}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default EventList;
