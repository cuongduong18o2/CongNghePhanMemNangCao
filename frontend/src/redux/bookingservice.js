import { createSlice } from "@reduxjs/toolkit";

const bookingserviceSlice = createSlice({
  name: "bookingService",
  initialState: {
    bookingService: {
      allBookingService: [],
      isFetching: false,
      error: false,
      msg: null,
    },
  },
  reducers: {
    getBookingServiceStart: (state) => {
      state.bookingService.isFetching = true;
      state.bookingService.error = false;
    },
    getBookingServiceSuccess: (state, action) => {
      state.bookingService.isFetching = false;
      state.bookingService.allBookingService = action.payload;
    },
    getBookingServiceFailed: (state) => {
      state.bookingService.isFetching = false;
      state.bookingService.error = true;
    },
    deleteBookingServiceStart: (state) => {
      state.bookingService.isFetching = true;
      state.bookingService.error = false; // Reset lại error
    },
    deleteBookingServiceSuccess: (state, action) => {
      state.bookingService.isFetching = false;
      state.msg = action.payload;
    },
    deleteBookingServiceFailed: (state, action) => {
      state.bookingService.isFetching = false;
      state.bookingService.error = true;
      state.msg = action.payload;
    },

    EditBookingServiceStart: (state) => {
      state.bookingService.isFetching = true;
      state.bookingService.error = false; // Reset lại error
    },
    EditBookingServiceSuccess: (state, action) => {
      state.bookingService.isFetching = false;
      state.msg = action.payload;
    },
    EditBookingServiceFailed: (state, action) => {
      state.bookingService.isFetching = false;
      state.bookingService.error = true;
      state.msg = action.payload;
    },

    addBookingServiceStart: (state) => {
      state.bookingService.isFetching = true;
      state.bookingService.error = false; // Reset lại error
    },
    addBookingServiceSuccess: (state, action) => {
      state.bookingService.isFetching = false;
      state.bookingService.allBookingService.push(action.payload);
      state.msg = action.payload.message; // Nếu có thông báo
    },
    addBookingServiceFailed: (state, action) => {
      state.bookingService.isFetching = false;
      state.bookingService.error = true;
      state.msg = action.payload; // Lưu thông báo lỗi
    },
  },
});

export const {
  getBookingServiceStart,
  getBookingServiceSuccess,
  getBookingServiceFailed,
  addBookingServiceStart,
  addBookingServiceFailed,
  addBookingServiceSuccess,
  EditBookingServiceStart,
  EditBookingServiceFailed,
  EditBookingServiceSuccess,
  deleteBookingServiceStart,
  deleteBookingServiceSuccess,
  deleteBookingServiceFailed,
} = bookingserviceSlice.actions;
export default bookingserviceSlice.reducer;
