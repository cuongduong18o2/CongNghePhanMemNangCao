import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: {
      allService: [],
      isFetching: false,
      error: false,
      msg: null,
    },
  },
  reducers: {
    getServiceStart: (state) => {
      state.services.isFetching = true;
      state.services.error = false; // Reset lại error
    },
    getServiceSuccess: (state, action) => {
      state.services.isFetching = false;
      state.services.allService = action.payload;
    },
    getServiceFailed: (state) => {
      state.services.isFetching = false;
      state.services.error = true;
    },

    deleteServiceStart: (state) => {
      state.services.isFetching = true;
      state.services.error = false; // Reset lại error
    },
    deleteServiceSuccess: (state, action) => {
      state.services.isFetching = false;
      state.msg = action.payload;
    },
    deleteServiceFailed: (state, action) => {
      state.services.isFetching = false;
      state.services.error = true;
      state.msg = action.payload;
    },

    EditServiceStart: (state) => {
      state.services.isFetching = true;
      state.services.error = false; // Reset lại error
    },
    EditServiceSuccess: (state, action) => {
      state.services.isFetching = false;
      state.msg = action.payload;
    },
    EditServiceFailed: (state, action) => {
      state.services.isFetching = false;
      state.services.error = true;
      state.msg = action.payload;
    },

    // Thêm các reducer cho addRoom
    addServiceStart: (state) => {
      state.services.isFetching = true;
      state.services.error = false; // Reset lại error
    },
    addServiceSuccess: (state, action) => {
      state.services.isFetching = false;
      state.services.allService.push(action.payload); // Thêm phòng vào danh sách
      state.msg = action.payload.message; // Nếu có thông báo
    },
    addServiceFailed: (state, action) => {
      state.services.isFetching = false;
      state.services.error = true;
      state.msg = action.payload; // Lưu thông báo lỗi
    },
  },
});

export const {
  getServiceStart,
  getServiceSuccess,
  getServiceFailed,
  addServiceStart,
  addServiceSuccess,
  addServiceFailed,
  EditServiceStart,
  EditServiceSuccess,
  EditServiceFailed,
  deleteServiceStart,
  deleteServiceSuccess,
  deleteServiceFailed,
} = serviceSlice.actions;
export default serviceSlice.reducer;
