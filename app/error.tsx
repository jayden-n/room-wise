"use client"; // Error components must be Client Components

interface ICustomError extends Error {
	errMessage: string;
}
export default function Error({
	error,
	reset,
}: {
	error: ICustomError;
	reset?: () => void;
}) {
	console.log(error);

	return (
		<div>
			<div className='d-flex justify-content-center align-items-center vh-100'>
				<div className='text-center'>
					<h2 className='display-4 fw-bold'>{error?.errMessage}</h2>
					<p className='fs-3'>
						<span className='text-danger'>Oops!</span> Something went wrong
					</p>
					<p className='lead'>Sorry for inconvenience</p>
					<button
						className='btn btn-primary'
						onClick={
							// Attempt to recover by trying to re-render the segment
							() => reset?.()
						}
					>
						Try again
					</button>
				</div>
			</div>
		</div>
	);
}
