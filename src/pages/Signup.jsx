import React from 'react';
import AuthLayout from '../components/AuthLayout';
import { Button, Input } from '@nextui-org/react';
import { EyeSlashFilledIcon } from '../components/icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../components/icons/EyeFilledIcon';
import { FaRegCheckCircle } from 'react-icons/fa';
import { SendOtp, SignUpUser } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Signup = () => {
	const [isVisible, setIsVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [lowerValid, setLowerValid] = React.useState(false);
	const [upperValid, setUpperValid] = React.useState(false);
	const [numberValid, setNumberValid] = React.useState(false);
	const [specialValid, setSpecialValid] = React.useState(false);
	const [eightCharValid, setEightCharValid] = React.useState(false);
	const [valid, setValid] = React.useState(false);
	const [signupData, setSignupData] = React.useState({});

	const [success, setSuccess] = React.useState(false);
	const [message, setMessage] = React.useState('');

	const navigate = useNavigate();

	const { setEmail, setPassword } = useAuthStore((state) => state);

	const invalidColor = '#808080';
	const validColor = '#089e00';

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleChange = (value) => {
		const lower = new RegExp('(?=.*[a-z])');
		const upper = new RegExp('(?=.*[A-Z])');
		const number = new RegExp('(?=.*[0-9])');
		const special = new RegExp('(?=.*[!@#$%^&*])');
		const length = new RegExp('(?=.{8,})');

		if (lower.test(value)) {
			setLowerValid(true);
		} else {
			setLowerValid(false);
		}

		if (upper.test(value)) {
			setUpperValid(true);
		} else {
			setUpperValid(false);
		}

		if (number.test(value)) {
			setNumberValid(true);
		} else {
			setNumberValid(false);
		}

		if (special.test(value)) {
			setSpecialValid(true);
		} else {
			setSpecialValid(false);
		}

		if (length.test(value)) {
			setEightCharValid(true);
		} else {
			setEightCharValid(false);
		}

		if (
			lowerValid &&
			upperValid &&
			numberValid &&
			specialValid &&
			eightCharValid
		) {
			setValid(true);
		} else {
			setValid(false);
		}
	};

	const verify = async () => {
		setIsLoading(true);

		if (valid) {
			await setEmail(signupData.email);
			await setPassword(signupData.password);

			const res = await SendOtp({ email: signupData.email });

			if (res.status == 200) {
				navigate('/verify');
			}
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
						Sign up
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
								setSignupData({
									...signupData,
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
							onChange={(e) => {
								handleChange(e.target.value);
								setSignupData({ ...signupData, password: e.target.value });
							}}
						/>
						<div className="flex flex-col border rounded-md text-sm p-2 gap-y-2">
							<div className="flex items-center gap-x-1">
								<FaRegCheckCircle
									color={`${lowerValid ? validColor : invalidColor}`}
									size={16}
								/>
								<p>At least one lowercase letter</p>
							</div>
							<div className="flex items-center gap-x-1">
								<FaRegCheckCircle
									color={`${upperValid ? validColor : invalidColor}`}
									size={16}
								/>
								<p>At least one uppercase letter</p>
							</div>
							<div className="flex items-center gap-x-1">
								<FaRegCheckCircle
									color={`${numberValid ? validColor : invalidColor}`}
									size={16}
								/>
								<p>At least one number</p>
							</div>
							<div className="flex items-center gap-x-1">
								<FaRegCheckCircle
									color={`${specialValid ? validColor : invalidColor}`}
									size={16}
								/>
								<p>At least one special character</p>
							</div>
							<div className="flex items-center gap-x-1">
								<FaRegCheckCircle
									color={`${eightCharValid ? validColor : invalidColor}`}
									size={16}
								/>
								<p>At least 8 characters</p>
							</div>
						</div>
						<div className="flex justify-end">
							<div className="flex">
								<p className="text-xs">Already have an account? </p>
								<Link to={'/login'}>
									<p className="text-xs font-bold text-blue-500">Login</p>
								</Link>
							</div>
						</div>
						<Button
							className="my-3"
							color="primary"
							variant="bordered"
							isLoading={isLoading}
							disabled={!valid}
							onClick={verify}
						>
							Sign Up
						</Button>

						<p
							className={`${
								success ? 'text-green-600' : 'text-red-500'
							} text-xs text-center`}
						>
							{message}
						</p>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
};

export default Signup;
