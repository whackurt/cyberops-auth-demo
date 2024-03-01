import React from 'react';

const AuthLayout = ({ children }) => {
	return (
		<div className="flex justify-center  bg-blue-600 w-full h-screen">
			{children}
		</div>
	);
};

export default AuthLayout;
