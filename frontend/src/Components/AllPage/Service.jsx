import { useEffect, useState } from "react";
import "./service.css";
import {
  getAllServices,
  addService,
  DeleteServices,
  EditServices,
} from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";

const ServiceManagement = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serviceList = useSelector(
    (state) => state.services.services?.allService || []
  );

  const [editServiceId, setEditServiceId] = useState(null);
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [updatedServiceData, setUpdatedServiceData] = useState({
    nameService: "",
    Price: "",
    Quantity: 0,
    ImageService: "",
  });

  const [newServiceData, setNewServiceData] = useState({
    nameService: "",
    Price: "",
    Quantity: 0,
    ImageService: "",
  });

  const [imageFile, setImageFile] = useState(null);

  let axiosJWT = axios.create();

  const handleDelete = (id) => {
    DeleteServices(user?.AccessToken, dispatch, id, axiosJWT);
  };

  const handleEdit = (service) => {
    setEditServiceId(service._id);
    setUpdatedServiceData({
      nameService: service.nameService,
      Price: service.Price,
      Quantity: service.Quantity,
      ImageService: service.ImageService,
    });
  };

  const handleUpdate = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedServiceData.ImageService = reader.result;
        EditServices(dispatch, editServiceId, updatedServiceData);
      };
      reader.readAsDataURL(imageFile);
    } else {
      EditServices(dispatch, editServiceId, updatedServiceData);
    }

    setEditServiceId(null);
    setUpdatedServiceData({
      nameService: "",
      Price: "",
      Quantity: 0,
      ImageService: "",
    });
    setImageFile(null);
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const newService = { ...newServiceData };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newService.ImageService = reader.result;
        addService(newService, dispatch);
      };
      reader.readAsDataURL(imageFile);
    } else {
      addService(newService, dispatch);
    }

    setNewServiceData({
      nameService: "",
      Price: "",
      Quantity: 0,
      ImageService: "",
    });
    setShowAddServiceForm(false);
    setImageFile(null);
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
      getAllServices(dispatch, axiosJWT);
    }
  }, [user, navigate, dispatch, axiosJWT]);

  return (
    <main className="service-management-container">
      <h1 className="service-management-title">Trang quản lý dịch vụ</h1>
      <div className="service-management-role">
        {`Quyền của bạn là: ${user?.admin ? `Admin` : `User`}`}
      </div>

      <button
        className="add-service-btn"
        onClick={() => setShowAddServiceForm(true)}
      >
        Thêm dịch vụ
      </button>

      {showAddServiceForm && (
        <div className="add-form">
          <h2>Thêm dịch vụ mới</h2>
          <input
            type="text"
            placeholder="Tên dịch vụ"
            value={newServiceData.nameService}
            onChange={(e) =>
              setNewServiceData({
                ...newServiceData,
                nameService: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Giá dịch vụ"
            value={newServiceData.Price}
            onChange={(e) =>
              setNewServiceData({ ...newServiceData, Price: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Số lượng"
            value={newServiceData.Quantity}
            onChange={(e) =>
              setNewServiceData({
                ...newServiceData,
                Quantity: parseInt(e.target.value),
              })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <div className="button-container">
            <button className="add-button" onClick={handleAddService}>
              Thêm
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowAddServiceForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {editServiceId && (
        <div className="edit-form">
          <h2>Chỉnh sửa thông tin dịch vụ</h2>
          <input
            type="text"
            placeholder="Tên dịch vụ"
            value={updatedServiceData.nameService}
            onChange={(e) =>
              setUpdatedServiceData({
                ...updatedServiceData,
                nameService: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Giá dịch vụ"
            value={updatedServiceData.Price}
            onChange={(e) =>
              setUpdatedServiceData({
                ...updatedServiceData,
                Price: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Số lượng"
            value={updatedServiceData.Quantity}
            onChange={(e) =>
              setUpdatedServiceData({
                ...updatedServiceData,
                Quantity: parseInt(e.target.value),
              })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <div className="button-container">
            <button className="update-button" onClick={handleUpdate}>
              Cập nhật
            </button>
            <button
              className="cancel-button"
              onClick={() => setEditServiceId(null)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <table className="service-management-table">
        <thead>
          <tr>
            <th>Tên dịch vụ</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hình ảnh</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(serviceList) && serviceList.length > 0 ? (
            serviceList.map((service) => (
              <tr key={service._id}>
                <td className="service-name">{service.nameService}</td>
                <td className="service-price">{service.Price}</td>
                <td className="service-quantity">{service.Quantity}</td>
                <td className="service-image">
                  <img
                    src={service.ImageService}
                    alt={service.nameService}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>

                <td className="service-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(service)}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(service._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có dịch vụ nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default ServiceManagement;
