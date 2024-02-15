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

const ManageHotelForm = () => {
	const formMethods = useForm<HotelFormData>();
	return (
		<FormProvider {...formMethods}>
			<form className="flex flex-col gap-12">
				<DetailsSection />
				<TypesSection />
				<FacilitiesSection />
				<GuestsSection />
				<ImagesSection />
			</form>
		</FormProvider>
	);
};
export default ManageHotelForm;
