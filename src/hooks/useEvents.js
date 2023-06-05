import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

const useEvents = () => {
	const [events, setEvents] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [filteredEvents, setFilteredEvents] = useState([]);

	const fetchEvents = async () => {
		try {
			const { data: eventsData } = await axios.get('/api/events');
			const { data: categoriesData } = await axios.get('/api/categories');

			setEvents(eventsData);
			setCategories(categoriesData);
		} catch (error) {
			console.error('Error fetching events and categories:', error);
			console.error('Error details:', error.response.data); // Added logging
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	useEffect(() => {
		let filtered = events;
		console.log('SELECTED CATEGORY', selectedCategory);

		if (selectedCategory) {
			filtered = filtered.filter(
				(event) => event.category === selectedCategory
			);
		}

		if (selectedDate) {
			filtered = filtered.filter(
				(event) => format(new Date(event.date), 'yyyy-MM-dd') === selectedDate
			);
		}

		setFilteredEvents(filtered);
	}, [selectedCategory, selectedDate, events]);

	return {
		events: filteredEvents,
		categories,
		setSelectedCategory,
		setSelectedDate,
		refetchEvents: fetchEvents, // This will allow manual re-fetching
	};
};

export default useEvents;
