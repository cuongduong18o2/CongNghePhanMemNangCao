import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reports: {
      allReport: [],
      isFetching: false,
      error: false,
      msg: null,
    },
  },
  reducers: {
    getReportsStart: (state) => {
      state.reports.isFetching = true;
      state.reports.error = false; // Reset lại error
    },
    getReportsSuccess: (state, action) => {
      state.reports.isFetching = false;
      state.reports.allReport = action.payload;
    },
    getReportsFailed: (state) => {
      state.reports.isFetching = false;
      state.reports.error = true;
    },

    deleteReportsStart: (state) => {
      state.reports.isFetching = true;
      state.reports.error = false; // Reset lại error
    },
    deleteReportsSuccess: (state, action) => {
      state.reports.isFetching = false;
      state.msg = action.payload;
    },
    deleteReportsFailed: (state, action) => {
      state.reports.isFetching = false;
      state.reports.error = true;
      state.msg = action.payload;
    },
    addReportsStart: (state) => {
      state.reports.isFetching = true;
      state.reports.error = false; // Reset lại error
    },
    addReportsSuccess: (state, action) => {
      state.reports.isFetching = false;
      state.reports.allReport.push(action.payload); // Thêm phòng vào danh sách
      state.msg = action.payload.message; // Nếu có thông báo
    },
    addReportsFailed: (state, action) => {
      state.reports.isFetching = false;
      state.reports.error = true;
      state.msg = action.payload; // Lưu thông báo lỗi
    },
  },
});

export const {
  getReportsStart,
  getReportsSuccess,
  getReportsFailed,
  addReportsStart,
  addReportsSuccess,
  addReportsFailed,
  deleteReportsStart,
  deleteReportsSuccess,
  deleteReportsFailed,
} = reportSlice.actions;
export default reportSlice.reducer;
