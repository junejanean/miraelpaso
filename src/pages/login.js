// pages/login.js
import Head from 'next/head';
import Login from '../components/Login';

const LoginPage = () => {
	return (
		<div>
			<Head>
				<title>Log in - MIRA El Paso</title>
				<meta name='description' content='Log in to City Events' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='flex justify-center items-center min-h-screen'>
				<Login />
			</main>
		</div>
	);
};

export default LoginPage;
