// import React, { useState } from "react";
// import {
//     Box,
//     IconButton,
//     Typography,
//     Link,
//     InputAdornment,
// } from "@mui/material";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import MuiInput from "../../components/input/MuiInput";
// import MuiButton from "../../components/button/MuiButton";
// import CircleArrowLeft from "../../assets/icons/CircleArrowLeft";
// import { apiForgotPassword } from "../../services/AuthenticationAPIs/authenticationService";
// import { toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css";

// const ForgotPassword = () => {
//     const initialValues = { email: "" };
//     const [isLinkSent, setIsLinkSent] = useState(false); 

//     const validationSchema = Yup.object().shape({
//         email: Yup.string()
//             .email("Invalid email address")
//             .required("Email is required"),
//     });

//     const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
//         try {
//             const payload = { email: values.email };
//             const response = await apiForgotPassword(payload);
//             console.log("API response:", response);


//             setIsLinkSent(true);


//             toast.success("Link Sent Successfully!");

//             resetForm();
//         } catch (error: any) {
//             console.error("API error:", error);
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 minHeight: "100vh",
//                 backgroundColor: "",
//                 minWidth: "660px",
//                 padding: { xs: 2, sm: 3 },
//             }}
//         >
//             <Box
//                 sx={{
//                     width: "100%",
//                     maxWidth: 400,
//                     backgroundColor: "#fff",
//                     borderRadius: 3,
//                     padding: { xs: 3, sm: 4 },
//                     boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//                 }}
//             >
//                 <IconButton sx={{ mb: 2 }}>
//                     <CircleArrowLeft />
//                 </IconButton>

//                 {!isLinkSent ? (
//                     <>
//                         <Typography
//                             variant="h5"
//                             sx={{
//                                 fontWeight: "bold",
//                                 color: "#1E3A8A",
//                                 mb: 1,
//                                 fontSize: { xs: "1.8rem", sm: "2rem" },
//                             }}
//                         >
//                             Forgot password?
//                         </Typography>

//                         <Typography
//                             sx={{
//                                 fontSize: { xs: "14px", sm: "15px" },
//                                 color: "#666",
//                                 mb: 3,
//                             }}
//                         >
//                             Don’t worry! It happens. Please enter the email associated with your account.
//                         </Typography>

//                         <Formik
//                             initialValues={initialValues}
//                             validationSchema={validationSchema}
//                             onSubmit={handleSubmit}
//                         >
//                             {({ isSubmitting, errors, touched }) => (
//                                 <Form>
//                                     <Field
//                                         as={MuiInput}
//                                         name="email"
//                                         fullWidth
//                                         placeholder="Email"
//                                         error={touched.email && Boolean(errors.email)}
//                                         helperText={<ErrorMessage name="email" />}
//                                         leftIcon={<EmailOutlinedIcon />}
//                                         InputProps={{
//                                             startAdornment: (
//                                                 <InputAdornment position="start">
//                                                     <EmailOutlinedIcon sx={{ color: "#666" }} />
//                                                 </InputAdornment>
//                                             ),
//                                         }}
//                                         sx={{
//                                             backgroundColor: "#f5f5f5",
//                                             borderRadius: 50,
//                                             mb: 3,
//                                             "& .MuiOutlinedInput-root": {
//                                                 borderRadius: 50,
//                                             },
//                                             "& .MuiInputBase-input": {
//                                                 padding: "10px 15px",
//                                             },
//                                         }}
//                                     />

//                                     <div className="mt-6">
//                                         <MuiButton
//                                             variant="contained"
//                                             size="large"
//                                             color="#0B1A97"
//                                             fullWidth
//                                             type="submit"
//                                             disabled={isSubmitting}
//                                             sx={{
//                                                 "&:hover": {
//                                                     backgroundColor: "#fff",  
//                                                     color: "#0B1A97",                
//                                                     borderColor: "#0B1A97",       
//                                                 },
//                                             }}
//                                         >
//                                             {isSubmitting ? "Sending..." : "Send Link"}
//                                         </MuiButton>
//                                     </div>
//                                 </Form>
//                             )}
//                         </Formik>
//                     </>
//                 ) : (
//                     <Box textAlign="center">
//                         <CheckCircleOutlineIcon
//                             sx={{ color: "#4CAF50", fontSize: "50px", mb: 2 }}
//                         />
//                         <Typography
//                             variant="h5"
//                             sx={{
//                                 fontWeight: "bold",
//                                 color: "#1E3A8A",
//                                 mb: 1,
//                                 fontSize: { xs: "1.8rem", sm: "2rem" },
//                             }}
//                         >
//                             Link Sent Successfully!
//                         </Typography>
//                         <Typography
//                             sx={{
//                                 fontSize: { xs: "14px", sm: "15px" },
//                                 color: "#666",
//                                 mb: 3,
//                             }}
//                         >
//                             Please check your email for the password reset link.
//                         </Typography>
//                         <MuiButton
//                             variant="outlined"
//                             size="large"
//                             color="#0B1A97"
//                             fullWidth
//                             onClick={() => setIsLinkSent(false)} 
//                         >
//                             Send Another Link
//                         </MuiButton>

//                         <Typography
//                         sx={{
//                             fontSize: "14px",
//                             color: "#666",
//                             mt: 3,
//                             textAlign: "center",
//                         }}
//                     >
//                         Remember password?{" "}
//                         <Link
//                             href="/"
//                             sx={{
//                                 fontWeight: "bold",
//                                 color: "#1E3A8A",
//                                 textDecoration: "none",
//                             }}
//                         >
//                             Sign in
//                         </Link>
//                     </Typography>
//                     </Box>
//                 )}

//                 {!isLinkSent && (
//                     <Typography
//                         sx={{
//                             fontSize: "14px",
//                             color: "#666",
//                             mt: 3,
//                             textAlign: "center",
//                         }}
//                     >
//                         Remember password?{" "}
//                         <Link
//                             href="/"
//                             sx={{
//                                 fontWeight: "bold",
//                                 color: "#1E3A8A",
//                                 textDecoration: "none",
//                             }}
//                         >
//                             Sign in
//                         </Link>
//                     </Typography>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default ForgotPassword;





import React, { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    Link,
    InputAdornment,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MuiInput from "../../components/input/MuiInput";
import MuiButton from "../../components/button/MuiButton";
import CircleArrowLeft from "../../assets/icons/CircleArrowLeft";
import { apiForgotPassword } from "../../services/AuthenticationAPIs/authenticationService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const initialValues = { email: "" };
    const [isLinkSent, setIsLinkSent] = useState(false);
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });

    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            const payload = { email: values.email };
            const response = await apiForgotPassword(payload);
            console.log("API response:", response);

            setIsLinkSent(true);
            toast.success("Link Sent Successfully!");

            resetForm();
        } catch (error: any) {
            console.error("API error:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: { xs: 2, sm: 3 },
          backgroundColor: "#F5F5F5",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "#fff",
            borderRadius: 3,
            padding: { xs: 3, sm: 4 },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            // textAlign: "center", // Ensure text is centered
          }}
        >
          <IconButton
            sx={{
              mb: 2,
              alignSelf: "flex-start",
              "& svg": { fontSize: { xs: 24, sm: 28 } },
            }}
            onClick={() => navigate("/login")}
          >
            <CircleArrowLeft />
          </IconButton>

          {!isLinkSent ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#1E3A8A",
                  mb: 1,
                  fontSize: { xs: "1.8rem", sm: "2rem" },
                  textAlign: "center",
                }}
              >
                Forgot password?
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  color: "#666",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Don’t worry! It happens. Please enter the email associated with
                your account.
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3, // Space between input and button
                      }}
                    >
                      <Field
                        as={MuiInput}
                        name="email"
                        fullWidth
                        placeholder="Email Address"
                        error={touched.email && Boolean(errors.email)}
                        helperText={<ErrorMessage name="email" />}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlinedIcon sx={{ color: "#666" }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          backgroundColor: "#f5f5f5",
                          borderRadius: 50,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 50,
                          },
                        }}
                      />

                      <MuiButton
                        variant="contained"
                        size="large"
                        color="#0B1A97"
                        fullWidth
                        type="submit"
                        disabled={isSubmitting}
                        sx={{
                          fontSize: { xs: "14px", sm: "16px" },
                          "&:hover": {
                            backgroundColor: "#fff",
                            color: "#0B1A97",
                            borderColor: "#0B1A97",
                          },
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Link"}
                      </MuiButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <Box>
              <CheckCircleOutlineIcon
                sx={{ color: "#4CAF50", fontSize: { xs: 40, sm: 50 }, mb: 2 }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#1E3A8A",
                  mb: 1,
                  fontSize: { xs: "1.6rem", sm: "1.8rem" },
                  textAlign: "center",
                }}
              >
                Link Sent Successfully!
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  color: "#666",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Please check your email for the password reset link.
              </Typography>
              {/* <MuiButton
                            variant="outlined"
                            size="large"
                            color="#0B1A97"
                            fullWidth
                            onClick={() => setIsLinkSent(false)}
                            sx={{
                                fontSize: { xs: "14px", sm: "16px" },
                            }}
                        >
                            Send Another Link
                        </MuiButton> */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3, // Adds some margin at the top for spacing
                }}
              >
                <MuiButton
                  variant="outlined"
                  size="large"
                  color="#0B1A97"
                  onClick={() => setIsLinkSent(false)}
                  sx={{
                    fontSize: { xs: "14px", sm: "16px" },
                  }}
                >
                  Send Another Link
                </MuiButton>
              </Box>
            </Box>
          )}

          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
              mt: 3,
              textAlign: "center",
            }}
          >
            Remember password?{" "}
            <Link
              href="/"
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

export default ForgotPassword;

