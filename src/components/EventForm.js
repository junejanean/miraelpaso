// components/EventForm.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../utils/userContext';
import useCategories from '../hooks/useCategories';

const EventForm = () => {
	const [title, setTitle] = useState('');
	const [date, setDate] = useState('');
	const [location, setLocation] = useState('');
	const [url, setUrl] = useState('');
	const [category, setCategory] = useState('');
	const { user } = useContext(UserContext);
	const categories = useCategories();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post('/api/events', {
				title,
				date,
				location,
				url: url,
				category,
				ownerId: user.uid,
			});

			// Redirect to the homepage after event creation
			console.log('Event created!');
			window.location.href = '/';
		} catch (error) {
			console.error('Error creating event:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='w-full max-w-lg'>
			<input
				type='text'
				placeholder='Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			/>
			<input
				type='date'
				value={date}
				onChange={(e) => setDate(e.target.value)}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			/>
			<input
				type='text'
				placeholder='Location'
				value={location}
				onChange={(e) => setLocation(e.target.value)}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			/>
			<input
				type='text'
				placeholder='URL'
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			/>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
			>
				<option value=''>Select Category</option>
				{categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
			<button
				type='submit'
				className='bg-blue-500 text-white py-2 px-4 rounded'
			>
				Create Event
			</button>
		</form>
	);
};

export default EventForm;
