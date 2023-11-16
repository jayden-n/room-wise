import dbConnect from "@/backend/config/dbConnect";
import { uploadAvatar } from "@/backend/controllers/authControllers";

import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

// successfully authenticate
router.use(isAuthenticatedUser).put(uploadAvatar);

// fix: has to be PUT
export async function PUT(request: NextRequest, ctx: RequestContext) {
	return router.run(request, ctx);
}
