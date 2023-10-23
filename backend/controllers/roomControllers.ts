import { NextRequest, NextResponse } from 'next/server';
import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';

// GET all rooms => /api/rooms
export const allRooms = async (req: NextRequest) => {
  // pagination displaying
  const resPerPage: number = 2;

  // GET request
  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  });
};

// CREATE new room => /api/admin/rooms
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
  try {
    const room = await Room.findById(params.id);

    throw new ErrorHandler('test', 400);

    // === normal try-catch block is not an ideal approach ===

    // if (!room) {
    //   return NextResponse.json(
    //     {
    //       message: 'Room not found',
    //     },
    //     {
    //       status: 404,
    //     }
    //   );
    // }

    return NextResponse.json({
      success: true,
      room,
    });
  } catch (error: any) {
    // console.log(error.statusCode);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: error.statusCode,
      }
    );
  }
};

// UPDATE room details => /api/admin/rooms/:id
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

// DELETE room => /api/admin/rooms/:id
export const deleteRoom = async (
  req: NextRequest,
  { params }: { params: { id: any } }
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

  // TODO: delete images associated with the room

  await room.deleteOne();

  return NextResponse.json({
    success: true,
  });
};
