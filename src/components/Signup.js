import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import AuthForm from './AuthForm';
import { UserContext } from '../utils/userContext';

const Signup = () => {
	const [error, setError] = useState(null);
	const router = useRouter();
	const auth = getAuth();

	const { updateUser } = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		const displayName = e.target.displayName.value;
		const isBusinessOwner = e.target.isBusinessOwner.checked;

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const role = isBusinessOwner ? 'business_owner' : 'regular';

			const newUser = {
				uid: user.uid,
				email,
				displayName,
				role,
				isVerified: false,
				likes: [],
			};

			const userDocRef = doc(db, 'users', user.uid);
			await setDoc(userDocRef, newUser);

			updateUser(newUser);

			router.push('/');
		} catch (error) {
			console.error(error);
			setError('Failed to create user.');
		}
	};

	return (
		<div>
			<h2>Sign up</h2>
			<AuthForm isSignup onSubmit={handleSubmit} error={error} />
		</div>
	);
};

export default Signup;
