const { BookingService, User, Service } = require("../model/model");
const bookingServiceController = {
  AddABookingService: async (req, res) => {
    //tạo mới booking sau đó tìm ra id user thì sau đó thêm booking vào user
    try {
      const newBookingService = new BookingService(req.body);

      if (req.body.IdService) {
        const service = await Service.findById(req.body.IdService);
        if (!service) {
          return res.status(404).json({ message: "Service not found." });
        }
      }

      const savedBooking = await newBookingService.save();

      //kiểm tra xem có user từ phí client nhập vào hay k
      if (req.body.IdUser) {
        //tìm id nào match vào với dòng if
        const user = await User.findById(req.body.IdUser);
        await user.updateOne({ $push: { BookingService: savedBooking._id } });
      }
      res.status(200).json(newBookingService);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get all booking service
  GetAllBookingService: async (req, res) => {
    try {
      GetBookingService = await BookingService.find();
      res.status(200).json(GetBookingService);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update booking service
  updateBookingSV: async (req, res) => {
    try {
      const UpdateBookingSV = await BookingService.findById(req.params.id);
      await UpdateBookingSV.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully !");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteBookingSV: async (req, res) => {
    try {
      // Tìm booking cần xóa bằng ID của booking
      const bookingSV = await BookingService.findById(req.params.id);

      if (!bookingSV) {
        return res.status(404).json({ message: "Không tìm thấy booking." });
      }
      // Xóa booking
      await BookingService.findByIdAndDelete(req.params.id);
      res.status(200).json("Đã xóa thành công!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
module.exports = bookingServiceController;
