import { createSlice } from "@reduxjs/toolkit";

const RevenueSlice = createSlice({
  name: "revenue",
  initialState: {
    revenue: {}, // Doanh thu hiện tại (không phải mảng)
    isFetching: false,
    error: false,
    message: null, // Thông báo từ API
  },
  reducers: {
    getRevenuesStart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset lại lỗi
      state.message = null; // Reset thông báo
    },
    getRevenuesSuccess: (state, action) => {
      state.isFetching = false;
      state.revenue = action.payload; // Lưu doanh thu trả về từ API
      state.message = "Doanh thu đã được tải thành công!"; // Thông báo thành công
    },
    getRevenuesFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload || "Có lỗi khi lấy doanh thu."; // Thông báo lỗi
    },
    editRevenuesStart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset lỗi
      state.message = null; // Reset thông báo
    },
    editRevenuesSuccess: (state, action) => {
      state.isFetching = false;
      state.revenue = action.payload; // Cập nhật doanh thu sau khi chỉnh sửa
      state.message =
        action.payload.message || "Doanh thu đã được cập nhật thành công!";
    },
    editRevenuesFailed: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload || "Có lỗi khi cập nhật doanh thu."; // Thông báo lỗi
    },
  },
});

export const {
  getRevenuesStart,
  getRevenuesSuccess,
  getRevenuesFailed,
  editRevenuesStart,
  editRevenuesSuccess,
  editRevenuesFailed,
} = RevenueSlice.actions;

export default RevenueSlice.reducer;
