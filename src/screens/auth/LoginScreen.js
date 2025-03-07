import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { LoginApi } from "../../services/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Validation schema with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Use react-hook-form with yup validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data) => {
    const { email, password } = data;

    setLoading(true);

    try {
      const body = { email, password };
      const status = await dispatch(LoginApi(body));
      console.log("status", status);

      setLoading(false);

      // Check if status is 200 (Login successful)
      if (status === 200) {
        Alert.alert("Good", "Login Succeeded");
        // Uncomment the next line if you want to navigate to the Home screen
        // navigation.navigate("Home");
      } else {
        Alert.alert("Error", "Login failed, please try again");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Error", "An error occurred, please try again later");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      {/* React Hook Form */}
      <View style={styles.form}>
        {/* Email input */}
        <TextInput
          style={[styles.input, errors.email ? { borderColor: "red" } : {}]}
          placeholder="Email"
          onChangeText={(text) => setValue("email", text)}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* Password input */}
        <TextInput
          style={[styles.input, errors.password ? { borderColor: "red" } : {}]}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setValue("password", text)}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {/* Login Button */}
        <Button title="Login" onPress={handleSubmit(handleLogin)} />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  form: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});

export default LoginScreen;
