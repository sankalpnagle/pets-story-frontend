import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MuiInput from "../../components/input/MuiInput";
import FaceBook from "../../assets/icons/FaceBook";
import Google from "../../assets/icons/Google";
import Apple from "../../assets/icons/Apple";
import MuiButton from "../../components/button/MuiButton";
import OutlineMessage from "../../assets/icons/OutlineMessage";
import SquareLock from "../../assets/icons/SquareLock";
import ViewOff from "../../assets/icons/ViewOff";
import { useDispatch } from "react-redux";
import {
  apiLogin,
  apiLoginWithFacebook,
  apiLoginWithGoogle,
} from "../../services/AuthenticationAPIs/authenticationService";
import { SetUserData } from "../../redux/slice/AuthSlice";
import { toast } from "react-toastify";
import EyeOpen from "../../assets/icons/EyeOpen";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../../firebaseConfig";
import { UserData } from "../../redux/slice/UserProfileSlice";
import { requestFCMToken } from "../../utils/firebaseUtils";
import { saveFCMToken } from "../../services/Notification/Notification";
import { CircularProgress } from "@mui/material";
// import {  googleProvider } from "../../../firebaseConfig;

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // let a = messaging;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user-dashboard");
    }
  }, [navigate]);

  const handleLogin = async (values: { email: string; password: string }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const response: any = await apiLogin(payload);
      console.log(response);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("username", response.data.data.fullName);

      dispatch(UserData(response.data.data));

      dispatch(
        SetUserData({
          ...response?.data?.data,
          email: response.data.data.email,
          token: response.data.data.token,
          role: response.data.data.role,
          id: response.data.data.uid,
          loginBy :  "Logged in with email"
        })
      );

      toast.success("Login Successful !", {
        onClose: () => {
          switch (response.data.data.role) {
            case "admin":
              navigate("/vet-dashboard");
              break;
            case "user":
              navigate("/user-dashboard");
              break;
            default:
              navigate("/");
          }
        },
      });
      const fetchFCMToken = async () => {
        try {
          console.log("fetchingtoken");
          const token = await requestFCMToken();
          console.log("fcm token generated", token);
          const payload = {
            token: token,
            userId: response.data.data.email,
          };
          if (token) {
            const res = await saveFCMToken(payload);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchFCMToken();
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login failed, please try again!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Trigger the Google login popup
      const result = await signInWithPopup(auth, googleProvider);

      // Get the ID token from the authenticated user
      const idToken = await result.user.getIdToken();

      // Send the token to the backend for verification
      const response = await apiLoginWithGoogle({ idToken });
      // Process backend response (similar to email login)
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("username", response.data.data.fullName);
      
      dispatch(
        SetUserData({
          ...response?.data?.data,
          email: response.data.data.email,
          token: response.data.data.token,
          role: response.data.data.role,
          id: response.data.data.uid,
          loginBy :  "Logged in with google"
        })
      );

      toast.success("Google Login Successful!", {
        onClose: () => {
          switch (response.data.data.role) {
            case "admin":
              navigate("/vet-dashboard");
              break;
            case "user":
              navigate("/user-dashboard");
              break;
            default:
              navigate("/");
          }
        },
      });
      console.log("ffffffffm crun in asdf ")
      const fetchFCMToken = async () => {
        try {
          console.log("fetchingtoken");
          const token = await requestFCMToken();
          console.log("fcm token generated", token);
          const payload = {
            token: token,
            userId: response.data.data.email,
          };
          if (token) {
            const res = await saveFCMToken(payload);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchFCMToken();
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google login failed, please try again!");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Trigger Facebook login popup
      const result = await signInWithPopup(auth, facebookProvider);

      // Retrieve the ID token from the user
      const idToken = await result.user.getIdToken();

      // Send token to your backend for verification
      const response = await apiLoginWithFacebook({ idToken });
      // Save user data in localStorage and Redux (or context)
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("username", response.data.data.fullName);

      dispatch(
        SetUserData({
          ...response?.data?.data,
          email: response.data.data.email,
          token: response.data.data.token,
          role: response.data.data.role,
          id: response.data.data.uid,
          loginBy :  "Logged in with facebook"
        })
      );

      // Navigate based on role
      toast.success("Facebook Login Successful!", {
        onClose: () => {
          switch (response.data.data.role) {
            case "admin":
              navigate("/admin-dashboard");
              break;
            case "user":
              navigate("/user-dashboard");
              break;
            default:
              navigate("/");
          }
        },
      });
      const fetchFCMToken = async () => {
        try {
          console.log("fetchingtoken");
          const token = await requestFCMToken();
          console.log("fcm token generated", token);
          const payload = {
            token: token,
            userId: response.data.data.email,
          };
          if (token) {
            const res = await saveFCMToken(payload);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchFCMToken();
    } catch (error) {
      console.error("Facebook Login Error:", error);
      toast.error("Facebook login failed, please try again!");
    }
  };
  // const handleAppleLogin = async () => {
  //   try {
  //     // Trigger the Apple login popup
  //     const result = await signInWithPopup(auth, appleProvider);

  //     // Get the ID token from the authenticated user
  //     const idToken = await result.user.getIdToken();

  //     // Send the token to the backend for verification
  //     const response = await apiLoginWithApple({ idToken });

  //     // Save user details in local storage
  //     localStorage.setItem("token", response.data.data.token);
  //     localStorage.setItem("role", response.data.data.role);
  //     localStorage.setItem("username", response.data.data.username);

  //     // Dispatch user data to Redux store
  //     dispatch(
  //       SetUserData({
  //         ...response?.data?.data,
  //         email: response.data.data.email,
  //         token: response.data.data.token,
  //         role: response.data.data.role,
  //         id: response.data.data.uid,
  //       })
  //     );

  //     toast.success("Apple Login Successful!", {
  //       onClose: () => {
  //         switch (response.data.data.role) {
  //           case "admin":
  //             navigate("/admin-dashboard");
  //             break;
  //           case "user":
  //             navigate("/user-dashboard");
  //             break;
  //           default:
  //             navigate("/");
  //         }
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Apple Login Error:", error);
  //     toast.error("Apple login failed, please try again!");
  //   }
  // };
  return (
    <div className="flex min-w-96 justify-center items-center min-h-screen bg-[#FBF8FF]  ">
      <div className="w-full my-4  min-w-sm max-w-sm bg-[#FBF8FF] p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Welcome Back Hooman! 🫰
        </h1>

        <div className="mt-10">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
              isSubmitting,
            }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    name="email"
                    as={MuiInput}
                    placeholder="Email Address"
                    type="email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    leftIcon={<OutlineMessage />}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>

                <div className="mb-4">
                  <Field
                    name="password"
                    as={MuiInput}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    leftIcon={<SquareLock />}
                    rightIcon={
                      <div
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOpen /> : <ViewOff />}
                      </div>
                    }
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>

                <div className="mt-6">
                  <MuiButton
                    variant="contained"
                    size="large"
                    color="#0B1A97"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" /> // Show loader when submitting
                    ) : (
                      "Sign in" // Show text when not submitting
                    )}
                  </MuiButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Can’t sign in?{" "}
            <Link to="/forgotPassword" className="text-blue-600 font-semibold">
              Reset Password
            </Link>
          </p>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-gray-500">Or Sign in with</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleFacebookLogin}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <FaceBook />
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Google />
          </button>
          {/* <button
            onClick={handleAppleLogin}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Apple />
          </button> */}
        </div>

        <div className="text-center mt-6">
          <p className="text-md text-gray-600">
            Don’t have an account yet?{" "}
            <Link to="/userSignup" className="text-blue-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
