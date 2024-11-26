const { Service } = require("../model/model");
const { model } = require("mongoose");

const serviceController = {
  AddService: async (req, res) => {
    try {
      const newService = new Service(req.body);
      const savedService = await newService.save();
      res.status(200).json(savedService);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  GetAllService: async (req, res) => {
    try {
      const getAllService = await Service.find();
      res.status(200).json(getAllService);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  UpdateService: async (req, res) => {
    try {
      const updateService = await Service.findById(req.params.id);
      await updateService.updateOne({ $set: req.body });
      res.status(200).json("updated successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  DeleteService: async (req, res) => {
    try {
      await Service.findByIdAndDelete(req.params.id);
      res.status(200).json("delete successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = serviceController;
