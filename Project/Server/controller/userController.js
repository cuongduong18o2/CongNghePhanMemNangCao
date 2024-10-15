const { model } = require("mongoose");

const { User, Booking, Room } = require("../model/model");

const userController = {
  addUser: async (req, res) => {
    try {
      //khi khoi tao thi chi khoi tao nhung field trong model thoi
      const newUser = new User(req.body);
      //save vao db
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get all user
  getAllUser: async (req, res) => {
    try {
      const getUser = await User.find();
      res.status(200).json(getUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get an user

  getAnUser: async (req, res) => {
    try {
      const getAnUser = await User.findById(req.params.id).populate(
        "BookingHistory"
      );
      res.status(200).json(getAnUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
