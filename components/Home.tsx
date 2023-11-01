import React, { useEffect } from 'react';
import RoomItem from './room/RoomItem';
import toast from 'react-hot-toast';
import { IRoom } from '@/backend/models/room';
import CustomPagination from './layout/CustomPagination';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface IProps {
  data: {
    resPerPage: number;
    success: boolean;
    filteredRoomCount: number;
    rooms: IRoom[];
  };
}

const Home = ({ data }: IProps) => {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');

  // pull them out from "data"
  const { rooms, resPerPage, filteredRoomCount } = data;

  return (
    <div>
      <section id='rooms' className='container mt-5'>
        <h2 className='mb-3 ml-2 stays-heading'>
          {location
            ? // or filteredRoomCount
              `${rooms?.length} rooms found in "${location}"`
            : 'All rooms'}
        </h2>
        <Link href='/search' className='ml-2 back-to-search'>
          <i className='fa fa-arrow-left'></i> Back to Search
        </Link>

        <div className='row mt-4'>
          {rooms?.length === 0 ? (
            <div className='alert alert-danger mt-5 w-100'>
              <b>No Rooms.</b>
            </div>
          ) : (
            rooms?.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>
      <CustomPagination
        resPerPage={resPerPage}
        filteredRoomCount={filteredRoomCount}
      />
    </div>
  );
};

export default Home;
