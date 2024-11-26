const { Room } = require("../model/model");
const { model } = require("mongoose");

const roomController = {
  searchRoom: async (req, res) => {
    const search = req.query.search || "";
    try {
      const rooms = await Room.find({
        RoomName: { $regex: search, $options: "i" },
      });
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: "Có lỗi xảy ra khi tìm kiếm rooms" });
    }
  },

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

  //update room

  updateRoom: async (req, res) => {
    try {
      const updateroom = await Room.findById(req.params.id);
      await updateroom.updateOne({ $set: req.body });
      res.status(200).json("updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteRoom: async (req, res) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.status(200).json("delete successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = roomController;
