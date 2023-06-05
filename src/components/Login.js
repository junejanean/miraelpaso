import React, { useState, useContext } from 'react';
import { auth } from '../utils/firebase';
import { useRouter } from 'next/router';
import { UserContext } from '../utils/userContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const router = useRouter();

	const { updateUser } = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		const auth = getAuth();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			updateUser(userCredential.user);
			router.push('/');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h1 className='text-2xl font-semibold mb-4'>Login</h1>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='email' className='block text-sm font-medium'>
						Email
					</label>
					<input
						id='email'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='mt-1 block w-full'
					/>
				</div>
				<div>
					<label htmlFor='password' className='block text-sm font-medium'>
						Password
					</label>
					<input
						id='password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='mt-1 block w-full'
					/>
				</div>
				{error && <p className='text-red-500'>{error}</p>}
				<button
					type='submit'
					className='py-2 px-4 bg-blue-500 text-white rounded'
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
