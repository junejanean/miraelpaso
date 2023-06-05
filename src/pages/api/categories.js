import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
	try {
		const filePath = path.join(
			process.cwd(),
			'public',
			'data',
			'categories.json'
		);

		const categoriesData = fs.readFileSync(filePath, 'utf8');
		const categories = JSON.parse(categoriesData);

		res.status(200).json(categories);
	} catch (error) {
		console.error('Error fetching categories:', error);
		res.status(500).json({ message: 'Error fetching categories' });
	}
}
