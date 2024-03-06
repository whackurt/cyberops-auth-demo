import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={
							<PrivateRoute redirect={'/login'}>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route
						exact
						path="/signup"
						element={
							<AuthenticatedRoute>
								<Signup />
							</AuthenticatedRoute>
						}
					/>
					<Route
						exact
						path="/login"
						element={
							<AuthenticatedRoute>
								<Login />
							</AuthenticatedRoute>
						}
					/>
					<Route
						exact
						path="/verify"
						element={
							<AuthenticatedRoute>
								<VerifyEmail />
							</AuthenticatedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
