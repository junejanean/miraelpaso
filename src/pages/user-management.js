// pages/user-management.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

const UserManagement = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`/api/users/${user.uid}`);
				setUsers(response.data.docs);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	const toggleVerification = async (user) => {
		try {
			await axios.put(`/api/users/${user.uid}`, {
				...user,
				isVerified: !user.isVerified,
			});

			// Update the local state after verification status is toggled
			setUsers(
				users.map((u) =>
					u.id === user.id ? { ...u, isVerified: !u.isVerified } : u
				)
			);
		} catch (error) {
			console.error('Error updating user verification status:', error);
		}
	};

	return (
		<div>
			<Head>
				<title>User Management - City Events</title>
				<meta
					name='description'
					content='Manage users and verify business owners'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto mt-10'>
				<table className='table-auto w-full'>
					<thead>
						<tr>
							<th className='px-4 py-2'>Name</th>
							<th className='px-4 py-2'>Email</th>
							<th className='px-4 py-2'>Business Owner</th>
							<th className='px-4 py-2'>Verified</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td className='border px-4 py-2'>{user.displayName}</td>
								<td className='border px-4 py-2'>{user.email}</td>
								<td className='border px-4 py-2 text-center'>
									{user.isBusinessOwner ? 'Yes' : 'No'}
								</td>
								<td className='border px-4 py-2 text-center'>
									{user.isBusinessOwner && (
										<button
											className={`px-4 py-2 rounded ${
												user.isVerified ? 'bg-green-500' : 'bg-red-500'
											} text-white`}
											onClick={() => toggleVerification(user)}
										>
											{user.isVerified ? 'Verified' : 'Not Verified'}
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default UserManagement;
