import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserType } from '../shared/types';

const userSchema = new mongoose.Schema<UserType>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
});

// pre-save
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next(); // keeping db moving
});

// userSchema.methods.toJSON = function () {
// 	let obj = this.toObject();
// 	delete obj.password;
// 	return obj;
// };

const User = mongoose.model<UserType>('User', userSchema);
export default User;
