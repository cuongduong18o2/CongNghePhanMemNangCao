import { useEffect, useState } from "react";
import "./room.css";
import {
  getAllRooms,
  addRoom,
  DeleteRoom,
  EditRoom,
} from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { loginSuccess } from "../../redux/authSlice";

const RoomManagement = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roomList = useSelector((state) => state.rooms.rooms?.allRoom || []);

  const [editRoomId, setEditRoomId] = useState(null);
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const [updatedRoomData, setUpdatedRoomData] = useState({
    RoomName: "",
    Price: 0,
    Genres: "",
    RoomStatus: "available",
    Image: "",
    Special: "",
    Convenient: "",
    Description: "",
    Capacity: "",
  });

  const [newRoomData, setNewRoomData] = useState({
    RoomName: "",
    Price: 0,
    Genres: "",
    RoomStatus: "available",
    Image: "",
    Special: "",
    Convenient: "",
    Description: "",
    Capacity: "",
  });

  const [imageFile, setImageFile] = useState(null);

  let axiosJWT = axios.create();

  const handleDelete = (id) => {
    DeleteRoom(user?.AccessToken, dispatch, id, axiosJWT);
  };

  const handleEdit = (room) => {
    setEditRoomId(room._id);
    setUpdatedRoomData({
      RoomName: room.RoomName,
      Price: room.Price,
      Genres: room.Genres,
      RoomStatus: room.RoomStatus,
      Image: room.Image,
      Special: room.Special,
      Convenient: room.Convenient,
      Description: room.Description,
      Capacity: room.Capacity,
    });
  };

  const handleUpdate = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedRoomData.Image = reader.result; // Thêm hình ảnh mới vào dữ liệu
        EditRoom(dispatch, editRoomId, updatedRoomData);
      };
      reader.readAsDataURL(imageFile);
    } else {
      EditRoom(dispatch, editRoomId, updatedRoomData); // Nếu không có hình ảnh, chỉ gửi dữ liệu cập nhật
    }

    setEditRoomId(null);
    setUpdatedRoomData({
      RoomName: "",
      Price: 0,
      Genres: "",
      RoomStatus: "available",
      Image: "",
      Special: "",
      Convenient: "",
      Description: "",
      Capacity: "",
    });
    setImageFile(null);
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    const newRoom = { ...newRoomData };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newRoom.Image = reader.result;
        addRoom(newRoom, dispatch, navigate);
      };
      reader.readAsDataURL(imageFile);
    } else {
      addRoom(newRoom, dispatch, navigate);
    }

    setNewRoomData({
      RoomName: "",
      Price: 0,
      Genres: "",
      RoomStatus: "available",
      Image: "",
      Special: "",
      Convenient: "",
      Description: "",
      Capacity: "",
    });
    setShowAddRoomForm(false);
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
      getAllRooms(dispatch, axiosJWT);
    }
  }, [user, navigate, dispatch, axiosJWT]);

  return (
    <main className="room-management-container">
      <h1 className="room-management-title">Trang quản lý phòng</h1>
      <div className="room-management-role">
        {`Quyền của bạn là: ${user?.admin ? `Admin` : `User`}`}
      </div>

      <button className="add-room-btn" onClick={() => setShowAddRoomForm(true)}>
        Thêm phòng
      </button>

      {showAddRoomForm && (
        <div className="add-form">
          <h2>Thêm phòng mới</h2>
          <input
            type="text"
            placeholder="Tên phòng"
            value={newRoomData.RoomName}
            onChange={(e) =>
              setNewRoomData({ ...newRoomData, RoomName: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Giá phòng"
            value={newRoomData.Price}
            onChange={(e) =>
              setNewRoomData({ ...newRoomData, Price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Thể loại"
            value={newRoomData.Genres}
            onChange={(e) =>
              setNewRoomData({ ...newRoomData, Genres: e.target.value })
            }
          />
          <select
            value={newRoomData.RoomStatus}
            onChange={(e) =>
              setNewRoomData({ ...newRoomData, RoomStatus: e.target.value })
            }
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input
            type="text"
            placeholder="Đặc biệt"
            value={newRoomData.Special}
            onChange={(e) =>
              setNewRoomData({ ...newRoomData, Special: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Tiện nghi"
            value={newRoomData.Convenient}
            onChange={(e) =>
              setNewRoomData({ ...newRoomData, Convenient: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={newRoomData.Description}
            onChange={(e) =>
              setNewRoomData({ ...newRoomData, Description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Sức chứa"
            value={newRoomData.Capacity}
            onChange={(e) =>
              setNewRoomData({ ...newRoomData, Capacity: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <div className="button-container">
            <button className="add-button" onClick={handleAddRoom}>
              Thêm
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowAddRoomForm(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {editRoomId && (
        <div className="edit-form">
          <h2>Chỉnh sửa thông tin phòng</h2>
          <input
            type="text"
            placeholder="Tên phòng"
            value={updatedRoomData.RoomName}
            onChange={(e) =>
              setUpdatedRoomData({
                ...updatedRoomData,
                RoomName: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Giá phòng"
            value={updatedRoomData.Price}
            onChange={(e) =>
              setUpdatedRoomData({ ...updatedRoomData, Price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Thể loại"
            value={updatedRoomData.Genres}
            onChange={(e) =>
              setUpdatedRoomData({ ...updatedRoomData, Genres: e.target.value })
            }
          />
          <select
            value={updatedRoomData.RoomStatus}
            onChange={(e) =>
              setUpdatedRoomData({
                ...updatedRoomData,
                RoomStatus: e.target.value,
              })
            }
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <input
            type="text"
            placeholder="Đặc biệt"
            value={updatedRoomData.Special}
            onChange={(e) =>
              setUpdatedRoomData({
                ...updatedRoomData,
                Special: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Tiện nghi"
            value={updatedRoomData.Convenient}
            onChange={(e) =>
              setUpdatedRoomData({
                ...updatedRoomData,
                Convenient: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={updatedRoomData.Description}
            onChange={(e) =>
              setUpdatedRoomData({
                ...updatedRoomData,
                Description: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Sức chứa"
            value={updatedRoomData.Capacity}
            onChange={(e) =>
              setUpdatedRoomData({
                ...updatedRoomData,
                Capacity: e.target.value,
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
              onClick={() => setEditRoomId(null)}
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <table className="room-management-table">
        <thead>
          <tr>
            <th>Tên phòng</th>
            <th>Giá</th>
            <th>Thể loại</th>
            <th>Trạng thái</th>
            <th>Thông tin chi tiết</th>
            <th>Điểm nổi bật</th>
            <th>Tiện lợi</th>
            <th>Sức chứa</th>
            <th>Hình ảnh</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(roomList) && roomList.length > 0 ? (
            roomList.map((room) => (
              <tr key={room._id}>
                <td className="room-name">{room.RoomName}</td>
                <td className="room-price">{room.Price}</td>
                <td className="room-genres">{room.Genres}</td>
                <td className="room-status">{room.RoomStatus}</td>
                <td className="room-description">{room.Description}</td>
                <td className="room-special">{room.Special}</td>
                <td className="room-convenient">{room.Convenient}</td>
                <td className="room-capacity">{room.Capacity}</td>

                <td className="room-image">
                  <img
                    src={room.Image}
                    alt={room.RoomName}
                    style={{ width: "100px", height: "auto" }}
                  />{" "}
                </td>
                <td className="room-actions">
                  <button className="edit-btn" onClick={() => handleEdit(room)}>
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(room._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không có phòng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
};

export default RoomManagement;
