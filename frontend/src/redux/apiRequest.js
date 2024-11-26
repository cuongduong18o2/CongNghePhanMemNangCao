import axios from "axios";

import {
  getReportsStart,
  getReportsSuccess,
  getReportsFailed,
  addReportsStart,
  addReportsSuccess,
  addReportsFailed,
  deleteReportsStart,
  deleteReportsSuccess,
  deleteReportsFailed,
} from "./reportSlice";

import {
  getServiceStart,
  getServiceFailed,
  getServiceSuccess,
  EditServiceStart,
  EditServiceFailed,
  EditServiceSuccess,
  deleteServiceStart,
  deleteServiceSuccess,
  deleteServiceFailed,
  addServiceStart,
  addServiceFailed,
  addServiceSuccess,
} from "./service";

import {
  getRevenuesStart,
  getRevenuesSuccess,
  getRevenuesFailed,
  editRevenuesStart,
  editRevenuesSuccess,
  editRevenuesFailed,
} from "./revenueSlice";

import {
  getBookingServiceStart,
  getBookingServiceSuccess,
  getBookingServiceFailed,
  addBookingServiceStart,
  addBookingServiceSuccess,
  addBookingServiceFailed,
  EditBookingServiceStart,
  EditBookingServiceSuccess,
  EditBookingServiceFailed,
  deleteBookingServiceStart,
  deleteBookingServiceSuccess,
  deleteBookingServiceFailed,
} from "./bookingservice";

import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  EditUserFailed,
  EditUserStart,
  EditUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";
import {
  getRoomStart,
  getRoomsSuccess,
  getRoomsFailed,
  EditRoomsStart,
  EditRoomsFailed,
  EditRoomsSuccess,
  deleteRoomsStart,
  deleteRoomsSuccess,
  deleteRoomsFailed,
  addRoomStart,
  addRoomSuccess,
  addRoomFailed,
} from "./roomSlice";
import {
  getBookingStart,
  getBookingSuccess,
  getBookingFailed,
  EditBookingStart,
  EditBookingFailed,
  EditBookingSuccess,
  deleteBookingStart,
  deleteBookingSuccess,
  deleteBookingFailed,
  addBookingStart,
  addBookingSuccess,
  addBookingFailed,
} from "./bookingSlice";
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user);

    // Kiểm tra quyền admin
    if (res.data.admin) {
      dispatch(loginSuccess(res.data));
      navigate("/"); // Chuyển hướng tới trang chủ nếu là admin
    } else {
      // Hiển thị thông báo không có quyền truy cập
      dispatch(loginFailed());
    }
  } catch (err) {
    dispatch(loginFailed(err.response.data));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8000/v1/auth/register", user);
    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerFailed(err.response.data));
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/user", {
      headers: { token: `bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed(err.response.data));
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("http://localhost:8000/v1/user/" + id, {
      headers: { token: `bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};

//edit user
// edit user
export const EditUser = async (accessToken, dispatch, id, updatedUserData) => {
  dispatch(EditUserStart());
  try {
    const res = await axios.put(
      `http://localhost:8000/v1/user/${id}`,
      updatedUserData,
      {
        headers: { token: `bearer ${accessToken}` },
      }
    );
    dispatch(EditUserSuccess(res.data)); // Gửi dữ liệu đã cập nhật về state
  } catch (err) {
    dispatch(EditUserFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

export const logOut = async (dispatch, id, navigate, accessToken) => {
  dispatch(logOutStart());
  try {
    await axios.post("http://localhost:8000/v1/auth/logout", id, {
      headers: { token: `bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

// funcion get data api of service

export const addService = async (serviceData, dispatch) => {
  dispatch(addServiceStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/v1/service",
      serviceData
    );
    dispatch(addServiceSuccess(res.data));
  } catch (err) {
    dispatch(addServiceFailed(err.response.data));
  }
};

export const getAllServices = async (dispatch, axiosJWT) => {
  dispatch(getServiceStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/service");
    dispatch(getServiceSuccess(res.data));
  } catch (err) {
    dispatch(getServiceFailed(err.response.data));
  }
};

export const DeleteServices = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteServiceStart());
  try {
    const res = await axiosJWT.delete(
      `http://localhost:8000/v1/service/${id}`,
      {
        headers: { token: `bearer ${accessToken}` },
      }
    );
    dispatch(deleteServiceSuccess(res.data));
  } catch (err) {
    dispatch(deleteServiceFailed(err.response.data));
  }
};

export const EditServices = async (dispatch, id, updatedRoomData) => {
  dispatch(EditServiceStart());
  try {
    const res = await axios.put(
      `http://localhost:8000/v1/service/${id}`,
      updatedRoomData // Truyền dữ liệu phòng đã cập nhật vào đây
    );
    dispatch(EditServiceSuccess(res.data)); // Gửi dữ liệu đã cập nhật về state
  } catch (err) {
    dispatch(EditServiceFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

export const getAllRevenues = async (dispatch) => {
  dispatch(getRevenuesStart());
  try {
    const res = await axios.get("http://localhost:8000/v1/revenue/daily");
    const data = Array.isArray(res.data) ? res.data[0] : res.data; // Ensure response is handled properly
    dispatch(getRevenuesSuccess(data));
    console.log("Fetched Revenues:", data);
  } catch (err) {
    const errorMessage =
      err.response?.data || "Có lỗi xảy ra khi lấy dữ liệu doanh thu!";
    dispatch(getRevenuesFailed(errorMessage));
    console.error("Error fetching revenues:", errorMessage);
  }
};

// Hàm chỉnh sửa doanh thu
export const EditRevenue = async (dispatch, updatedRevenueData) => {
  dispatch(editRevenuesStart());
  try {
    const res = await axios.post(
      `http://localhost:8000/v1/revenue/update`, // POST endpoint
      updatedRevenueData // Truyền dữ liệu cập nhật
    );
    // Giả sử API trả về đối tượng doanh thu sau khi cập nhật
    dispatch(editRevenuesSuccess(res.data)); // Gửi dữ liệu đã cập nhật về state
  } catch (err) {
    const errorMessage = err.response?.data || "Có lỗi xảy ra!";
    dispatch(editRevenuesFailed(errorMessage)); // Gửi thông báo lỗi
  }
};

// hàm lấy dữ liệu api của room

export const addRoom = async (roomData, dispatch) => {
  dispatch(getRoomStart()); // Bạn có thể thay đổi hành động này thành một hành động phù hợp hơn nếu cần
  try {
    const res = await axios.post("http://localhost:8000/v1/room", roomData);
    dispatch(addRoomSuccess(res.data)); // Cập nhật danh sách phòng với dữ liệu mới
  } catch (err) {
    dispatch(addRoomFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

export const getAllRooms = async (dispatch, axiosJWT) => {
  dispatch(getRoomStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/room");
    dispatch(getRoomsSuccess(res.data));
  } catch (err) {
    dispatch(getRoomsFailed(err.response.data));
  }
};

export const DeleteRoom = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteRoomsStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/v1/room/${id}`, {
      headers: { token: `bearer ${accessToken}` },
    });
    dispatch(deleteRoomsSuccess(res.data));
  } catch (err) {
    dispatch(deleteRoomsFailed(err.response.data));
  }
};
//edit user
// edit user
export const EditRoom = async (dispatch, id, updatedRoomData) => {
  dispatch(EditRoomsStart());
  try {
    const res = await axios.put(
      `http://localhost:8000/v1/room/${id}`,
      updatedRoomData // Truyền dữ liệu phòng đã cập nhật vào đây
    );
    dispatch(EditRoomsSuccess(res.data)); // Gửi dữ liệu đã cập nhật về state
  } catch (err) {
    dispatch(EditRoomsFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

//booking
export const getAllBookings = async (dispatch, axiosJWT) => {
  dispatch(getBookingStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/booking");
    dispatch(getBookingSuccess(res.data));
  } catch (err) {
    dispatch(getBookingFailed(err.response.data));
  }
};

export const addBooking = async (bookingData, dispatch) => {
  dispatch(addBookingStart()); // Bạn có thể thay đổi hành động này thành một hành động phù hợp hơn nếu cần
  try {
    const res = await axios.post(
      "http://localhost:8000/v1/booking",
      bookingData
    );
    dispatch(addBookingSuccess(res.data)); // Cập nhật danh sách phòng với dữ liệu mới
  } catch (err) {
    dispatch(addBookingFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

export const DeleteBooking = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteBookingStart());
  try {
    const res = await axiosJWT.delete(
      `http://localhost:8000/v1/booking/${id}`,
      {
        headers: { token: `bearer ${accessToken}` },
      }
    );
    dispatch(deleteBookingSuccess(res.data));
  } catch (err) {
    dispatch(deleteBookingFailed(err.response.data));
  }
};
//edit user
// edit user
export const EditBooking = async (dispatch, id, updatedBookingData) => {
  dispatch(EditBookingStart());
  try {
    const res = await axios.put(
      `http://localhost:8000/v1/booking/${id}`,
      updatedBookingData // Truyền dữ liệu phòng đã cập nhật vào đây
    );
    dispatch(EditBookingSuccess(res.data)); // Gửi dữ liệu đã cập nhật về state
  } catch (err) {
    dispatch(EditBookingFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

export const getAllBookingService = async (dispatch, axiosJWT) => {
  dispatch(getBookingServiceStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/bookingservice");
    dispatch(getBookingServiceSuccess(res.data));
  } catch (err) {
    // Kiểm tra xem err.response có tồn tại trước khi truy cập err.response.data
    const errorData = err.response
      ? err.response.data
      : { message: "Đã có lỗi xảy ra" };
    dispatch(getBookingServiceFailed(errorData));
  }
};

export const addBookingService = async (bookingServiceData, dispatch) => {
  dispatch(addBookingServiceStart()); // Bạn có thể thay đổi hành động này thành một hành động phù hợp hơn nếu cần
  try {
    const res = await axios.post(
      "http://localhost:8000/v1/bookingservice",
      bookingServiceData
    );
    dispatch(addBookingServiceSuccess(res.data)); // Cập nhật danh sách phòng với dữ liệu mới
  } catch (err) {
    dispatch(addBookingServiceFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

export const DeleteBookingService = async (
  accessToken,
  dispatch,
  id,
  axiosJWT
) => {
  dispatch(deleteBookingServiceStart());
  try {
    const res = await axiosJWT.delete(
      `http://localhost:8000/v1/bookingservice/${id}`,
      {
        headers: { token: `bearer ${accessToken}` },
      }
    );
    dispatch(deleteBookingServiceSuccess(res.data));
  } catch (err) {
    dispatch(deleteBookingServiceFailed(err.response.data));
  }
};
//edit user
// edit user
export const EditBookingService = async (
  dispatch,
  id,
  updatedBookingServiceData
) => {
  dispatch(EditBookingServiceStart());
  try {
    const res = await axios.put(
      `http://localhost:8000/v1/bookingservice/${id}`,
      updatedBookingServiceData // Truyền dữ liệu phòng đã cập nhật vào đây
    );
    dispatch(EditBookingServiceSuccess(res.data)); // Gửi dữ liệu đã cập nhật về state
  } catch (err) {
    dispatch(EditBookingServiceFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

export const fetchRoomById = async (dispatch, roomId, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`http://localhost:8000/v1/room/${roomId}`);
    // Nếu cần dispatch dữ liệu vào Redux
    dispatch({ type: "FETCH_ROOM_SUCCESS", payload: res.data });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy thông tin phòng:", err);
    dispatch({ type: "FETCH_ROOM_ERROR", payload: err.message });
    return null;
  }
};

export const fetchUserById = async (dispatch, userId, axiosJWT) => {
  try {
    const res = await axiosJWT.get(`http://localhost:8000/v1/user/${userId}`);
    // Nếu cần dispatch dữ liệu vào Redux
    dispatch({ type: "FETCH_USER_SUCCESS", payload: res.data });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy thông tin người dùng:", err);
    dispatch({ type: "FETCH_USER_ERROR", payload: err.message });
    return null;
  }
};

//

export const addReport = async (reportData, dispatch) => {
  dispatch(addReportsStart()); // Bạn có thể thay đổi hành động này thành một hành động phù hợp hơn nếu cần
  try {
    const res = await axios.post("http://localhost:8000/v1/report", reportData);
    dispatch(addReportsSuccess(res.data)); // Cập nhật danh sách phòng với dữ liệu mới
  } catch (err) {
    dispatch(addReportsFailed(err.response.data)); // Gửi thông báo lỗi
  }
};

export const getAllReport = async (dispatch, axiosJWT) => {
  dispatch(getReportsStart());
  try {
    const res = await axiosJWT.get("http://localhost:8000/v1/report");
    dispatch(getReportsSuccess(res.data));
  } catch (err) {
    dispatch(getReportsFailed(err.response.data));
  }
};

export const DeleteReport = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteReportsStart());
  try {
    const res = await axiosJWT.delete(`http://localhost:8000/v1/report/${id}`, {
      headers: { token: `bearer ${accessToken}` },
    });
    dispatch(deleteReportsSuccess(res.data));
  } catch (err) {
    dispatch(deleteReportsFailed(err.response.data));
  }
};
