const { model } = require("mongoose");
const bcrypt = require("bcrypt");
const { User, Booking, Room } = require("../model/model");

const userController = {
  //get all user
  getAllUser: async (req, res) => {
    try {
      const getUser = await User.find();
      return res.status(200).json(getUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // get an user

  getAnUser: async (req, res) => {
    try {
      const getAnUser = await User.findById(req.params.id).populate(
        "BookingHistory"
      );
      return res.status(200).json(getAnUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //update user
  updateUser: async (req, res) => {
    try {
      const updateuser = await User.findById(req.params.id);
      await updateuser.updateOne({ $set: req.body });
      return res.status(200).json("updated successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //delete user
  deleteUser: async (req, res) => {
    try {
      await User.updateMany(
        { BookingHistory: req.params.id },
        { $pull: { BookingHistory: req.params.id } }
      );
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("deteled successfully !");
    } catch (err) {
      console.error("Error during deletion:", err);
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
