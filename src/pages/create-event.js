import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase';
import axios from 'axios';
import Head from 'next/head';
import EventForm from '../components/EventForm';
import { UserContext } from '../utils/userContext';
import Nav from '@/components/Nav';

const CreateEventPage = () => {
	const router = useRouter();
	const { user, updateUser } = useContext(UserContext);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (!user) {
				router.push('/login');
			} else {
				try {
					const response = await axios.get(`/api/users/${user.uid}`);
					console.log('RESPONSE', response);
					const userData = response.data;

					console.log('userData::::::::::', userData);

					if (userData.data.role !== 'business_owner') {
						router.push('/');
					} else {
						updateUser(userData.data);
					}
				} catch (error) {
					console.error('Error fetching user data:', error);
					router.push('/');
				}
			}
		});

		return () => {
			unsubscribe();
		};
	}, [router]);

	return (
		<div>
			<Head>
				<title>Create Event - City Events</title>
				<meta name='description' content='Create a new event' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />
			<main className='flex justify-center min-h-screen'>
				{user && <EventForm />}
			</main>
		</div>
	);
};

export default CreateEventPage;
