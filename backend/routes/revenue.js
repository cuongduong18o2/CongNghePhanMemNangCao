const express = require("express");
const RevenueController = require("../controller/revenueController");
const router = express.Router();

// API để cập nhật doanh thu hàng ngày
router.post("/update", RevenueController.updateDailyRevenue);

// API để lấy doanh thu mới nhất
router.get("/daily", RevenueController.getDailyRevenue);

module.exports = router;
