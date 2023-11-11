import { IUser } from "@/backend/models/user";
import "@reduxjs/toolkit/query/react";
import "next/server";

declare module "next/server" {
	interface NextRequest {
		user: IUser;
	}
}

declare module "@reduxjs/toolkit/query/react" {
	interface FetchBaseQueryError {
		data?: any;
	}
}
