import React from 'react';

const AuthForm = ({ isSignup, onSubmit, error }) => {
	return (
		<form onSubmit={onSubmit} className='w-full max-w-sm'>
			{error && <p className='text-red-500'>{error}</p>}

			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Email
				</label>
				<input
					type='email'
					name='email'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					required
				/>
			</div>

			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Password
				</label>
				<input
					type='password'
					name='password'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					required
				/>
			</div>

			{isSignup && (
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						Display Name
					</label>
					<input
						type='text'
						name='displayName'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						required
					/>
				</div>
			)}

			{isSignup && (
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						Are you a business owner?
					</label>
					<input type='checkbox' name='isBusinessOwner' />
				</div>
			)}

			<div className='flex items-center justify-between'>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					{isSignup ? 'Sign up' : 'Log in'}
				</button>
			</div>
		</form>
	);
};

export default AuthForm;
