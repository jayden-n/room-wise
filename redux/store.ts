import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

export const store = configureStore({
	reducer: {
		auth: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisPatch = typeof store.dispatch;
