import { Link } from "react-router-dom";
import React, { useState } from "react";
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
import { toast } from "react-toastify";
import { apiSignUp } from "../../services/AuthenticationAPIs/authenticationService";
import EyeOpen from "../../assets/icons/EyeOpen";
import { signInWithPopup } from "firebase/auth";
import {
  apiLoginWithFacebook,
  apiLoginWithGoogle,
} from "../../services/AuthenticationAPIs/authenticationService";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../../firebaseConfig";
import { useDispatch } from "react-redux";
import { SetUserData } from "../../redux/slice/AuthSlice";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const UserRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (values: { email: string; password: string }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const response: any = await apiSignUp(payload);

      if (response.status === 201) {
        toast.success("Registration Successful!");
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error("Signup failed, please try again!");
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
    } catch (error) {
      console.error("Facebook Login Error:", error);
      toast.error("Facebook login failed, please try again!");
    }
  };
  return (
    <div className="flex min-w-96 justify-center items-center min-h-screen bg-[#FBF8FF]">
      <div className="w-full my-4  min-w-sm max-w-sm bg-[#FBF8FF]  rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Hello Hooman! 👋
        </h1>

        <div className="mt-10">
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={({ email, password }, { setSubmitting }) => {
              handleSignup({ email, password });
              setSubmitting(false);
            }}
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

                <div className="mb-4">
                  <Field
                    name="confirmPassword"
                    as={MuiInput}
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    fullWidth
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    leftIcon={<SquareLock />}
                    rightIcon={
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <EyeOpen /> : <ViewOff />}
                      </div>
                    }
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
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
                    Create Account
                  </MuiButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Sign In
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
          {/* <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
            <Apple />
          </button> */}
        </div>

        <div className="text-center mt-6 mx-3">
          <p className="text-md text-gray-600">
            By creating an account or signing you agree to our{" "}
            <Link to="/userSignup" className="text-[#0B1A97] font-semibold">
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
