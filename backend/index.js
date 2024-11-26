const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const { updateDailyRevenue } = require("./controller/revenueController.js");
const userRoute = require("./routes/user.js");
const bookingRoute = require("./Routes/booking.js");
const roomRoute = require("./Routes/room.js");
const AuthenRoute = require("./routes/auth.js");
const apiAndroid = require("./routes/api_Android.js");
const ServiceRoute = require("./routes/service.js");
const bookingServiceRoute = require("./routes/bookingService.js");
const revenue = require("./routes/revenue.js");
const Report = require("./routes/report.js");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());

app.use(express.json());

//morgan là cái để hiện thị là có thực hiện được không ở trong terminal
app.use(morgan("common"));
dotenv.config();
app.use("/v1/report", Report);
app.use("/v1/revenue", revenue);
app.use("/v1/bookingservice", bookingServiceRoute);
app.use("/v1/service", ServiceRoute);
app.use("/api", apiAndroid);
app.use("/v1/auth", AuthenRoute);
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
cron.schedule("0 0 * * *", () => {
  console.log("Cập nhật doanh thu hàng ngày...");
  updateDailyRevenue();
});

connectDB();

app.listen(8000, () => {
  console.log("server is running...");
});

//tao authentication dang nhap dang ky

//tao authorization la phan quyen
