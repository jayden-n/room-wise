import { HotelType } from '../../backend/src/shared/types';
import { LoginFormData } from './pages/Login';
import { RegisterFormData } from './pages/Register';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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

// add hotel
// has to be type FormData for file uploading
export const addMyHotel = async (hotelFormData: FormData) => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
		method: 'POST',
		credentials: 'include', // include any HTTP cookies along with the request (TELL THE BROWSER TO SET THE COOKIE)
		body: hotelFormData,
	});

	if (!response.ok) {
		throw new Error('Failed to add hotel');
	}

	return response.json();
};

// view hotels
// receive a promise[]
export const fetchMyHotels = async (): Promise<HotelType[]> => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
		credentials: 'include', // send to server http cookie
	});

	if (!response.ok) {
		throw new Error('Error fetching hotels');
	}

	return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Error fetching single hotel');
	}

	return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
	const response = await fetch(
		`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
		{
			method: 'PUT',
			credentials: 'include',
			body: hotelFormData,
		},
	);

	if (!response.ok) {
		throw new Error('Failed to update hotel');
	}

	return response.json();
};

export const deleteHotelById = async (hotelId: string) => {
	const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
		method: 'DELETE',
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Failed to update hotel');
	}

	return response.json();
};
