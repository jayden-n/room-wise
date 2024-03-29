import { useForm } from 'react-hook-form';
import * as apiClient from '../api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export type RegisterFormData = {
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
};

const Register = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { showToast } = useAppContext();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	// react-query - so you don't have to manage any state
	const mutation = useMutation(apiClient.register, {
		onSuccess: async () => {
			showToast({ message: 'Registration successful!', type: 'SUCCESS' });

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
		// form will submit the user data, which then be passed to handleSubmit (react-hook-form)
		<form className="flex flex-col gap-5" onSubmit={onSubmit}>
			<h2 className="text-3xl font-bold">Create an account</h2>
			<div className="flex flex-col gap-5 md:flex-row ">
				{/* ============================== FIRST NAME ============================== */}
				{/* flex-1 will stretch out full width*/}
				<label className="flex-1 text-sm font-bold text-gray-700">
					First Name
					<input
						type="text"
						className="w-full rounded border px-2 py-1 font-normal"
						{...register('firstName', { required: 'This field is required' })}
					/>
					{errors.firstName && (
						<span className="text-red-500">{errors.firstName.message}</span>
					)}
				</label>

				{/* ============================== LAST NAME ============================== */}
				<label className=" flex-1 text-sm font-bold  text-gray-700">
					Last Name
					<input
						type="text"
						className="w-full rounded border px-2 py-1 font-normal"
						{...register('lastName', { required: 'This field is required' })}
					/>
					{errors.lastName && (
						<span className="text-red-500">{errors.lastName.message}</span>
					)}
				</label>
			</div>

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

			{/* ============================== CONFIRM PASSWORD ============================== */}
			<label className="flex-1 text-sm font-bold  text-gray-700">
				Confirm Password
				<input
					type="password"
					className="w-full rounded border px-2 py-1 font-normal"
					{...register('confirmPassword', {
						// check for errors if the 2 passwords are matching || empty
						validate: (typedInUserPassword) => {
							if (!typedInUserPassword) {
								return 'This field is required';
							} else if (watch('password') !== typedInUserPassword) {
								return 'Your passwords do not match. Please try again :(';
							}
						},
					})}
				/>
				{errors.confirmPassword && (
					<span className="text-red-500">{errors.confirmPassword.message}</span>
				)}
			</label>

			{/* ============================== SUBMIT BUTTON ============================== */}
			<span className="flex justify-between items-center">
				<span className="text-sm flex gap-1">
					Already a member?
					<Link className="underline" to="/login">
						Login here!
					</Link>
				</span>
				<button
					type="submit"
					className="bg-sky-500 text-white py-2 px-4 font-bold rounded hover:bg-sky-600 text-xl"
				>
					Register
				</button>
			</span>
		</form>
	);
};
export default Register;
