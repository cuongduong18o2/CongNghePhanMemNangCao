const serviceController = require("../controller/serviceController");
const express = require("express");
const router = express.Router();

router.post("/", serviceController.AddService);
router.get("/", serviceController.GetAllService);
router.put("/:id", serviceController.UpdateService);
router.delete("/:id", serviceController.DeleteService);

module.exports = router;
