import React from 'react';
import AuthLayout from '../components/AuthLayout';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
} from '@nextui-org/react';
import { useAuthStore } from '../store/useAuthStore';
import { LoginUser, SignUpUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
	const [success, setSuccess] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [otp, setOtp] = React.useState('');

	const { signUpEmail, signUpPassword } = useAuthStore((state) => state);
	const navigate = useNavigate();

	const signup = async () => {
		setIsLoading(true);

		const res = await SignUpUser({
			email: signUpEmail,
			password: signUpPassword,
			otp: otp,
		});

		if (res.status === 201) {
			setMessage('Success');

			const loginRes = await LoginUser({
				email: signUpEmail,
				password: signUpPassword,
			});

			console.log(loginRes);

			if (loginRes.data.success) {
				localStorage.setItem('access_token', loginRes.data.token);

				setTimeout(() => {
					setMessage('Redirecting you in 5 seconds...');
				}, 1500);

				setTimeout(() => {
					navigate('/');
				}, 5000);
			}
		} else {
			setMessage(res.response.data.message);
		}

		setIsLoading(false);
	};
	return (
		<AuthLayout>
			<div className="flex items-center justify-center">
				<div className="w-[400px]">
					<Card>
						<CardHeader>
							<h1 className="font-bold text-lg text-blue-600">
								Verify Your Email
							</h1>
						</CardHeader>
						<CardBody>
							<div className="flex flex-col gap-y-3">
								<p className="text-sm">
									A One-Time Password (OTP) has been sent to your email{' '}
									<span className="font-bold">{signUpEmail}</span>.
								</p>

								<Input
									label="One Time Password"
									placeholder="Enter your OTP"
									variant="bordered"
									color="primary"
									radius="sm"
									size="sm"
									type="text"
									onChange={(e) => setOtp(e.target.value)}
								/>
							</div>

							<Button
								className="flex w-full mt-5"
								color="primary"
								variant="bordered"
								isLoading={isLoading}
								onClick={signup}
							>
								Submit
							</Button>
						</CardBody>
						<CardFooter>
							<div className="flex">
								<p className="text-center text-sm text-red-500">{message}</p>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</AuthLayout>
	);
};

export default VerifyEmail;
