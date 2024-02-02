import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// for better types in frontend
export type UserType = {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

const userSchema = new mongoose.Schema({
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
