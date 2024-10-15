const { Room } = require("../model/model");
const { model } = require("mongoose");

const roomController = {
  AddRoom: async (req, res) => {
    try {
      const newRoom = new Room(req.body);
      const savedRoom = await newRoom.save();
      res.status(200).json(savedRoom);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllRoom: async (req, res) => {
    try {
      const getRoom = await Room.find();
      res.status(200).json(getRoom);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAnRoom: async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = roomController;
