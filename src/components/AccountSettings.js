// components/AccountSettings.js
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../utils/userContext';
import axios from 'axios';

const AccountSettings = () => {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const router = useRouter();
	const { user, updateUser } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setDisplayName(user.data.displayName || '');
			setEmail(user.data.email || '');
		} else {
			router.push('/login');
		}
	}, [user]);

	if (!user) {
		return <div>Loading...trying to find you.</div>;
	}

	const saveSettings = async () => {
		try {
			const updatedUser = {
				...user,
				data: {
					...user.data,
					displayName,
					email,
				},
			};
			await axios.patch(`/api/users/${user.uid}`, updatedUser);
			updateUser(updatedUser);
			alert('Settings saved!');
		} catch (error) {
			console.error('Error updating user settings:', error);
			alert('Error saving settings, please try again.');
		}
	};

	return (
		<div className='w-full max-w-md mx-auto'>
			<h1>Account Settings</h1>
			<div className='mb-4'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='displayName'
				>
					Display Name
				</label>
				<input
					type='text'
					id='displayName'
					value={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
			</div>

			<div className='mb-4'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='email'
				>
					Email
				</label>
				<input
					type='email'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
			</div>

			<button
				onClick={saveSettings}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
			>
				Save Settings
			</button>
		</div>
	);
};

export default AccountSettings;
