const bookingController = require("../controller/bookingController");
const { Router } = require("express");
const { Booking } = require("../model/model");

const router = require("express").Router();

// add a booking
router.post("/", bookingController.AddABooking);
router.get("/", bookingController.GetAllBooking);
router.get("/:id", bookingController.getABooking);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);
module.exports = router;
