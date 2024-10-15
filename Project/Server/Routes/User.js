const { Router } = require("express");
const userController = require("../controller/userController");

const router = require("express").Router();

//add user

router.post("/", userController.addUser);

//get all user
router.get("/", userController.getAllUser);

router.get("/:id", userController.getAnUser);

module.exports = router;
