import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import { UserContext } from '../../utils/userContext';
import AccountSettings from '../../components/AccountSettings';
import Nav from '@/components/Nav';

const Account = () => {
	const router = useRouter();
	const { user, updateUser } = useContext(UserContext);
	const { id } = router.query;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) {
			return;
		}

		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (!user) {
				router.push('/login');
			} else {
				try {
					const userDocRef = doc(db, 'users', id);
					const userDocSnap = await getDoc(userDocRef);
					console.log('USER DETAILS:', userDocSnap);

					if (!userDocSnap.exists()) {
						router.push('/');
					} else {
						updateUser({ ...userDocSnap.data(), uid: userDocSnap.id });
						setLoading(false);
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
	}, [router, id, updateUser]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Head>
				<title>Account - MIRA El Paso</title>
				<meta name='description' content='User account info and settings' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Nav />

			<main className='container mx-auto mt-10'>
				{user && <AccountSettings />}
			</main>
		</div>
	);
};

export default Account;
