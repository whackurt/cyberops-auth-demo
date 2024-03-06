import React from 'react';
import AuthLayout from '../components/AuthLayout';
import { Button, Input } from '@nextui-org/react';
import { EyeSlashFilledIcon } from '../components/icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../components/icons/EyeFilledIcon';
import { LoginUser } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const [isVisible, setIsVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const [message, setMessage] = React.useState('');

	const [loginData, setLoginData] = React.useState({});

	const navigate = useNavigate();

	const toggleVisibility = () => setIsVisible(!isVisible);

	const login = async () => {
		setIsLoading(true);

		const res = await LoginUser(loginData);

		if (res.status === 200) {
			const data = res.data;

			setSuccess(data.success);
			setMessage(data.message);
			localStorage.setItem('access_token', data.token);

			navigate('/');
		} else {
			setSuccess(false);
			setMessage(res.response.data.message);
		}

		setIsLoading(false);
	};

	return (
		<AuthLayout>
			<div className="flex flex-col items-center pt-12">
				<div className="flex-col bg-white rounded-md p-8 lg:w-[400px]">
					<div className="flex flex-col items-center">
						<h1 className="font-semibold text-blue-600">TE321 - Cyberops</h1>
						<hr />
						<p className="">Authentication & Password</p>
						<p>Demo</p>
					</div>
					<h2 className="text-2xl font-semibold text-center my-6 text-blue-600">
						Login
					</h2>
					<div className="flex flex-col gap-y-4">
						<Input
							type="email"
							label="Email"
							variant="bordered"
							color="primary"
							radius="sm"
							size="sm"
							onChange={(e) =>
								setLoginData({
									...loginData,
									email: e.target.value,
								})
							}
						/>
						<Input
							label="Password"
							variant="bordered"
							color="primary"
							radius="sm"
							size="sm"
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={toggleVisibility}
								>
									{isVisible ? (
										<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
									) : (
										<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
									)}
								</button>
							}
							type={isVisible ? 'text' : 'password'}
							onChange={(e) =>
								setLoginData({
									...loginData,
									password: e.target.value,
								})
							}
						/>

						<div className="flex justify-end">
							<div className="flex">
								<p className="text-xs">Don't have an account yet? </p>
								<Link to={'/signup'}>
									<p className="text-xs font-bold text-blue-500">Sign Up</p>
								</Link>
							</div>
						</div>

						<Button
							className="my-3"
							color="primary"
							variant="bordered"
							isLoading={isLoading}
							onClick={login}
						>
							Login
						</Button>

						<p
							className={`${
								success ? 'text-green-600' : 'text-red-500'
							}  text-xs text-center`}
						>
							{message}
						</p>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Login;
