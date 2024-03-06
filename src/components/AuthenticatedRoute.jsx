import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
	if (localStorage.getItem('access_token')) {
		return <Navigate to={'/'} replace />;
	}

	return children;
};

export default AuthenticatedRoute;
