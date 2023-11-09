import dbConnect from "@/backend/config/dbConnect";
import { updateProfile } from "@/backend/controllers/authController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.put(updateProfile);

export async function GET(request: NextRequest, ctx: RequestContext) {
	return router.run(request, ctx);
}
