const { Report } = require("../model/model");

const ReportController = {
  AddReport: async (req, res) => {
    try {
      const newReport = new Report(req.body);
      const savedReport = await newReport.save();
      res.status(200).json(savedReport);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllReport: async (req, res) => {
    try {
      const getReport = await Report.find();
      res.status(200).json(getReport);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteReport: async (req, res) => {
    try {
      await Report.findByIdAndDelete(req.params.id);
      res.status(200).json("delete successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = ReportController;
