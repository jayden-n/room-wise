import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user";
import { delete_file, upload_file } from "../utils/cloudinary";
import { resetPasswordHTMLTemplate } from "../utils/emailTemplates";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";

import crypto from "crypto";

// ======================== register user => /api/auth/register ========================
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

// ======================== Update user profile  =>  /api/me/update ========================
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

// ======================== Update password  =>  /api/me/update_password ========================
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

// ======================== Upload user avatar  =>  /api/me/upload_avatar ========================
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

// ======================== Forgot password => /api/password/forgot ========================
export const forgotPassword = catchAsyncErrors(async (req: NextRequest) => {
	const body = await req.json();
	const user = await User.findOne({ email: body.email });

	if (!user) {
		throw new ErrorHandler("User not found with this email", 404);
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	// save user data to the db after being adjusted
	await user.save();

	// create reset password url
	const resetUrl = `${process.env.API_URL}/password/reset/${resetToken}`;

	const message = resetPasswordHTMLTemplate(user?.name, resetUrl);

	try {
		await sendEmail({
			email: user.email,
			subject: "RoomWise Password Recovery",
			message,
		});
	} catch (error: any) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();
		throw new ErrorHandler(error?.message, 500);
	}

	return NextResponse.json({
		success: true,
		user,
	});
});

// ======================== Reset password => /api/password/reset/:token ========================
export const resetPassword = catchAsyncErrors(
	async (req: NextRequest, { params }: { params: { token: string } }) => {
		const body = await req.json();

		// hash/encrypt the token
		const resetPasswordToken = crypto
			.createHash("sha256")
			.update(params.token)
			.digest("hex");

		const user = await User.findOne({
			resetPasswordToken,
			// value of password expired should be greater than Date.now()
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (!user) {
			throw new ErrorHandler(
				"Password reset token is invalid or has been expired...",
				404,
			);
		}

		if (body.password !== body.confirmPassword) {
			throw new ErrorHandler("Password does not match", 400);
		}

		// set the new password to db
		user.password = body.password;

		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		return NextResponse.json({
			success: true,
		});
	},
);
