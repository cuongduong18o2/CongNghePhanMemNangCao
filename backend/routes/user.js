const { Router } = require("express");
const userController = require("../controller/userController");
const middlewareController = require("../controller/middlewareController");

const router = require("express").Router();

//get all user
router.get("/", middlewareController.verifyToken, userController.getAllUser);

router.get("/:id", userController.getAnUser);

router.put("/:id", userController.updateUser);

router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;
