import { useEffect, useState } from "react";
import "./bookingservice.css";
import {
  getAllBookingService,
  addBookingService,
  DeleteBookingService,
  EditBookingService,
} from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";

const BookingServiceManagement = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookingServiceList = useSelector(
    (state) => state.bookingService?.bookingService?.allBookingService || []
  );

  const [editBookingServiceId, setEditBookingServiceId] = useState(null);
  const [showAddBookingServiceForm, setShowAddBookingServiceForm] =
    useState(false);
  const [updatedBookingServiceData, setUpdatedBookingServiceData] = useState({
    IdUser: "",
    IdService: "",
    TenPhong: "",
    TotalPriceService: "",
    Quantity: 0,
    StatusService: "pending",
  });

  const [newBookingServiceData, setNewBookingServiceData] = useState({
    IdUser: user?.id || "",
    IdService: "",
    TenPhong: "",
    TotalPriceService: "",
    Quantity: 0,
    StatusService: "pending",
  });

  let axiosJWT = axios.create();

  // Handle Delete
  const handleDelete = (id) => {
    DeleteBookingService(user?.AccessToken, dispatch, id, axiosJWT);
    // Refresh after delete
    getAllBookingService(dispatch, axiosJWT);
  };

  // Handle Edit
  const handleEdit = (bookingService) => {
    setEditBookingServiceId(bookingService._id);
    setUpdatedBookingServiceData({ ...bookingService });
  };

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định
    try {
      await EditBookingService(
        dispatch,
        editBookingServiceId,
        updatedBookingServiceData
      );
      setEditBookingServiceId(null);
      setUpdatedBookingServiceData({
        IdUser: "",
        IdService: "",
        TenPhong: "",
        TotalPriceService: "",
        Quantity: 0,
        StatusService: "pending",
      });
      // Refresh booking services after update
      getAllBookingService(dispatch, axiosJWT);
    } catch (error) {
      console.error("Error updating booking service:", error);
    }
  };

  // Handle Add BookingService
  const handleAddBookingService = async (e) => {
    e.preventDefault();
    // Validate input data
    if (
      !newBookingServiceData.IdService ||
      !newBookingServiceData.TotalPriceService
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    await addBookingService(newBookingServiceData, dispatch);
    setNewBookingServiceData({
      UsernameService: "",
      nameService: "",
      TenPhong: "",
      TotalPriceService: "",
      Quantity: 0,
      StatusService: "pending",
    });
    setShowAddBookingServiceForm(false);
    // Refresh booking services after adding
    getAllBookingService(dispatch, axiosJWT);
  };

  // Handle Input Change
  const handleInputChange = (e, field) => {
    setNewBookingServiceData({
      ...newBookingServiceData,
      [field]: e.target.value,
    });
  };

  // Refresh Token
  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  // Axios JWT interceptor to refresh token
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
      getAllBookingService(dispatch, axiosJWT);
    }
  }, [user, navigate, dispatch, axiosJWT]);

  return (
    <main className="bookingservice-management-container">
      <h1>Quản lý đặt dịch vụ</h1>
      <button onClick={() => setShowAddBookingServiceForm(true)}>
        Thêm đặt dịch vụ
      </button>

      {showAddBookingServiceForm && (
        <div className="add-bookingservice-form">
          <h2>Thêm đặt dịch vụ mới</h2>
          <form onSubmit={handleAddBookingService}>
            <div>
              <label>Tên người dùng:</label>
              <input
                type="text"
                value={newBookingServiceData.UsernameService}
                onChange={(e) => handleInputChange(e, "nameService")}
                disabled
              />
            </div>
            <div>
              <label>Tên dịch vụ</label>
              <input
                type="text"
                value={newBookingServiceData.IdService}
                onChange={(e) => handleInputChange(e, "nameService")}
              />
            </div>

            <div>
              <label>Tên phòng</label>
              <input
                type="text"
                value={newBookingServiceData.TenPhong}
                onChange={(e) => handleInputChange(e, "nameService")}
              />
            </div>
            <div>
              <label>Tổng giá:</label>
              <input
                type="number"
                value={newBookingServiceData.TotalPriceService}
                onChange={(e) => handleInputChange(e, "TotalPriceService")}
              />
            </div>
            <div>
              <label>Số lượng:</label>
              <input
                type="number"
                value={newBookingServiceData.Quantity}
                onChange={(e) => handleInputChange(e, "Quantity")}
              />
            </div>
            <div>
              <label>StatusService:</label>
              <select
                value={newBookingServiceData.StatusService}
                onChange={(e) => handleInputChange(e, "StatusService")}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <button type="submit">Thêm</button>
              <button onClick={() => setShowAddBookingServiceForm(false)}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Người dùng</th>
            <th>Dịch vụ</th>
            <th>Tên phòng</th>
            <th>Tổng tiền</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bookingServiceList.length === 0 ? (
            <tr>
              <td colSpan="7">Không có dữ liệu</td>
            </tr>
          ) : (
            bookingServiceList.map((bookingService) => (
              <tr key={bookingService._id}>
                <td>{bookingService._id}</td>
                <td>{bookingService.UsernameService}</td>
                <td>{bookingService.nameService}</td>
                <td>{bookingService.TenPhong}</td>
                <td>{bookingService.TotalPriceService}</td>
                <td>{bookingService.Quantity}</td>
                <td>{bookingService.StatusService}</td>
                <td>
                  <button onClick={() => handleEdit(bookingService)}>
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(bookingService._id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editBookingServiceId && (
        <div className="edit-bookingservice-form">
          <h2>Chỉnh sửa đặt dịch vụ</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Tên Phòng:</label>
              <input
                type="text"
                value={updatedBookingServiceData.IdService}
                onChange={(e) =>
                  setUpdatedBookingServiceData({
                    ...updatedBookingServiceData,
                    IdService: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Quantity:</label>
              <input
                type="number"
                value={updatedBookingServiceData.Quantity}
                onChange={(e) =>
                  setUpdatedBookingServiceData({
                    ...updatedBookingServiceData,
                    Quantity: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>StatusService:</label>
              <select
                value={updatedBookingServiceData.StatusService}
                onChange={(e) =>
                  setUpdatedBookingServiceData({
                    ...updatedBookingServiceData,
                    StatusService: e.target.value,
                  })
                }
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <button type="submit">Cập nhật</button>
              <button
                type="button"
                onClick={() => setEditBookingServiceId(null)}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default BookingServiceManagement;
