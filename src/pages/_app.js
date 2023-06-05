import '../styles/globals.css';
import React, { useEffect, useState, useContext } from 'react';
import { auth } from '../utils/firebase';
import Login from '../components/Login';
import { UserProvider, UserContext } from '@/utils/userContext';

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<MyAppContent Component={Component} pageProps={pageProps} />
		</UserProvider>
	);
}

function MyAppContent({ Component, pageProps }) {
	const { user, updateUser } = useContext(UserContext);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				console.log('FROM _app.js - Logged in user ID:', user.uid);
				const res = await fetch(`/api/users/${user.uid}`);
				if (res.ok) {
					const userData = await res.json();
					updateUser(userData);
				} else {
					console.error('Failed to fetch user data from Firestore');
					updateUser(null);
				}
			} else {
				updateUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return <Component {...pageProps} />;
}

export default MyApp;
