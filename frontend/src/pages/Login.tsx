import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export type LoginFormData = {
	email: string;
	password: string;
};

const Login = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	4;
	const {
		register,
		handleSubmit,
		formState: { errors }, // error
	} = useForm<LoginFormData>();

	// react-query - so you don't have to manage any state
	const mutation = useMutation(apiClient.login, {
		onSuccess: async () => {
			showToast({ message: 'User logged in successful!', type: 'SUCCESS' });
			// force the "validateToken" fn to run again
			// => to check the expired token
			await queryClient.invalidateQueries('validateToken');
			// navigates user to homepage after registration
			navigate('/');
		},

		// "Error" came from fetch request (apiClient)
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' });
		},
	});

	const onSubmit = handleSubmit((data) => {
		// pass user data to "register" fetch (from apiClient)
		mutation.mutate(data);
	});

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-5">
			<h2 className="text-3xl font-bold">Login</h2>

			{/* ============================== EMAIL ============================== */}
			<label className="flex-1 text-sm font-bold  text-gray-700">
				Email
				<input
					type="email"
					className="w-full rounded border px-2 py-1 font-normal"
					{...register('email', { required: 'This field is required' })}
				/>
				{errors.email && (
					<span className="text-red-500">{errors.email.message}</span>
				)}
			</label>

			{/* ============================== PASSWORD ============================== */}
			<label className="flex-1 text-sm font-bold text-gray-700">
				Password
				<input
					type="password"
					className="w-full rounded border px-2 py-1 font-normal"
					{...register('password', {
						required: 'This field is required',
						// validating password length
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters',
						},
					})}
				/>
				{errors.password && (
					<span className="text-red-500">{errors.password.message}</span>
				)}
			</label>

			{/* ============================== SUBMIT BUTTON ============================== */}
			<span>
				<button
					type="submit"
					className="bg-sky-500 text-white p-2 font-bold rounded hover:bg-sky-600 text-xl"
				>
					Login
				</button>
			</span>
		</form>
	);
};
export default Login;
