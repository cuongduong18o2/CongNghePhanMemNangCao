import { useEffect, useState } from "react";
import "./report.css";
import { getAllReport, addReport, DeleteReport } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";

const ReportManagement = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reportList = useSelector(
    (state) => state.reports.reports?.allReport || []
  );

  const [showAddReportForm, setShowAddReportForm] = useState(false);
  const [newReportData, setNewReportData] = useState({
    Title: "",
    Content: "",
    Status: "pending", // Các trạng thái như pending, reviewed...
  });

  let axiosJWT = axios.create();

  const handleDelete = (id) => {
    DeleteReport(user?.AccessToken, dispatch, id, axiosJWT);
  };

  const handleAddReport = (e) => {
    e.preventDefault();
    addReport(newReportData, dispatch);
    setNewReportData({
      Title: "",
      Content: "",
      Status: "pending",
    });
    setShowAddReportForm(false);
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.AccessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          AccessToken: data.AccessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = "bearer " + data.AccessToken;
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
      getAllReport(dispatch, axiosJWT);
    }
  }, [user, navigate, dispatch, axiosJWT]);

  return (
    <main className="report-management-container">
      <h1 className="report-management-title">Trang quản lý báo cáo</h1>
      <div className="report-management-role">
        {`Quyền của bạn là: ${user?.admin ? `Admin` : `User`}`}
      </div>

      <button
        className="add-report-btn"
        onClick={() => setShowAddReportForm(true)}
      >
        Thêm báo cáo
      </button>

      {showAddReportForm && (
        <div className="add-form">
          <h2>Thêm báo cáo mới</h2>
          <input
            type="text"
            placeholder="Tiêu đề"
            value={newReportData.Title}
            onChange={(e) =>
              setNewReportData({ ...newReportData, Title: e.target.value })
            }
          />
          <textarea
            placeholder="Nội dung"
            value={newReportData.Content}
            onChange={(e) =>
              setNewReportData({ ...newReportData, Content: e.target.value })
            }
          />
          <textarea
            placeholder="Thời gian"
            value={newReportData.Time}
            onChange={(e) =>
              setNewReportData({ ...newReportData, Content: e.target.value })
            }
          />
          <select
            value={newReportData.Status}
            onChange={(e) =>
              setNewReportData({ ...newReportData, Status: e.target.value })
            }
          >
            <option value="chưa xử lý">Chưa xử lý</option>
            <option value="đã xử lý">Đã xử lý</option>
          </select>
          <div className="button-container">
            <button className="add-button" onClick={handleAddReport}>
              Thêm
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowAddReportForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <table className="report-management-table">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Trạng thái</th>
            <th>Thời gian</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(reportList) && reportList.length > 0 ? (
            reportList.map((report) => (
              <tr key={report._id}>
                <td className="report-title">{report.nameUserReport}</td>
                <td className="report-content">{report.Content}</td>
                <td className="report-status">{report.StatusReport}</td>
                <td className="report-time">{report.Time}</td>
                <td className="report-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(report._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không có báo cáo nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default ReportManagement;
