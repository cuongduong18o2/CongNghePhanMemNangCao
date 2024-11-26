const { Router } = require("express");
const authController = require("../controller/authController");
const middlewareController = require("../controller/middlewareController");

const router = require("express").Router();

//add user

router.post("/register", authController.addUser);

//login
router.post("/login", authController.loginUser);

//refresh token
router.post("/refresh", authController.requestRefreshToken);

//logout
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);

module.exports = router;
