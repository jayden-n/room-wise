import mongoose, { Document, Schema, mongo } from 'mongoose';

export interface ILocation {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;

  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;

  isInternet: boolean;
  isBreakfast: boolean;
  isAirCondition: boolean;
  isPetsAllowed: boolean;
  isRoomCleaning: boolean;

  ratings: number;
  numOfReviews: number;

  images: IImage[];

  category: string;
  reviews: IReview[];

  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter room name'],

    // removing all the blank/spaces from room name
    trim: true,
    maxLength: [200, 'Room name cannot exceed 100 characters'],
  },

  description: {
    type: String,
    required: [true, 'Please enter a room name'],
  },

  pricePerNight: {
    type: Number,
    required: [true, 'Please enter room price per night'],
    default: 0.0,
  },

  address: {
    type: String,
    required: [true, 'Please enter room address'],
  },

  location: {
    type: {
      type: String,

      // can only have this "Point" value when using ENUM
      // coordinates need to have a point field
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],

      // "2dsphere" is commonly used whenever you want to store Geospatial Data
      // such as storing coordinates / details of this location
      index: '2dsphere',
    },

    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },

  guestCapacity: {
    type: Number,
    required: [true, 'Please enter room guest capacity'],
  },

  numOfBeds: {
    type: Number,
    required: [true, 'Please enter number of beds in room'],
  },

  // hotels must have Internet option, otherwise it would be boring :/
  isInternet: {
    type: Boolean,
    default: false,
  },

  isBreakfast: {
    type: Boolean,
    default: false,
  },

  isAirCondition: {
    type: Boolean,
    default: false,
  },

  isPetsAllowed: {
    type: Boolean,
    default: false,
  },

  isRoomCleaning: {
    type: Boolean,
    default: false,
  },

  ratings: {
    type: Number,
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  // MUST have 2 values for Cloudnary images storage
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, 'Please enter room category'],
    enum: {
      values: ['King', 'Single', 'Twins'],
      message: 'Please select correct category for room',
    },
  },

  reviews: [
    {
      // track user's review
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  // you must save the user ID that has created this room (for review feature)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>('Room', roomSchema);
