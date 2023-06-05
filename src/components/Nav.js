import { useState, useEffect, useContext } from 'react';
import { auth, signOut, logEvent } from '../utils/firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContext } from '../utils/userContext';

const Nav = () => {
	const { user, updateUser } = useContext(UserContext);
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();
	const { id } = router.query;

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
		handleButtonClick();
	};

	const handleButtonClick = () => {
		logEvent('button_click', { label: 'my_button' });
	};

	async function handleSignOut() {
		try {
			await auth.signOut();
			router.push('/');
		} catch (error) {
			console.error('Failed to log out', error);
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
			if (currentUser) {
				// Fetch the user data from Firestore
				const res = await fetch(`/api/users/${currentUser.uid}`);
				if (res.ok) {
					const userData = await res.json();
					// Update your context with the user data from Firestore
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

	return (
		<nav className='flex items-center justify-between flex-wrap bg-indigo-500 p-6'>
			<div className='logo'>
				<h2>
					<Link
						href={'/'}
						onClick={() => setMenuOpen(false)}
						className='block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4'
					>
						Mira El Paso
					</Link>
				</h2>
			</div>

			{/* Hamburger menu icon */}
			<div className='block lg:hidden'>
				<button
					onClick={toggleMenu}
					className='flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white'
				>
					<svg
						className='fill-current h-3 w-3'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>Menu</title>
						<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
					</svg>
				</button>
			</div>

			{/* Navigation menu */}
			<div
				className={`${
					menuOpen ? 'block' : 'hidden'
				} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
			>
				<div className='text-sm lg:flex-grow'>
					{/* Navigation links */}

					{user && (
						<Link
							href={'/liked'}
							onClick={() => setMenuOpen(false)}
							className='block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4'
						>
							Liked Events
						</Link>
					)}
					{user && user.role === 'business_owner' && (
						<Link
							href='/create-event'
							onClick={() => setMenuOpen(false)}
							className='block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4'
						>
							Create Event
						</Link>
					)}
					{user && (
						<Link
							href={`/account/${user.uid}`}
							onClick={() => setMenuOpen(false)}
							className='block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4'
						>
							Account
						</Link>
					)}
				</div>

				<div>
					{user ? (
						<>
							<button
								onClick={() => {
									setMenuOpen(false);
									handleSignOut();
								}}
								className='block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4'
							>
								Logout
							</button>
							<div>
								<p>{user.uid}</p>
							</div>
						</>
					) : (
						<>
							<Link
								href='/login'
								onClick={() => setMenuOpen(false)}
								className='block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4'
							>
								Login
							</Link>
							<Link
								href='/signup'
								onClick={() => setMenuOpen(false)}
								className='block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4'
							>
								/ Signup
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

const NavWithContext = () => (
	<UserContext.Provider>
		<Nav />
	</UserContext.Provider>
);

export default Nav;
