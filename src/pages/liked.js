// src/pages/liked.js
import Head from 'next/head';
import LikedEvents from '../components/LikedEvents';
import Nav from '@/components/Nav';

const LikedPage = () => {
	return (
		<div>
			<Head>
				<title>MIRA El Paso | Liked Events</title>
				<meta name='El Paso Events' content='A short description of your app' />
			</Head>

			<Nav />
			<LikedEvents />
		</div>
	);
};

export default LikedPage;
