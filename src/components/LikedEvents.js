// src/components/LikedEvents.js
import React from 'react';
import { format } from 'date-fns';
import useLikes from '../hooks/useLikes';

const LikedEvents = () => {
	const { likedEvents } = useLikes();

	if (likedEvents.length === 0) {
		return <p>You haven't liked any events yet.</p>;
	}

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>Liked Events</h1>
			<ul>
				{likedEvents.map((event) => (
					<li key={event.id} className='border-b border-gray-200 py-4'>
						<h2 className='text-xl font-semibold'>{event.title}</h2>
						<p>{event.description}</p>
						<p>
							<span className='font-medium'>Location:</span> {event.location}
						</p>
						<p>
							<span className='font-medium'>Organizer:</span> {event.organizer}
						</p>
						<p>
							<span className='font-medium'>Category:</span> {event.category}
						</p>
						<p>
							<span className='font-medium'>Date:</span>{' '}
							{format(new Date(event.date.seconds * 1000), 'MMMM dd, yyyy')}
						</p>
						<a href={event.url} target='_blank' rel='noopener noreferrer'>
							Visit event website
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LikedEvents;
