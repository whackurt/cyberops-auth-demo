import { api } from './axios';

export const SignUpUser = async (data) => {
	try {
		const res = await api.post('/auth/signup', data);
		return res;
	} catch (error) {
		return error;
	}
};

export const SendOtp = async (data) => {
	try {
		const res = await api.post('/auth/send-otp', data);
		return res;
	} catch (error) {
		return error;
	}
};

export const LoginUser = async (data) => {
	try {
		const res = await api.post('/auth/login', data);
		return res;
	} catch (error) {
		return error;
	}
};
