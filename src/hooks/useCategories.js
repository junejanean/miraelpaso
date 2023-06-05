import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data: categoriesData } = await axios.get('/api/categories');
				setCategories(categoriesData);
			} catch (error) {
				console.error('Error fetching categories:', error);
				console.error('Error details:', error.response.data);
			}
		};

		fetchCategories();
	}, []);

	return categories;
};

export default useCategories;
