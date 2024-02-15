import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypesSection from './TypesSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';

export type HotelFormData = {
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	pricePerNight: number;
	starRating: number;
	facilities: string[];
	adultCount: number;
	childCount: number;
	imageFiles: FileList;
};

type Props = {
	onSave: (hotelFormData: FormData) => void;
	isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
	const formMethods = useForm<HotelFormData>();
	const { handleSubmit } = formMethods;

	// formDataJSON is from our front-end form
	const onSubmit = handleSubmit((formDataJSON: HotelFormData) => {
		// create new FormData object & call our API
		const formData = new FormData();
		formData.append('name', formDataJSON.name);
		formData.append('city', formDataJSON.city);
		formData.append('country', formDataJSON.country);
		formData.append('description', formDataJSON.description);
		formData.append('type', formDataJSON.type);
		formData.append('pricePerNight', formDataJSON.pricePerNight.toString());
		formData.append('starRating', formDataJSON.starRating.toString());
		formData.append('adultCount', formDataJSON.adultCount.toString());
		formData.append('childCount', formDataJSON.childCount.toString());

		// facilities: string[];
		formDataJSON.facilities.forEach((facility, index) => {
			formData.append(`facilities[${index}]`, facility); // how you send array to server when working with formData
		});

		Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
			formData.append('imageFiles', imageFile); // multer will handle this
		});

		// submit the data to this "prop Function"
		onSave(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={onSubmit} className="flex flex-col gap-12">
				<DetailsSection />
				<TypesSection />
				<FacilitiesSection />
				<GuestsSection />
				<ImagesSection />

				<span className="flex justify-end">
					<button
						type="submit"
						className="bg-sky-500 text-white p-2 font-bold hover:bg-sky-400 text-xl rounded-md disabled:bg-gray-500"
						disabled={isLoading}
					>
						{isLoading ? 'Adding...' : 'Add hotel'}
					</button>
				</span>
			</form>
		</FormProvider>
	);
};
export default ManageHotelForm;
