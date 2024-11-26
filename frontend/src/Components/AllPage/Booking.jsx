import { useEffect, useState } from "react";
import "./booking.css";
import {
  getAllBookings,
  addBooking,
  DeleteBooking,
  EditBooking,
  fetchRoomById,
  fetchUserById,
} from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";

const BookingManagement = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookingList = useSelector(
    (state) => state.booking.booking?.allBooking || []
  );

  const [editBookingId, setEditBookingId] = useState(null);
  const [showAddBookingForm, setShowAddBookingForm] = useState(false);
  const [updatedBookingData, setUpdatedBookingData] = useState({
    IdUser: "",
    IdRoom: "",
    CheckIn: "",
    CheckOut: "",
    Status: "pending",
    MethodsPaymen: "",
    UserName: "",
    Phone: "",
  });

  const [newBookingData, setNewBookingData] = useState({
    IdUser: "",
    IdRoom: "",
    CheckIn: "",
    CheckOut: "",
    Status: "pending",
    MethodsPaymen: "",
    UserName: "",
    Phone: "",
  });

  const [error, setError] = useState(null); // Thêm state để hiển thị lỗi

  let axiosJWT = axios.create();

  const handleDelete = (id) => {
    DeleteBooking(user?.AccessToken, dispatch, id, axiosJWT);
  };

  const handleEdit = (booking) => {
    setEditBookingId(booking._id);
    setUpdatedBookingData({ ...booking });
  };

  const handleUpdate = () => {
    EditBooking(dispatch, editBookingId, updatedBookingData)
      .then(() => setEditBookingId(null))
      .catch((err) => setError(err.message)); // Xử lý lỗi
    setUpdatedBookingData({
      IdUser: "",
      IdRoom: "",
      CheckIn: "",
      CheckOut: "",
      Status: "pending",
      MethodsPaymen: "",
      UserName: "",
      Phone: "",
    });
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    addBooking(newBookingData, dispatch)
      .then(() => {
        setNewBookingData({
          IdUser: "",
          IdRoom: "",
          CheckIn: "",
          CheckOut: "",
          Status: "pending",
          MethodsPaymen: "",
          UserName: "",
          Phone: "",
        });
        setShowAddBookingForm(false);
      })
      .catch((err) => setError(err.message)); // Xử lý lỗi
  };

  const handleInputChange = (e, field) => {
    setNewBookingData({ ...newBookingData, [field]: e.target.value });
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return null; // Trả về null nếu có lỗi
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.AccessToken);
      if (decodedToken && decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        if (data) {
          const refreshUser = {
            ...user,
            AccessToken: data.AccessToken,
          };
          dispatch(loginSuccess(refreshUser));
          config.headers["token"] = "bearer " + data.AccessToken;
        } else {
          // Xử lý trường hợp refresh token thất bại (ví dụ: đăng xuất)
          navigate("/login");
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.AccessToken) {
      getAllBookings(dispatch, axiosJWT);
    }
  }, [user, navigate, dispatch, axiosJWT]);

  useEffect(() => {
    const updateBookings = async () => {
      const updatedBookings = await Promise.all(
        bookingList.map((booking) => fetchRoomAndUser(booking))
      );
      // Cập nhật bookingList với thông tin phòng và người dùng
      console.log(updatedBookings);
    };
    updateBookings();
  }, [bookingList]);

  const fetchRoomAndUser = async (booking) => {
    try {
      const [roomData, userData] = await Promise.all([
        fetchRoomById(dispatch, booking.IdRoom, axiosJWT),
        fetchUserById(dispatch, booking.IdUser, axiosJWT),
      ]);
      return {
        ...booking,
        RoomName: roomData?.RoomName || "Unknown Room",
        UserName: userData?.name || "Unknown User",
        Phone: userData?.phone || "Unknown Phone",
      };
    } catch (error) {
      console.error("Error fetching room and user data:", error);
      return booking;
    }
  };

  const handleStatusChange = (e, bookingId) => {
    const newStatus = e.target.value;
    const updatedBookingData = { Status: newStatus };
    EditBooking(dispatch, bookingId, updatedBookingData).catch((err) =>
      setError(err.message)
    ); // Xử lý lỗi
  };

  return (
    <main className="booking-management-container">
      <h1 className="booking-management-title">Trang quản lý Booking</h1>
      <div className="booking-management-role">
        {`Quyền của bạn là: ${user?.admin ? `Admin` : `User`}`}
      </div>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Hiển thị thông báo lỗi */}
      <button onClick={() => setShowAddBookingForm(!showAddBookingForm)}>
        Thêm Booking Mới
      </button>
      {showAddBookingForm && (
        <div className="add-booking-form">
          <h3>Thêm Booking Mới</h3>
          <form onSubmit={handleAddBooking}>
            <div>
              <label>CheckIn:</label>
              <input
                type="date"
                value={newBookingData.CheckIn}
                onChange={(e) => handleInputChange(e, "CheckIn")}
              />
            </div>
            <div>
              <label>CheckOut:</label>
              <input
                type="date"
                value={newBookingData.CheckOut}
                onChange={(e) => handleInputChange(e, "CheckOut")}
              />
            </div>
            <div>
              <label>Phương thức thanh toán:</label>
              <input
                type="text"
                value={newBookingData.MethodsPayment}
                onChange={(e) => handleInputChange(e, "MethodsPaymen")}
              />
            </div>
            <div>
              <button type="submit">Thêm</button>
              <button onClick={() => setShowAddBookingForm(false)}>Hủy</button>
            </div>
          </form>
        </div>
      )}
      <table className="booking-list">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
            <th>Phương thức thanh toán</th>
            <th>Tên người dùng</th>
            <th>Số điện thoại</th>
            <th>Tên phòng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookingList.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.CheckIn}</td>
              <td>{booking.CheckOut}</td>
              <td>
                <select
                  value={booking.Status}
                  onChange={(e) => handleStatusChange(e, booking._id)}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>{booking.MethodsPayment}</td>
              <td>{booking.UserName}</td>
              <td>{booking.Phone}</td>
              <td>{booking.nameRoom}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(booking._id)}
                >
                  Xóa
                </button>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(booking)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editBookingId && (
        <div className="edit-booking-form">
          <h3>Chỉnh sửa booking</h3>
          <form onSubmit={handleUpdate}>
            {/* Các trường input tương tự như form thêm mới */}
            {Object.keys(updatedBookingData).map((key) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type={
                    key === "CheckIn" || key === "CheckOut" ? "date" : "text"
                  }
                  value={updatedBookingData[key]}
                  onChange={(e) =>
                    setUpdatedBookingData({
                      ...updatedBookingData,
                      [key]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
            <div>
              <button type="submit">Cập nhật</button>
              <button onClick={() => setEditBookingId(null)}>Hủy</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default BookingManagement;
