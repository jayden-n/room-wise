import { IRoom } from '@/backend/models/room';
import React, { type FC } from 'react';

interface IProps {
  room: IRoom;
}

const RoomFeatures: FC<IProps> = ({ room }) => {
  return (
    <div className='features mt-5'>
      <h3 className='mb-4'>Features:</h3>
      <div className='room-feature'>
        <i className='fa fa-cog fa-fw fa-users' aria-hidden='true'></i>
        <p>{room?.guestCapacity} Guests</p>
      </div>
      <div className='room-feature'>
        <i className='fa fa-cog fa-fw fa-bed' aria-hidden='true'></i>
        <p>{room?.numOfBeds} Beds</p>
      </div>
      <div className='room-feature'>
        <i
          className={
            room?.isBreakfast
              ? 'fa fa-check text-success'
              : 'fa fa-times text-danger'
          }
          aria-hidden='true'
        ></i>
        <p>Breakfast</p>
      </div>
      <div className='room-feature'>
        <i
          className={
            room?.isInternet
              ? 'fa fa-check text-success'
              : 'fa fa-times text-danger'
          }
          aria-hidden='true'
        ></i>
        <p>Internet</p>
      </div>
      <div className='room-feature'>
        <i
          className={
            room?.isAirCondition
              ? 'fa fa-check text-success'
              : 'fa fa-times text-danger'
          }
          aria-hidden='true'
        ></i>
        <p>Air Conditioned</p>
      </div>
      <div className='room-feature'>
        <i
          className={
            room?.isPetsAllowed
              ? 'fa fa-check text-success'
              : 'fa fa-times text-danger'
          }
          aria-hidden='true'
        ></i>
        <p>Pets Allowed</p>
      </div>
      <div className='room-feature'>
        <i
          className={
            room?.isRoomCleaning
              ? 'fa fa-check text-success'
              : 'fa fa-times text-danger'
          }
          aria-hidden='true'
        ></i>
        <p>Room Cleaning</p>
      </div>
    </div>
  );
};

export default RoomFeatures;
