import "./App.css";
import HomePage from "./Components/Home/HomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import Sidebar from "./Components/SideBar/Sidebar";
import { useSelector } from "react-redux";
import Account from "../src/Components/AllPage/Account.jsx";
import RoomManagement from "./Components/AllPage/Rooms.jsx";
import BookingManagement from "./Components/AllPage/Booking.jsx";
import ServiceManagement from "./Components/AllPage/Service.jsx";
import BookingServiceManagement from "./Components/AllPage/Bookingservice.jsx";
import RevenueManagement from "./Components/AllPage/Revenue.jsx";
import ReportManagement from "./Components/AllPage/Report.jsx";

function App() {
  // Lấy thông tin người dùng từ Redux Store
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  return (
    <Router>
      {/* Chỉ hiển thị NavBar nếu người dùng đã đăng nhập */}
      {currentUser && <NavBar />}
      {/* Chỉ hiển thị Sidebar nếu người dùng đã đăng nhập */}
      {currentUser && <Sidebar />}
      <div className="App">
        <Routes>
          {/* Nếu không có currentUser, chuyển hướng đến trang đăng nhập */}
          <Route
            path="/"
            element={currentUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/hotel" element={<RoomManagement />} />
          <Route path="/booking" element={<BookingManagement />} />
          <Route path="/Service" element={<ServiceManagement />} />
          <Route path="/revenue" element={<RevenueManagement />} />
          <Route path="/report" element={<ReportManagement />} />

          <Route
            path="/bookingservice"
            element={<BookingServiceManagement />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
