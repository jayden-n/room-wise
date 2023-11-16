import mongoose, { Document, Schema } from "mongoose";

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
	comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minlength: [6, "Your password must be longer than 6 characters"],
		select: false,
	},

	// for cloudinary purpose
	avatar: {
		public_id: String,
		url: String,
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

// Encrypting password before saving the user
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		// simply move on
		next();
	}
	try {
		var bcrypt = require("bcryptjs");
		this.password = await bcrypt.hash(this.password, 10);
	} catch (error) {
		console.log(error);
	}
});

// compare user password
userSchema.methods.comparePassword = async function (
	enteredPassword: string,
): Promise<boolean> {
	var bcrypt = require("bcryptjs");
	// this.password which is saved in the db
	return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User ||
	mongoose.model<IUser>("User", userSchema);
