// import React from "react";
// import { Box, Typography, Button, Input as MuiInput } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import MuiButton from "../../components/button/MuiButton";
// import { useNavigate } from "react-router-dom";
// import PasswordIcon from "/icons/PasswordIcon.png";

// function PasswordChanged() {
//     const navigate = useNavigate()
//     const initialValues = {
//         username: "",
//     };

//   const validationSchema = Yup.object({
//         username: Yup.string().required("Email is required."),
//     });

//    const handleSubmit = (values: any) => {
//         console.log("Form submitted with values:", values);

//         window.location.href = "/signin";
//     };

//     return (
//         <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//         >
//             {({ }) => (
//                 <Form>
//                     <Box
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             minHeight: "100vh",
//                             backgroundColor: "#f5f5ff",
//                             padding: { xs: 2, sm: 3 },
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 width: "100%",
//                                 maxWidth: 400,
//                                 backgroundColor: "#fff",
//                                 borderRadius: 3,
//                                 padding: { xs: 3, sm: 4 },
//                                 boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//                             }}
//                         >

//                             <Box
//                                 sx={{
//                                     width: 100,
//                                     height: 100,
//                                     borderRadius: "50%",
//                                     margin: "0 auto 24px",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                 }}
//                             >
                               

//                                 <img src={PasswordIcon}/>
//                             </Box>


//                             <Typography
//                                 variant="h5"
//                                 sx={{
//                                     fontSize: { xs: "1.8rem", sm: "2rem" },
//                                     fontWeight: "bold",
//                                     color: "#0019b6",
//                                     marginBottom: 1,
                                    
//                                 }}
//                             >
//                                 Password Changed
//                             </Typography>


//                             <Typography
//                                 sx={{
//                                     fontSize: { xs: "14px", sm: "15px" },
//                                     color: "#666",
//                                     marginBottom: 12,
//                                 }}
//                             >
//                                 Your password has been changed successfully.
//                             </Typography>

                           
//                             <div className="mt-6">

//                                 <MuiButton
//                                     onClick={() => navigate('/')}
//                                     variant="contained"
//                                     size="large"
//                                     color="#0B1A97"
//                                     fullWidth
//                                     type="submit"
//                                 // disabled={isSubmitting} 
//                                 >
//                                     Sign In
//                                 </MuiButton>
//                             </div>
//                         </Box>
//                     </Box>
//                 </Form>
//             )}
//         </Formik>
//     );
// }

// export default PasswordChanged;



import React from "react";
import { Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiButton from "../../components/button/MuiButton";
import { useNavigate } from "react-router-dom";
import PasswordIcon from "/icons/PasswordIcon.png";

function PasswordChanged() {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Email is required."),
    });

    const handleSubmit = (values) => {
        console.log("Form submitted with values:", values);
        window.location.href = "/signin";
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "100vh",
                            backgroundColor: "#f5f5ff",
                            padding: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                maxWidth: 400,
                                backgroundColor: "#fff",
                                borderRadius: 3,
                                padding: 4,
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 2,
                                }}
                            >
                                <img src={PasswordIcon} alt="Password Icon" />
                            </Box>

                            <Typography
                                variant="h5"
                                sx={{
                                    fontSize: { xs: "1.8rem", sm: "2rem" },
                                    fontWeight: "bold",
                                    color: "#0019b6",
                                }}
                            >
                                Password Changed
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: { xs: "14px", sm: "15px" },
                                    color: "#666",
                                }}
                            >
                                Your password has been changed successfully.
                            </Typography>

                            <MuiButton
                                onClick={() => navigate("/")}
                                variant="contained"
                                size="large"
                                fullWidth
                                type="button"
                                sx={{
                                    backgroundColor: "#0B1A97",
                                    "&:hover": {
                                        backgroundColor: "#0019b6",
                                    },
                                }}
                            >
                                Sign In
                            </MuiButton>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default PasswordChanged;
