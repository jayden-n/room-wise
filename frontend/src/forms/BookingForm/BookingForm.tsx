import { useForm } from 'react-hook-form';
import {
	PaymentIntentResponse,
	UserType,
} from '../../../../backend/src/shared/types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useSearchContext } from '../../contexts/SearchContext';
import { useNavigate, useParams } from 'react-router-dom';
import { QueryClient, useMutation } from 'react-query';
import * as apiClient from '../../api-client';
import { useAppContext } from '../../contexts/AppContext';

type Props = {
	currentUser: UserType;
	paymentIntent: PaymentIntentResponse;
	queryClient: QueryClient;
};

export type BookingFormData = {
	email: string;
	firstName: string;
	lastName: string;
	adultCount: number;
	childCount: number;
	checkIn: string;
	checkOut: string;
	hotelId: string;
	paymentIntentId: string;
	totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent, queryClient }: Props) => {
	const stripe = useStripe();
	const elements = useElements();
	const search = useSearchContext();
	const { hotelId } = useParams();
	const { showToast } = useAppContext();
	const navigate = useNavigate();

	const { mutate: bookRoom, isLoading } = useMutation(
		apiClient.createRoomBooking,
		{
			onSuccess: async () => {
				showToast({ message: 'Booking Saved!', type: 'SUCCESS' });
				await queryClient.invalidateQueries('fetchMyBookings'); // Manually trigger a re-fetch of 'fetchMyBookings' query
			},
			onError: () => {
				showToast({ message: 'Error saving booking', type: 'ERROR' });
			},
		},
	);

	const { handleSubmit, register } = useForm<BookingFormData>({
		defaultValues: {
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			email: currentUser.email,
			adultCount: search.adultCount,
			childCount: search.childCount,
			checkIn: search.checkIn.toISOString(),
			checkOut: search.checkOut.toISOString(),
			hotelId: hotelId,
			totalCost: paymentIntent.totalCost,
			paymentIntentId: paymentIntent.paymentIntentId,
		},
	});

	// stripe submission
	const onSubmit = async (formData: BookingFormData) => {
		if (!stripe || !elements) {
			return;
		}

		const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement) as StripeCardElement,
			},
		});

		if (result.paymentIntent?.status === 'succeeded') {
			// book the room
			bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
			navigate('/my-bookings');
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-1 gap-5 rounded-lg border border-zinc-300 p-5"
		>
			<span className="text-3xl font-bold">Confirm Your Details</span>
			<div className="grid grid-cols-2 gap-6">
				<label className="text-gray-700 text-sm font-bold flex-1">
					First Name
					<input
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						type="text"
						readOnly
						disabled
						{...register('firstName')}
					/>
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Last Name
					<input
						className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
						type="text"
						readOnly
						disabled
						{...register('lastName')}
					/>
				</label>
			</div>
			<label className="text-gray-700 text-sm font-bold flex-1">
				Email
				<input
					className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
					type="text"
					readOnly
					disabled
					{...register('email')}
				/>
			</label>

			<div className="space-y-2">
				<h2 className="text-xl font-semibold"> Your Price Summary</h2>
				<div className="bg-green-100 p-4 rounded-md">
					<div className="font-semibold text-lg">
						Total Cost: ${paymentIntent.totalCost.toFixed(2)}
					</div>
					<div className="text-xs">Includes taxes and charges</div>
				</div>
			</div>

			<div className="space-y-2">
				<h3 className="text-xl font-semibold">Payment Details</h3>
				<CardElement
					id="payment-element"
					className="border rounded-md p-4 text-sm"
				/>

				<div className=" flex flex-col items-center text-sm text-red-400">
					<div>Feel free to test the checkout using the payment below</div>
					<div>4242 4242 4242 4242 </div>
					<div>Exp: 12/34 - CVC: 123 - Zip: 12345</div>
				</div>
			</div>

			<div className="flex justify-end">
				<button
					type="submit"
					className="bg-sky-400 text-white py-2 px-4 font-bold hover:bg-sky-500 text-md disabled:bg-gray-500 rounded-md"
					disabled={isLoading}
				>
					{isLoading ? 'Confirming' : 'Confirm Booking'}
				</button>
			</div>
		</form>
	);
};
export default BookingForm;
