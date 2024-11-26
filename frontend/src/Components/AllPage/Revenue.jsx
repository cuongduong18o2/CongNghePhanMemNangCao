import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllRevenues, EditRevenue } from "../../redux/apiRequest";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./revenue.css";
const RevenueManagement = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const revenueData = useSelector((state) => state.revenue.revenue);

  const [editRevenueId, setEditRevenueId] = useState(null);
  const [updatedRevenueData, setUpdatedRevenueData] = useState({
    date: "",
    totalRevenueFromBookings: 0,
    totalRevenueFromServices: 0,
    totalRevenue: 0,
  });

  let axiosJWT = axios.create();

  const fetchRevenues = () => {
    if (user?.AccessToken) {
      getAllRevenues(dispatch);
    }
  };

  const handleEditRevenue = (revenue) => {
    setEditRevenueId(revenue._id);
    setUpdatedRevenueData({
      date: revenue.date,
      totalRevenueFromBookings: revenue.TotalRevenueFromBookings,
      totalRevenueFromServices: revenue.TotalRevenueFromServices,
      totalRevenue: revenue.TotalRevenue,
    });
  };

  const handleUpdateRevenue = async () => {
    await EditRevenue(dispatch, { ...updatedRevenueData, _id: editRevenueId });
    setEditRevenueId(null);
    setUpdatedRevenueData({
      date: "",
      totalRevenueFromBookings: 0,
      totalRevenueFromServices: 0,
      totalRevenue: 0,
    });
    fetchRevenues(); // Refresh data after update
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodedToken = jwt_decode(user?.AccessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        if (data) {
          const refreshUser = {
            ...user,
            AccessToken: data.AccessToken,
          };
          dispatch(loginSuccess(refreshUser));
          config.headers["token"] = "bearer " + data.AccessToken;
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
    } else {
      fetchRevenues();
    }
  }, [user, dispatch, navigate]);

  return (
    <main className="revenue-management-container">
      <h1 className="revenue-management-title">Trang quản lý doanh thu</h1>
      <div className="revenue-management-role">
        {`Quyền của bạn là: ${user?.admin ? `Admin` : `User`}`}
      </div>

      <table className="revenue-management-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Tổng doanh thu</th>
            <th>Doanh thu từ đặt phòng</th>
            <th>Doanh thu từ dịch vụ</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {revenueData ? (
            <tr key={revenueData._id}>
              <td>{new Date(revenueData.Date).toLocaleDateString()}</td>
              <td>{revenueData.TotalRevenue}</td>
              <td>{revenueData.TotalRevenueFromBookings}</td>
              <td>{revenueData.TotalRevenueFromServices}</td>
              <td>
                <button onClick={handleUpdateRevenue}>Cập nhật</button>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="5">Không có dữ liệu doanh thu.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default RevenueManagement;
