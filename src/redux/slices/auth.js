import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: "",
    status: "",
    role: "",
    authActive: "",
    userInfo: {},
    baseUrl: "https://restaurantserver-production.up.railway.app/api/",
  },
  reducers: {
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    setAuthActive(state, action) {
      state.authActive = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    logout(state) {
      AsyncStorage.removeItem("authToken");
      AsyncStorage.removeItem("userInfo");
      state.authActive = "";
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const {
  setStatus,
  logout,
  setUserInfo,
  setRole,
  setAuthActive,
  setAuthToken,
} = authSlice.actions;
export default authSlice.reducer;
