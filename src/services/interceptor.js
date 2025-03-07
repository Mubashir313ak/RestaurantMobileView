import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "https://restaurantserver-production.up.railway.app/api/";

const apiHandler = async ({
  token = false,
  method = "get",
  end_point = "",
  body = {},
  configuration = {},
}) => {
  try {
    // Get token from AsyncStorage
    const getToken = await AsyncStorage.getItem("authToken"); // Use await here
    console.log("Token from AsyncStorage:", getToken);

    // Configure headers based on whether a token is provided
    const headers = {
      ...configuration, // Add any other custom headers here
    };

    if (token && getToken) {
      headers["Authorization"] = `Bearer ${getToken}`; // Add the Authorization header if the token is available
    }

    const apiInterceptor = axios.create({
      baseURL,
      timeoutErrorMessage: "Request timeout! Please retry.",
      headers, // Attach headers directly here
    });

    // Instead of createError, use the Error constructor directly
    apiInterceptor.interceptors.request.use(
      (req) => req,
      (error) => Promise.reject(error)
    );

    apiInterceptor.interceptors.response.use(
      (res) => res,
      (error) => Promise.reject(error)
    );

    // Perform the request with axios
    const res = await apiInterceptor[method](end_point, body);
    return res;
  } catch (error) {
    // Handle the error based on response status
    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode >= 500) {
        // Instead of createError, we can use the Error constructor directly
        throw new Error(
          `Something went wrong! Please try again later. (Status Code: ${statusCode})`
        );
      } else {
        throw new Error(
          error.response.data?.message ||
            `An error occurred. (Status Code: ${statusCode})`
        );
      }
    } else if (error.request) {
      throw new Error(
        "No response from the server. Please check your connection."
      );
    } else {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  }
};

export default apiHandler;
