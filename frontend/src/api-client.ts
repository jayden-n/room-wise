import { LoginFormData } from './pages/Login';
import { RegisterFormData } from './pages/Register';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData): Promise<void> => {
	const response = await fetch(`${API_BASE_URL}/api/users/register`, {
		method: 'POST',
		credentials: 'include', // include any HTTP cookies along with the request (TELL THE BROWSER TO SET THE COOKIE)
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	// "translate" response body which be sent back from server
	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}
};

export const login = async (formData: LoginFormData) => {
	const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
		method: 'POST',
		credentials: 'include', // include any HTTP cookies along with the request (TELL THE BROWSER TO SET THE COOKIE)
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	// "translate" response body which be sent back from server
	const responseBody = await response.json();

	if (!response.ok) {
		throw new Error(responseBody.message);
	}
	return responseBody;
};

export const logout = async () => {
	const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
		method: 'POST',
		credentials: 'include',
	});
	if (!response.ok) {
		throw new Error('Error during logout');
	}
};

export const validateToken = async () => {
	// GET method as default
	const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Token invalid');
	}

	return response.json();
};
