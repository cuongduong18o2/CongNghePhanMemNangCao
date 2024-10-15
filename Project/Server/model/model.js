const mongoose = require("mongoose");

//models room
const RoomSchema = new mongoose.Schema(
  {
    RoomName: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
      min: 0,
    },
    Genres: {
      type: String,
    },
    RoomStatus: {
      type: String,
      required: true,
      enum: ["available", "booked", "maintenance"],
    },
  },
  { timestamps: true }
);

//models booking
const BookingSchema = new mongoose.Schema(
  {
    IdUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    IdRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    CheckIn: {
      type: String,
    },
    CheckOut: {
      type: String,
    },

    Status: {
      type: String,
      required: true,
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

//modles user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    BookingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);
let Booking = mongoose.model("Booking", BookingSchema);
let Room = mongoose.model("Room", RoomSchema);

module.exports = { User, Booking, Room };
