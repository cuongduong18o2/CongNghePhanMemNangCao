import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: {
      allRoom: [],
      isFetching: false,
      error: false,
      msg: null, // Khai báo msg trong initialState
    },
  },
  reducers: {
    getRoomStart: (state) => {
      state.rooms.isFetching = true;
      state.rooms.error = false; // Reset lại error
    },
    getRoomsSuccess: (state, action) => {
      state.rooms.isFetching = false;
      state.rooms.allRoom = action.payload;
    },
    getRoomsFailed: (state) => {
      state.rooms.isFetching = false;
      state.rooms.error = true;
    },

    deleteRoomsStart: (state) => {
      state.rooms.isFetching = true;
      state.rooms.error = false; // Reset lại error
    },
    deleteRoomsSuccess: (state, action) => {
      state.rooms.isFetching = false;
      state.msg = action.payload;
    },
    deleteRoomsFailed: (state, action) => {
      state.rooms.isFetching = false;
      state.rooms.error = true;
      state.msg = action.payload;
    },

    EditRoomsStart: (state) => {
      state.rooms.isFetching = true;
      state.rooms.error = false; // Reset lại error
    },
    EditRoomsSuccess: (state, action) => {
      state.rooms.isFetching = false;
      state.msg = action.payload;
    },
    EditRoomsFailed: (state, action) => {
      state.rooms.isFetching = false;
      state.rooms.error = true;
      state.msg = action.payload;
    },

    // Thêm các reducer cho addRoom
    addRoomStart: (state) => {
      state.rooms.isFetching = true;
      state.rooms.error = false; // Reset lại error
    },
    addRoomSuccess: (state, action) => {
      state.rooms.isFetching = false;
      state.rooms.allRoom.push(action.payload); // Thêm phòng vào danh sách
      state.msg = action.payload.message; // Nếu có thông báo
    },
    addRoomFailed: (state, action) => {
      state.rooms.isFetching = false;
      state.rooms.error = true;
      state.msg = action.payload; // Lưu thông báo lỗi
    },
  },
});

// Xuất các action
export const {
  getRoomStart,
  getRoomsSuccess,
  getRoomsFailed,
  deleteRoomsStart,
  deleteRoomsSuccess,
  deleteRoomsFailed,
  EditRoomsStart,
  EditRoomsSuccess,
  EditRoomsFailed,
  addRoomStart,
  addRoomSuccess,
  addRoomFailed,
} = roomSlice.actions;

export default roomSlice.reducer;
