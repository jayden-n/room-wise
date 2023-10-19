import { NextRequest, NextResponse } from 'next/server';
import Room from '../models/room';

// GET all rooms => /api/rooms
export const allRooms = async (req: NextRequest) => {
  // pagination displaying
  const resPerPage: number = 8;

  // GET request
  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  });
};

// CREATE new room => /api/rooms
export const newRoom = async (req: NextRequest) => {
  const body = await req.json();
  // POST request
  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
};

// GET room details => /api/rooms/:id
export const getRoomDetails = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const room = await Room.findById(params.id);

  if (!room) {
    return NextResponse.json(
      {
        message: 'Room not found',
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    room,
  });
};

// UPDATE room details => /api/rooms/:id
export const updateRoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  let room = await Room.findById(params.id);
  const body = await req.json();

  if (!room) {
    return NextResponse.json(
      {
        message: 'Room not found',
      },
      {
        status: 404,
      }
    );
  }

  room = await Room.findByIdAndUpdate(params.id, body, {
    // If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
    new: true,
  });

  return NextResponse.json({
    success: true,
    room,
  });
};
