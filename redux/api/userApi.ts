import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		updateProfile: builder.mutation({
			query(body) {
				return {
					url: "/me/update",
					method: "PUT",
					body,
				};
			},
		}),
	}),
});

export const { useUpdateProfileMutation } = userApi;
