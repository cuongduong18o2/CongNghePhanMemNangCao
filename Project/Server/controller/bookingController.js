const { User, Booking, Room } = require("../model/model");

const bookingController = {
  //add a book
  AddABooking: async (req, res) => {
    //tạo mới booking sau đó tìm ra id user thì sau đó thêm booking vào user
    try {
      const newBooking = new Booking(req.body);

      if (req.body.IdRoom) {
        const room = await Room.findById(req.body.IdRoom);
        if (!room) {
          return res.status(404).json({ message: "Room not found." });
        }
      }

      const savedBooking = await newBooking.save();

      //kiểm tra xem có user từ phí client nhập vào hay k
      if (req.body.IdUser) {
        //tìm id nào match vào với dòng if
        const user = await User.findById(req.body.IdUser);
        await user.updateOne({ $push: { BookingHistory: savedBooking._id } });
      }
      //tự động cập nhật trạn thái phòng nếu đã đặt phòng
      if (req.body.IdRoom) {
        const room = await Room.findById(req.body.IdRoom);
        if (!room) {
          return res.status(404).json({ message: "Room not found." });
        }
        await room.updateOne({ RoomStatus: "booked" });
      }

      res.status(200).json(savedBooking);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get all booking
  GetAllBooking: async (req, res) => {
    try {
      getBooking = await Booking.find();
      res.status(200).json(getBooking);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get a booking
  getABooking: async (req, res) => {
    try {
      const getABooking = await Booking.findById(req.params.id)
        .populate("IdUser")
        .populate("IdRoom");

      res.status(200).json(getABooking);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update booking
  updateBooking: async (req, res) => {
    try {
      const UpdateBooking = await Booking.findById(req.params.id);
      await UpdateBooking.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully !");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = bookingController;
