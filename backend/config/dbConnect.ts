import mongoose from 'mongoose';

const dbConnect = async () => {
	// check if connected || connecting
	if (mongoose.connection.readyState >= 1) return;

	let DB_URI: string = '';

	// non-null assertion operator (!)
	// not going to be undefined or null
	if (process.env.NODE_ENV === 'development')
		DB_URI = process.env.DB_LOCAL_URI!;

	if (process.env.NODE_ENV === 'production') DB_URI = process.env.DB_URI!;

	// connect to database
	await mongoose
		.connect(DB_URI)
		.then((con) => console.log('DB successfully connected'));
};

export default dbConnect;
