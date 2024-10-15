const roomController = require("../controller/roomController");
const { Router } = require("express");
const { Room } = require("../model/model");
const router = require("express").Router();

router.post("/", roomController.AddRoom);
router.get("/", roomController.getAllRoom);
router.get("/:id", roomController.getAnRoom);

module.exports = router;
