import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type LoginFormData = {
	email: string;
	password: string;
};

const Login = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		register,
		handleSubmit,
		formState: { errors }, // error handling
	} = useForm<LoginFormData>();

	// react-query - so you don't have to manage any state
	const mutation = useMutation(apiClient.login, {
		onSuccess: async () => {
			showToast({ message: 'User logged in successful!', type: 'SUCCESS' });
			await queryClient.invalidateQueries('validateToken');
			navigate(location.state?.from?.pathname || '/');
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
			<span className="flex justify-between items-center">
				<span className="text-sm flex gap-1">
					Not Registered?
					<Link className="underline" to="/register">
						Create an account here!
					</Link>
				</span>
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
