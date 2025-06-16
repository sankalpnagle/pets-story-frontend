// import  { useEffect, useState } from "react";
// import {
//   Box,
//   IconButton,
//   Typography,
//   Link,
//   InputAdornment,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import MuiInput from "../../components/input/MuiInput";
// import SquareLock from "../../assets/icons/SquareLock";
// import ViewOff from "../../assets/icons/ViewOff";
// import CircleArrowLeft from "../../assets/icons/CircleArrowLeft";
// import MuiButton from "../../components/button/MuiButton";
// import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
// import { auth } from "../../../firebaseConfig.js";
// import { useNavigate } from "react-router-dom";
// import EyeOpen from "../../assets/icons/EyeOpen.js";

// const sharedContainerStyle = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   minHeight: "100vh",
//   backgroundColor: "#f5f5ff",
//   padding: { xs: 2, sm: 3 },
// };

// const sharedBoxStyle = {
//   width: "100%",
//   maxWidth: 400,
//   backgroundColor: "#fff",
//   borderRadius: 3,
//   padding: { xs: 3, sm: 4 },
//   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
// };

// const validationSchema = Yup.object({
//   newPassword: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .required("New password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
//     .required("Confirm password is required"),
// });

// const ResetPassword = () => {
//   // const auth = auth();
//   const [oobCode, setOobCode] = useState("");
//   // const [error, setError] = useState("");
//   // const [success, setSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const navigate = useNavigate();
//   const handleSubmit = (values: any) => {
//     console.log("Form values:", values);
//     handleResetPassword(values);
//   };
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const code = params.get("oobCode");
//     if (code) {
//       setOobCode(code);
//     } else {
//       // setError("Invalid or missing password reset code.");
//     }
//   }, []);

//   const handleResetPassword = async (values: any) => {
//     if (values?.newPassword !== values?.confirmPassword) {
      
//       return;
//     }
//     try {
     
//       await verifyPasswordResetCode(auth, oobCode);

      
//       await confirmPasswordReset(auth, oobCode, values?.newPassword);
     
//       navigate("/passwordChanged");
      
//     } catch (err: any) {
//       console.log(err);
     
//     }
//   };
//   return (
//     <Box sx={sharedContainerStyle}>
//       <Box sx={sharedBoxStyle}>
//         {/* {error && <p style={{ color: "red" }}>{error}</p>}
//         {success && <p style={{ color: "green" }}>{success}</p>} */}
//         <IconButton sx={{ mb: 2 }}>
//           <CircleArrowLeft />
//         </IconButton>

//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: "bold",
//             color: "#1E3A8A",
//             mb: 1,
//             fontSize: { xs: "1.8rem", sm: "2rem" },
//           }}
//         >
//           Reset Password
//         </Typography>

//         <Typography
//           sx={{
//             fontSize: { xs: "14px", sm: "15px" },
//             color: "#666",
//             mb: 3,
//           }}
//         >
//           Please type something you'll remember.
//         </Typography>

//         <Formik
//           initialValues={{ newPassword: "", confirmPassword: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ errors, touched, handleChange, handleBlur }) => (
//             <Form>
//               <Field
//                 as={MuiInput}
//                 name="newPassword"
//                 type={showNewPassword ? "text" : "password"}
//                 placeholder="New Password"
//                 fullWidth
//                 error={touched.newPassword && !!errors.newPassword}
//                 helperText={touched.newPassword && errors.newPassword}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 leftIcon={<SquareLock />}
//                 rightIcon={
//                     <div
//                       className="cursor-pointer"
//                       onClick={() => setShowNewPassword(!showNewPassword)}
//                     >
//                       {showNewPassword ? <EyeOpen /> : <ViewOff />}
//                     </div>
//                   }
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockOutlinedIcon sx={{ color: "#666" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   backgroundColor: "#f5f5f5",
//                   borderRadius: 50,
//                   mb: 3,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 50,
//                   },
//                   "& .MuiInputBase-input": {
//                     padding: "10px 15px",
//                   },
//                 }}
//               />

//               <Field
//                 as={MuiInput}
//                 name="confirmPassword"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 fullWidth
//                 error={touched.confirmPassword && !!errors.confirmPassword}
//                 helperText={touched.confirmPassword && errors.confirmPassword}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 leftIcon={<SquareLock />}
//                 rightIcon={
//                     <div
//                       className="cursor-pointer"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOpen /> : <ViewOff />}
//                     </div>
//                   }
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockOutlinedIcon sx={{ color: "#666" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   backgroundColor: "#f5f5f5",
//                   borderRadius: 50,
//                   mb: 3,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 50,
//                   },
//                   "& .MuiInputBase-input": {
//                     padding: "10px 15px",
//                   },
//                 }}
//               />

//               <div className="mt-6">
                
//                 <MuiButton
//                   variant="contained"
//                   size="large"
//                   color="#0B1A97"
//                   fullWidth
//                   type="submit"
//                 >
//                   Reset Password
//                 </MuiButton>
//               </div>
//             </Form>
//           )}
//         </Formik>

//         <Typography
//           sx={{
//             fontSize: "14px",
//             color: "#666",
//             mt: 3,
//             textAlign: "center",
//           }}
//         >
//           Remembered your password?{" "}
//           <Link
//             href="/"
//             sx={{
//               fontWeight: "bold",
//               color: "#1E3A8A",
//               textDecoration: "none",
//             }}
//           >
//             Sign in
//           </Link>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default ResetPassword;

import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Link,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import MuiInput from "../../components/input/MuiInput";
import SquareLock from "../../assets/icons/SquareLock";
import ViewOff from "../../assets/icons/ViewOff";
import CircleArrowLeft from "../../assets/icons/CircleArrowLeft";
import MuiButton from "../../components/button/MuiButton";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import EyeOpen from "../../assets/icons/EyeOpen.js";

const sharedContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5ff",
  padding: { xs: 2, sm: 3 },
};

const sharedBoxStyle = {
  width: "100%",
  maxWidth: 400,
  backgroundColor: "#fff",
  borderRadius: 3,
  padding: { xs: 3, sm: 4 },
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
};

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPassword = () => {
  const [oobCode, setOobCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    handleResetPassword(values);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    if (code) {
      setOobCode(code);
    }
  }, []);

  const handleResetPassword = async (values: any) => {
    if (values?.newPassword !== values?.confirmPassword) {
      return;
    }
    try {
      await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, values?.newPassword);
      navigate("/passwordChanged");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Box sx={sharedContainerStyle}>
      <Box sx={sharedBoxStyle}>
        <IconButton sx={{ mb: 2 }}>
          <CircleArrowLeft />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#1E3A8A",
            mb: 1,
            textAlign: "center",
            fontSize: { xs: "1.6rem", sm: "2rem" },
          }}
        >
          Reset Password
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "15px" },
            color: "#666",
            mb: 3,
            textAlign: "center",
          }}
        >
          Please type something you'll remember.
        </Typography>

        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              {/* <Field
                as={MuiInput}
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                fullWidth
                error={touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                leftIcon={<SquareLock />}
                rightIcon={
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOpen /> : <ViewOff />}
                  </div>
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "#666" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 50,
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 50,
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 15px",
                  },
                }}
              />

              <Field
                as={MuiInput}
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                fullWidth
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "#666" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 50,
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 50,
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 15px",
                  },
                }}
              /> */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Field
                  as={MuiInput}
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  fullWidth
                  error={touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  leftIcon={<SquareLock />}
                  rightIcon={
                    <div
                      className="cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOpen /> : <ViewOff />}
                    </div>
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "#666" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: 50,
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 50,
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px 15px",
                    },
                  }}
                />

                <Field
                  as={MuiInput}
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  fullWidth
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "#666" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: 50,
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 50,
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px 15px",
                    },
                  }}
                />

                <div className="mt-6">
                  <MuiButton
                    variant="contained"
                    size="large"
                    color="#0B1A97"
                    fullWidth
                    type="submit"
                  >
                    Reset Password
                  </MuiButton>
                </div>
              </Box>
            </Form>
          )}
        </Formik>

        <Typography
          sx={{
            fontSize: "14px",
            color: "#666",
            mt: 3,
            textAlign: "center",
          }}
        >
          Remembered your password?{" "}
          <Link
            href="/login"
            sx={{
              fontWeight: "bold",
              color: "#1E3A8A",
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;

