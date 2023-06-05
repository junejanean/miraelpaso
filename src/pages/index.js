import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase';
import Head from 'next/head';
import Link from 'next/link';
import EventList from '../components/EventList';
import Nav from '../components/Nav';
import axios from 'axios';

const Home = () => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [isBusinessOwner, setIsBusinessOwner] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				try {
					const response = axios.get(`/api/users/${user.uid}`).then((res) => {
						console.log('RES', res);
					});
					const userData = response.data.doc;
					setUser(user);
					// setIsBusinessOwner(userData.isBusinessOwner && userData.isVerified);
				} catch (error) {
					console.error('Error fetching user data:', error);
				}
			} else {
				setUser(null);
				setIsBusinessOwner(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [router]);

	return (
		<div>
			<Head>
				<title>MIRA El Paso</title>
				<meta name='El Paso Events' content='A short description of your app' />
			</Head>

			<Nav />
			<main className='flex justify-center min-h-screen'>
				<EventList />
			</main>
		</div>
	);
};

export default Home;
