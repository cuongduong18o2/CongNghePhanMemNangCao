const ReportController = require("../controller/reportController");
const { Router } = require("express");
const { Room } = require("../model/model");
const router = require("express").Router();

router.post("/", ReportController.AddReport);
router.get("/", ReportController.getAllReport);
router.delete("/:id", ReportController.deleteReport);

module.exports = router;
