import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {});

// protected route starts with /me
export const config = {
	matcher: ["/me/:path*"],
};
