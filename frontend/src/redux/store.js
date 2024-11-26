import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Import the reducer, not the slice
import usersReducer from "./userSlice";
import roomReducer from "./roomSlice";
import bookingReducer from "./bookingSlice";
import serviceReducer from "./service";
import bookingSeviceReducer from "./bookingservice";
import revenueReducer from "./revenueSlice";
import reportReducer from "./reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    rooms: roomReducer,
    booking: bookingReducer,
    services: serviceReducer,
    bookingService: bookingSeviceReducer,
    revenue: revenueReducer,
    reports: reportReducer,
  },
});
