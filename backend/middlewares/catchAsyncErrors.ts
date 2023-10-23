import { NextRequest, NextResponse } from 'next/server';

type HandlerFunction = (req: NextRequest, params: any) => Promise<NextResponse>;

// asynchronous function that takes "NextRequest" and "params".
export const catchAsyncErrors =
  (handler: HandlerFunction) => async (req: NextRequest, params: any) => {
    try {
      return await handler(req, params);
    } catch (error: any) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.statusCode || 500,
        }
      );
    }
  };
