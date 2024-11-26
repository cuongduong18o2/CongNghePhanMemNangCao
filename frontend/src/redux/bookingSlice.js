import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    booking: {
      allBooking: [],
      isFetching: false,
      error: false,
      msg: null,
    },
  },
  reducers: {
    getBookingStart: (state) => {
      state.booking.isFetching = true;
      state.booking.error = false;
    },
    getBookingSuccess: (state, action) => {
      state.booking.isFetching = false;
      state.booking.allBooking = action.payload;
    },
    getBookingFailed: (state) => {
      state.booking.isFetching = false;
      state.booking.error = true;
    },
    deleteBookingStart: (state) => {
      state.booking.isFetching = true;
      state.booking.error = false; // Reset lại error
    },
    deleteBookingSuccess: (state, action) => {
      state.booking.isFetching = false;
      state.msg = action.payload;
    },
    deleteBookingFailed: (state, action) => {
      state.booking.isFetching = false;
      state.booking.error = true;
      state.msg = action.payload;
    },

    EditBookingStart: (state) => {
      state.booking.isFetching = true;
      state.booking.error = false; // Reset lại error
    },
    EditBookingSuccess: (state, action) => {
      state.booking.isFetching = false;
      state.msg = action.payload;
    },
    EditBookingFailed: (state, action) => {
      state.booking.isFetching = false;
      state.booking.error = true;
      state.msg = action.payload;
    },

    addBookingStart: (state) => {
      state.booking.isFetching = true;
      state.booking.error = false; // Reset lại error
    },
    addBookingSuccess: (state, action) => {
      state.booking.isFetching = false;
      state.booking.allBooking.push(action.payload);
      state.msg = action.payload.message; // Nếu có thông báo
    },
    addBookingFailed: (state, action) => {
      state.booking.isFetching = false;
      state.booking.error = true;
      state.msg = action.payload; // Lưu thông báo lỗi
    },
  },
});
export const {
  getBookingStart,
  getBookingFailed,
  getBookingSuccess,
  addBookingStart,
  addBookingFailed,
  addBookingSuccess,
  EditBookingStart,
  EditBookingSuccess,
  EditBookingFailed,
  deleteBookingStart,
  deleteBookingSuccess,
  deleteBookingFailed,
} = bookingSlice.actions;
export default bookingSlice.reducer;
