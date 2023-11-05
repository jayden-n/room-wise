'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
	const { data } = useSession();
	// console.log(data);

	const logoutHandler = () => {
		signOut();
	};
	return (
		<nav className='navbar sticky-top py-2'>
			<div className='container'>
				<div className='col-6 col-lg-3 p-0'>
					<div className='navbar-brand'>
						<a href='/'>
							{/* <img
                style={{ cursor: 'pointer' }}
                src='../../public/images/logo.png'
                alt='RoomWise'
              /> */}
							Room Wise
						</a>
					</div>
				</div>

				<div className='col-6 col-lg-3 mt-3 mt-md-0 text-end'>
					{/* check if user actually exists */}
					{data?.user ? (
						<div className='ml-4 dropdown d-line'>
							<button
								className='btn dropdown-toggle'
								type='button'
								id='dropdownMenuButton1'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								<figure className='avatar avatar-nav'>
									<img
										src={
											data?.user?.avatar
												? data?.user?.avatar?.url
												: '/images/default_avatar.jpg'
										}
										alt='John Doe'
										className='rounded-circle placeholder-glow'
										height='50'
										width='50'
									/>
								</figure>

								<span className='placeholder-glow ps-1'>
									{data?.user?.name}
								</span>
							</button>

							<div
								className='dropdown-menu w-100'
								aria-labelledby='dropdownMenuButton1'
							>
								<Link href='/admin/dashboard' className='dropdown-item'>
									Dashboard
								</Link>
								<Link href='/bookings/me' className='dropdown-item'>
									My Bookings
								</Link>
								<Link href='/me/update' className='dropdown-item'>
									Profile
								</Link>
								<Link
									href='/'
									className='dropdown-item text-danger'
									onClick={logoutHandler}
								>
									Logout
								</Link>
							</div>
						</div>
					) : (
						<>
							{/* session callback will be 'undefined' first, to optimize that you have to use a skeleton */}
							{data === undefined && (
								<div className='placeholder-glow'>
									<figure className='avatar avatar-nv placeholder bg-secondary'></figure>
									<span className='placeholder w-25  bg-secondary ms-2'></span>
								</div>
							)}

							{/* after that, login information will be displayed */}
							{data === null && (
								<Link
									href='/login'
									className='btn btn-danger px-4 text-white login-header-btn float-right'
								>
									Login
								</Link>
							)}
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
