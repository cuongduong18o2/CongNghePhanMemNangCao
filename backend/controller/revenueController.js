const { Booking, BookingService, Revenue } = require("../model/model");

const RevenueController = {
  // API endpoint để cập nhật doanh thu hàng ngày
  async updateDailyRevenue(req, res) {
    try {
      // Tính tổng doanh thu từ Booking
      const totalRevenueFromBookings = await Booking.aggregate([
        { $match: { Status: "paid" } },
        { $group: { _id: null, total: { $sum: "$TotalPrice" } } },
      ]);

      // Tính tổng doanh thu từ BookingService
      const totalRevenueFromServices = await BookingService.aggregate([
        { $match: { StatusService: "paid" } },
        { $group: { _id: null, total: { $sum: "$TotalPriceService" } } },
      ]);

      const revenue = new Revenue({
        TotalRevenueFromBookings: totalRevenueFromBookings[0]?.total || 0,
        TotalRevenueFromServices: totalRevenueFromServices[0]?.total || 0,
        TotalRevenue:
          (totalRevenueFromBookings[0]?.total || 0) +
          (totalRevenueFromServices[0]?.total || 0),
      });

      // Lưu doanh thu vào cơ sở dữ liệu
      await revenue.save();
      res
        .status(201)
        .json({ message: "Doanh thu hàng ngày đã được cập nhật!" });
    } catch (error) {
      console.error("Lỗi khi cập nhật doanh thu:", error);
      res.status(500).json({ error: "Có lỗi khi cập nhật doanh thu!" });
    }
  },

  // API endpoint để lấy doanh thu hàng ngày
  async getDailyRevenue(req, res) {
    try {
      const revenue = await Revenue.find().sort({ createdAt: -1 }).limit(1);
      if (!revenue) {
        return res.status(404).json({ message: "Không tìm thấy doanh thu." });
      }
      res.status(200).json(revenue);
    } catch (error) {
      console.error("Lỗi khi lấy doanh thu:", error);
      res.status(500).json({ error: "Có lỗi khi lấy doanh thu!" });
    }
  },
};

module.exports = RevenueController;
