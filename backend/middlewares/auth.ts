import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "../models/user";

// authenticated route
export const isAuthenticatedUser = async (
	req: NextRequest,
	event: any,
	next: any,
) => {
	// from JWT
	const session = await getToken({ req });

	if (!session) {
		return NextResponse.json(
			{
				message: "Please login first to access this route",
			},
			{ status: 401 },
		);
	}

	req.user = session.user as IUser;
	return next();
};
