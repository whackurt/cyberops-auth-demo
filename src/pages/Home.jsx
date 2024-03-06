import React from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('access_token');
		navigate('/login');
	};

	return (
		<div className="flex flex-col w-full h-screen justify-center items-center bg-gray-100">
			<div className="flex flex-col mb-6 items-center">
				<h1 className="text-purple-600 font-bold text-xl">
					Welcome to TE321 - CyberOps
				</h1>
				<p className="text-red-500 text-xl">
					Authentication & Passwords Demonstration
				</p>

				<p className="mt-4 ">by CPE3A - Group A</p>
			</div>

			<Button color="danger" variant="bordered" size="md" onClick={logout}>
				Log out
			</Button>
		</div>
	);
};

export default Home;
