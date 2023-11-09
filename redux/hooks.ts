import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, type AppDisPatch } from "./store";

// use thru out app instead of plain useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDisPatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
