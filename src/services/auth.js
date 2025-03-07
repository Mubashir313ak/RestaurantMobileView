import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthActive, setAuthToken, setUserInfo } from "../redux/slices/auth";
import apiHandler from "./interceptor";

export const LoginApi = (body) => {
  console.log("body", body);

  return async function LoginApiThunk(dispatch) {
    try {
      const response = await apiHandler({
        method: "post",
        end_point: "auth/login",
        body,
        token: false,
        configuration: {},
      });

      console.log("Request URL:", `$auth/login`); // Updated to log the full URL.
      // console.log("response", response);

      dispatch(setUserInfo(response?.data?.user));
      dispatch(setAuthToken(response?.data?.token));
      dispatch(setAuthActive(true));
      AsyncStorage.setItem("userInfo", JSON.stringify(response?.data?.user));
      AsyncStorage.setItem("authToken", response?.data?.token);

      return response?.status;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  };
};

export const RegisterApi = async (body) => {
  try {
    const response = await apiHandler({
      method: "post",
      end_point: `auth/register`,
      token: false,
      body,

      configuration: {},
    });
    console.log("Sent data:", body);
    console.log("response22", response);
    return response.data.data;
  } catch (error) {
    console.log("Error:", error);
  }
};
