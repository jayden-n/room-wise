import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user";
import { delete_file, upload_file } from "../utils/cloudinary";
import ErrorHandler from "../utils/errorHandler";

// register user => /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
	const body = await req.json();

	const { name, email, password } = body;

	const user = await User.create({
		name,
		email,
		password,
	});

	return NextResponse.json({
		success: true,
	});
});

// Update user profile  =>  /api/me/update
export const updateProfile = catchAsyncErrors(async (req: NextRequest) => {
	const body = await req.json();

	const userData = {
		name: body.name,
		email: body.email,
	};

	const user = await User.findByIdAndUpdate(req.user._id, userData);

	return NextResponse.json({
		success: true,
		user,
	});
});

// Update password  =>  /api/me/update_password
export const updatePassword = catchAsyncErrors(async (req: NextRequest) => {
	const body = await req.json();

	const user = await User.findById(req?.user?._id).select("+password");

	const isMatched = await user.comparePassword(body.oldPassword);

	if (!isMatched) {
		throw new ErrorHandler("Old password is incorrect", 400);
	}
	user.password = body.password;
	await user.save();

	return NextResponse.json({
		success: true,
	});
});

// Upload user avatar  =>  /api/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req: NextRequest) => {
	const body = await req.json();

	// file & folder
	const avatarResponse = await upload_file(body?.avatar, "roomwise/avatars");

	// remove avatar from cloudinary
	if (req?.user?.avatar?.public_id) {
		await delete_file(req?.user?.avatar?.public_id);
	}

	const user = await User.findByIdAndUpdate(req?.user?._id, {
		avatar: avatarResponse,
	});

	return NextResponse.json({
		success: true,
		user,
	});
});
