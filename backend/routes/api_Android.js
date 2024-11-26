const express = require("express");
const router = express.Router();
const roomController = require("../controller/roomController");
const bookingController = require("../controller/bookingController");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const serviceController = require("../controller/serviceController");
const bookingservice = require("../controller/bookingServiceController");
const reportController = require("../controller/reportController");

router.get("/test", (req, res) => {
  res.send("vao api mobile");
});

router.get("/listRoom", roomController.getAllRoom);

router.post("/addBooking", bookingController.AddABooking);
router.post("/login", authController.loginUser);
router.post("/register", authController.addUser);
router.get("/getUser/:id", userController.getAnUser);
router.get("/listService", serviceController.GetAllService);
router.post("/addBookingService", bookingservice.AddABookingService);
router.post("/addReport", reportController.AddReport);
router.get("/searchRoom", roomController.searchRoom);

module.exports = router;
