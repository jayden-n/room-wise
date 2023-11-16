"use client";

import { useRegisterMutation } from "@/redux/api/authApi";
// must be navigation, not from "next/router"
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

const Register = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = user;

	const router = useRouter();

	// call this hook from redux TK query to register user
	const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

	useEffect(() => {
		if (error && "data" in error) {
			toast.error(error?.data?.errMessage);
		}
		if (isSuccess) {
			router.push("/login");
			toast.success("Account Registered! Please login now.");
		}
	}, [error, isSuccess]);

	// form submission
	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userData = {
			name,
			email,
			password,
		};

		// this is your body into redux TK query user data
		register(userData);
	};

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		// key and value user
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className='wrapper'>
			<div className='col-10 col-lg-5'>
				<form className='shadow rounded bg-body' onSubmit={submitHandler}>
					<h2 className='mb-4'>Join Us</h2>

					<div className='mb-3'>
						<label htmlFor='name_field' className='form-label'>
							{" "}
							Full Name{" "}
						</label>
						<input
							type='text'
							id='name_field'
							className='form-control'
							name='name'
							value={name}
							onChange={onChange}
						/>
					</div>

					<div className='mb-3'>
						<label className='form-label' htmlFor='email_field'>
							{" "}
							Email{" "}
						</label>
						<input
							type='email'
							id='email_field'
							className='form-control'
							name='email'
							value={email}
							onChange={onChange}
						/>
					</div>

					<div className='mb-3'>
						<label className='form-label' htmlFor='password_field'>
							{" "}
							Password{" "}
						</label>
						<input
							type='password'
							id='password_field'
							className='form-control'
							name='password'
							value={password}
							onChange={onChange}
							disabled={isLoading}
						/>
					</div>

					<button type='submit' className='btn form-btn w-100 py-2'>
						{isLoading ? <ButtonLoader /> : "Register"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
