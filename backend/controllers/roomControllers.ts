import { NextRequest, NextResponse } from 'next/server';
import Room, { IRoom } from '../models/room';
import ErrorHandler from '../utils/errorHandler';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import APIFilters from '../utils/apiFilters';

// GET all rooms => /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
  // pagination displaying
  const resPerPage: number = 4;

  const { searchParams } = new URL(req.url);
  // console.log(searchParams);

  throw new ErrorHandler('hello', 400);
  const queryStr: any = {};

  // forEach loop will get ALL matched values on searchParams
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });
  // console.log(queryStr);

  // counting the total number of documents in the "Room" collection in the database.
  // for Front-End pagination usage
  const roomsCount: number = await Room.countDocuments();

  const apiFilters = new APIFilters(Room, queryStr).search().filter();

  let rooms: IRoom[] = await apiFilters.query;
  const filteredRoomCount: number = rooms.length;

  // After search || filter methods, pagination will come to place
  apiFilters.pagination(resPerPage);

  // ERROR: Mongoose no longer allows executing the same query object twice.
  // If you do, you'll get a Query was already executed error. Executing the same query instance twice is typically indicative of mixing callbacks and promises

  // SOLUTION: use .clone() to fix: Query was already executed: Room.find({})
  rooms = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    filteredRoomCount,
    roomsCount,
    resPerPage,
    rooms,
  });
});

// CREATE new room => /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  // POST request
  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// GET room details => /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler('Room not found', 404);
    }

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// UPDATE room details => /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler('Room not found', 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
      // If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
      new: true,
    });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// DELETE room => /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: any } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler('Room not found', 404);
    }

    // TODO: delete images associated with the room

    await room.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
