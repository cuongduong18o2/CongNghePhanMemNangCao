import { useEffect, useState } from "react";
import "./account.css";
import { getAllUsers, addUser } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, EditUser } from "../../redux/apiRequest";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";
import { registerUser } from "../../redux/apiRequest";

const Account = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.users.users?.allUsers);

  const [editUserId, setEditUserId] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false); // Thêm state để điều khiển hiển thị form
  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    phone: "",
    email: "",
    admin: false,
  });

  const [newUserData, setNewUserData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "", // Thêm trường mật khẩu
    admin: false,
  });

  let axiosJWT = axios.create();

  const handleDelete = (id) => {
    deleteUser(user?.AccessToken, dispatch, id, axiosJWT);
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setUpdatedUserData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      admin: user.admin,
    });
  };

  const handleUpdate = () => {
    EditUser(user?.AccessToken, dispatch, editUserId, updatedUserData);
    setEditUserId(null);
    setUpdatedUserData({ name: "", phone: "", email: "", admin: false });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      name: newUserData.name,
      phone: newUserData.phone,
      email: newUserData.email,
      password: newUserData.password,
      admin: newUserData.admin,
    };

    registerUser(newUser, dispatch, navigate);
    setNewUserData({
      name: "",
      phone: "",
      email: "",
      password: "",
      admin: false,
    });
    setShowAddUserForm(false); // Đặt lại để ẩn form sau khi thêm tài khoản
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
      getAllUsers(user?.AccessToken, dispatch, axiosJWT);
    }
  }, [user, navigate, dispatch, axiosJWT]);

  return (
    <main className="home-container">
      <h1 className="home-title">Trang quản lý thông tin khách hàng</h1>
      <div className="home-role">
        {`Quyền của bạn là: ${user?.admin ? `Admin` : `User`}`}
      </div>

      <button className="add-user-btn" onClick={() => setShowAddUserForm(true)}>
        Thêm tài khoản
      </button>

      {showAddUserForm && ( // Hiển thị form khi showAddUserForm là true
        <div className="add-form">
          <h2>Thêm tài khoản mới</h2>
          <input
            type="text"
            placeholder="Tên"
            value={newUserData.name}
            onChange={(e) =>
              setNewUserData({ ...newUserData, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={newUserData.phone}
            onChange={(e) =>
              setNewUserData({ ...newUserData, phone: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={newUserData.email}
            onChange={(e) =>
              setNewUserData({ ...newUserData, email: e.target.value })
            }
          />
          <input
            type="password" // Input cho mật khẩu
            placeholder="Mật khẩu"
            value={newUserData.password}
            onChange={(e) =>
              setNewUserData({ ...newUserData, password: e.target.value })
            }
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={newUserData.admin}
              onChange={(e) =>
                setNewUserData({
                  ...newUserData,
                  admin: e.target.checked,
                })
              }
            />
            Admin
          </label>
          <div className="button-container">
            <button className="add-button" onClick={handleAddUser}>
              Thêm
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowAddUserForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {editUserId && (
        <div className="edit-form">
          <h2>Chỉnh sửa thông tin người dùng</h2>
          <input
            type="text"
            placeholder="Tên"
            value={updatedUserData.name}
            onChange={(e) =>
              setUpdatedUserData({ ...updatedUserData, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={updatedUserData.phone}
            onChange={(e) =>
              setUpdatedUserData({ ...updatedUserData, phone: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={updatedUserData.email}
            onChange={(e) =>
              setUpdatedUserData({ ...updatedUserData, email: e.target.value })
            }
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={updatedUserData.admin}
              onChange={(e) =>
                setUpdatedUserData({
                  ...updatedUserData,
                  admin: e.target.checked,
                })
              }
            />
            Admin
          </label>
          <div className="button-container">
            <button className="update-button" onClick={handleUpdate}>
              Cập nhật
            </button>
            <button
              className="cancel-button"
              onClick={() => setEditUserId(null)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <table className="user-management-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Quyền</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user) => (
            <tr key={user._id}>
              <td className="user-name">{user.name}</td>
              <td className="user-phone">{user.phone}</td>
              <td className="user-email">{user.email}</td>
              <td className="user-role">{user.admin ? "Admin" : "User"}</td>
              <td className="user-actions">
                <button className="edit-btn" onClick={() => handleEdit(user)}>
                  Sửa
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Account;
