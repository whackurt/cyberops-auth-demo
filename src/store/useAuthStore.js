import { create } from 'zustand';

export const useAuthStore = create((set) => ({
	signUpEmail: '',
	signUpPassword: '',

	setEmail: (data) => set({ signUpEmail: data }),
	setPassword: (data) => set({ signUpPassword: data }),
}));
