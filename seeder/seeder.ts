import mongoose from "mongoose";
import Room from "../backend/models/room";
import { rooms } from "./data";

const seedRooms = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/room-wise");

		await Room.deleteMany();
		console.log("Rooms are deleted");

		// add rooms to database
		await Room.insertMany(rooms);
		console.log("Rooms are added");

		process.exit();
	} catch (error) {
		console.log(error);
		// exit immediately if got error
		process.exit();
	}
};

// must call
seedRooms();
