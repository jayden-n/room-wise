import { NextRequest, NextResponse } from 'next/server';
import Room from '../models/room';

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

export const newRoom = async (req: NextRequest) => {
  const body = await req.json();
  // POST request
  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
};

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
