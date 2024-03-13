import Question from "./Question";

const BasicFAQ = () => {
	return (
		<div className="px-4 py-12 border rounded-md">
			<div className="mx-auto max-w-4xl">
				<h3 className="mb-4 text-center text-3xl font-bold">
					Frequently asked questions
				</h3>
				<Question title="How do I create a room?" defaultOpen>
					<p>
						To create a room, navigate to the "My Hotels" section in the header
						after logging in. Fill in the required details such as room type,
						description, facilities, etc. Once all the information is entered,
						click on the "Save" button to add the room to the available
						listings.
					</p>
				</Question>
				<Question title="How do I edit a room listing that I created?">
					<p>
						To edit a room listing that you created, log in to your account and
						navigate to the "My Hotels" section. Here, you'll find a list of all
						the rooms you've created. Locate the room you wish to edit and click
						on the "View Details" button associated with that room.
					</p>
				</Question>
				<Question title="Can I delete a room listing that I no longer want to offer?">
					<p>
						Yes, you can delete a room listing that you no longer want to offer.
						Simply log in to your account and navigate to the "My Hotels"
						section. Find the room listing you wish to delete and select the
						option to delete it.
					</p>
				</Question>
				<Question title="How can I book a room?">
					<p>
						To book a room, browse through the available listings on the
						website. Once you find a room that suits your preferences, select
						your desired check-in and check-out dates, and proceed to the
						booking page. Review your information, and confirm your reservation
						by making the payment.
					</p>
				</Question>
				<Question title="How do I use the filter options to find the perfect hotel?">
					<p>
						To utilize the filter options, navigate to "View all hotels" on the
						search bar, and locate the filter section. Here, you can filter
						hotels based on various criteria such as price range, hotel type,
						star rating, facilities, and more.
					</p>
				</Question>
			</div>
		</div>
	);
};

export default BasicFAQ;
