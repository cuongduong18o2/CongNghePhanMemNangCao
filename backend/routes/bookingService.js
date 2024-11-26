const bookingServiceController = require("../controller/bookingServiceController");
const { Router } = require("express");
const { BookingService } = require("../model/model");

const router = require("express").Router();

// add a booking
router.post("/", bookingServiceController.AddABookingService);

router.get("/", bookingServiceController.GetAllBookingService);
router.put("/:id", bookingServiceController.updateBookingSV);
router.delete("/:id", bookingServiceController.deleteBookingSV);

module.exports = router;
