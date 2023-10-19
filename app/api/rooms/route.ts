import dbConnect from '@/backend/config/dbConnect';
import { allRooms } from '@/backend/controllers/roomControllers';
import { createEdgeRouter } from 'next-connect';
import { NextRequest } from 'next/server';

interface RequestContext {
  // most of the time ID will be inside params (room ID, user ID, etc)
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(allRooms);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
