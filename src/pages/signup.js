import Head from 'next/head';
import Signup from '../components/Signup';

const SignupPage = () => {
	return (
		<div>
			<Head>
				<title>Sign up - City Events</title>
				<meta name='description' content='Sign up for City Events' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='flex justify-center items-center min-h-screen'>
				<Signup />
			</main>
		</div>
	);
};

export default SignupPage;
