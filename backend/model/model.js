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
    Image: {
      type: String,
    },
    Special: {
      type: String,
    },
    Convenient: {
      type: String,
    },
    Description: {
      type: String,
    },
    Capacity: {
      type: String,
    },
  },
  { timestamps: true }
);

//models booking service
const BookingServiceSchema = new mongoose.Schema(
  {
    IdUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    UsernameService: {
      type: String,
    },
    nameService: {
      type: String,
    },
    TenPhong: {
      type: String,
    },

    TotalPriceService: {
      type: Number,
    },
    Quantity: {
      type: Number,
    },
    StatusService: {
      type: String,
      required: true,
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);
//models booking
const BookingSchema = new mongoose.Schema(
  {
    IdUser: {
      //này cũng có thể lấy ra được
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    IdRoom: {
      //có thể lấy ra được giá, tên và các thuộc tính khác
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    CheckIn: {
      type: String,
      required: true,
    },
    CheckOut: {
      type: String,
      required: true,
    },

    Status: {
      type: String,
      required: true,
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
    },

    MethodsPayment: {
      type: String, // Thêm trường phương thức thanh toán
      enum: ["credit_card", "paypal", "bank_transfer", "tiền mặt"],
      default: "tiền mặt",
    },

    UserName: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
    },
    TotalPrice: {
      type: Number,
    },
    nameRoom: {
      type: String,
    },
  },
  { timestamps: true }
);
//service schema
const serviceSchema = new mongoose.Schema({
  nameService: {
    type: String,
  },
  Price: {
    type: String,
  },
  Quantity: {
    type: Number,
  },
  ImageService: {
    type: String,
  },
});

//report schema
const reportSchema = new mongoose.Schema({
  nameUserReport: {
    type: String,
  },
  Content: {
    type: String,
  },
  Time: {
    type: String,
  },
  Phone: {
    type: String,
  },
  StatusReport: {
    type: String,
    enum: ["chưa xử lý", "đã xử lý"],
    default: "chưa xử lý",
  },
});

//modles user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 50,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    BookingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],

    BookingServiceHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingService",
      },
    ],
  },
  { timestamps: true }
);

//doanh thu\
const RevenueSchema = new mongoose.Schema(
  {
    Date: {
      type: Date,
      required: true,
      default: Date.now,
      unique: true,
    },
    TotalRevenueFromBookings: {
      type: Number,
      required: true,
      default: 0,
    },
    TotalRevenueFromServices: {
      type: Number,
      required: true,
      default: 0,
    },
    TotalRevenue: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);
let Booking = mongoose.model("Booking", BookingSchema);
let Room = mongoose.model("Room", RoomSchema);
let Service = mongoose.model("Service", serviceSchema);
let Report = mongoose.model("Report", reportSchema);
let BookingService = mongoose.model("BookingService", BookingServiceSchema);
let Revenue = mongoose.model("Revenue", RevenueSchema);

module.exports = {
  User,
  Booking,
  Room,
  Service,
  Report,
  BookingService,
  Revenue,
};
