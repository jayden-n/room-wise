import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	avatar: {
		public_id: string;
		url: string;
	};
	role: string;
	createdAt: Date;

	resetPasswordToken: string;
	resetPasswordExpire: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your name'],
	},

	email: {
		type: String,
		required: [true, 'Please enter your email'],
		unique: true,
	},

	password: {
		type: String,
		required: [true, 'Please enter your password'],
		minlength: [6, 'Your password must be longer than 6 characters'],
		select: false,
	},

	avatar: {
		public_id: String,
		url: String,
	},

	role: {
		type: String,
		default: 'user',
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

export default mongoose.models.User ||
	mongoose.model<IUser>('User', userSchema);
