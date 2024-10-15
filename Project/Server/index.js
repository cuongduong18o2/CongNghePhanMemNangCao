const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const userRoute = require("./Routes/User.js");
const bookingRoute = require("./Routes/booking.js");
const roomRoute = require("./Routes/room.js");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

//morgan là cái để hiện thị là có thực hiện được không ở trong terminal
app.use(morgan("common"));
dotenv.config();

app.use("/v1/user", userRoute);
app.use("/v1/booking", bookingRoute);
app.use("/v1/room", roomRoute);
//connect database

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error("Error connecting to mongoDB", err);
  }
}

connectDB();

app.listen(8000, () => {
  console.log("server is running...");
});
