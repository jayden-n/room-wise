import { NextRequest, NextResponse } from "next/server";

type HandlerFunction = (req: NextRequest, params: any) => Promise<NextResponse>;

interface IValidationError {
	message: string;
}

// asynchronous function that takes "NextRequest" and "params".
export const catchAsyncErrors =
	(handler: HandlerFunction) => async (req: NextRequest, params: any) => {
		try {
			return await handler(req, params);
		} catch (error: any) {
			if (error?.name === "CastError") {
				error.message = `Resource not found. Invalid: ${error?.path}`;
				// 400 bad request
				error.statusCode = 400;
			}

			// users will receive back values from Error object -> easy-to-understand
			if (error?.name === "ValidationError") {
				error.message = Object.values<IValidationError>(error.errors).map(
					(val) => val.message,
				);
				error.statusCode = 400;
			}

			return NextResponse.json(
				{
					message: error.message,
				},
				{
					status: error.statusCode || 500,
				},
			);
		}
	};
