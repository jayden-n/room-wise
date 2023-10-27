import React from 'react';

const RoomFeatures = ({ room }) => {
  return (
    <div className='features mt-5'>
      <h3 className='mb-4'>Features:</h3>
      <div className='room-feature'>
        <i className='fa fa-cog fa-fw fa-users' aria-hidden='true'></i>
        <p>4 Guests</p>
      </div>
      <div className='room-feature'>
        <i className='fa fa-cog fa-fw fa-bed' aria-hidden='true'></i>
        <p>2 Beds</p>
      </div>
      <div className='room-feature'>
        <i className='fa fa-check text-success' aria-hidden='true'></i>
        <p>Breakfast</p>
      </div>
      <div className='room-feature'>
        <i className='fa fa-check text-success' aria-hidden='true'></i>
        <p>Internet</p>
      </div>
      <div className='room-feature'>
        <i className='fa fa-check text-success' aria-hidden='true'></i>
        <p>Air Conditioned</p>
      </div>
      <div className='room-feature'>
        <i className='fa fa-check text-success' aria-hidden='true'></i>
        <p>Pets Allowed</p>
      </div>
      <div className='room-feature'>
        <i className='fa fa-check text-success' aria-hidden='true'></i>
        <p>Room Cleaning</p>
      </div>
    </div>
  );
};

export default RoomFeatures;
