import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import UserIcon from "/icons/user.svg";
import PhoneIcon from "/icons/smart-phone-01.svg";
import MailIcon from "/icons/mail-01.svg";
import CalenderIcon from "/icons/calendar-02.svg";
import Google from "../../../assets/icons/Google";
import Apple from "../../../assets/icons/Apple";
import FaceBook from "../../../assets/icons/FaceBook";
import DatePicker from "react-datepicker";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Badge, CircularProgress, IconButton } from "@mui/material";
import CircleArrowLeft from "../../../assets/icons/CircleArrowLeft";
import CameraIcon from "/icons/camera-01.svg";
import logo from "/icons/settings-02.svg";
import { useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Profilelogo from "/assets/images/user/user-03.png";
import UserImage from "/assets/images/user/profileIcon.png";
import {
  getUserProfileById,
  updateUserProfile,
  uploadUserProfileImage,
} from "../../../services/UserProfileApi/UserProfileService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setProfile } from "../../../redux/slice/UserProfileSlice";
import { SetUserData } from "../../../redux/slice/AuthSlice";
import "react-datepicker/dist/react-datepicker.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const id = user?.email;
  const [userData, setUserData] = useState<any>();
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isGeneralSettingsOpen, setIsGeneralSettingsOpen] = useState(false);

  const faqRef = useRef(null);
  const subscriptionRef = useRef(null);
  const generalSettingsRef = useRef(null);

  const [profileImage, setProfileImage] = useState(Profilelogo);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  const userProfile = useSelector((state: any) => state?.userProfile?.profile);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Full Name must be at least 3 characters")
      .required("Full Name is required"),
    phoneNumber: Yup.number()
      // .matches(/^\+?[0-9\s-]+$/, "Enter a valid phone number")
      .typeError("Phone Number must be a number")
      .required("Phone Number is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      // toast.error("Please select an image first");
      return;
    }
    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    try {
      const response = await uploadUserProfileImage(
        userData?.email,
        formData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      // setUserData(response.data.fileUrl);
      setUserData({
        ...userData,
        profileImage: response?.data?.fileUrl,
      });
      dispatch(
        SetUserData({
          ...user,
          profileImage: response?.data?.fileUrl,
        })
      );
      // setProfile({
      //   ...userData,
      //   profileImage: response?.data?.fileUrl
      // })

      // const setData = ({

      //   profileImage: response?.data?.fileUrl
      // })

      // dispatch(updateProfileImage(setData))
      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload profile image");
    }
  };

  console.log("UserData", userData);
  useEffect(() => {
    handleUpload();
  }, [selectedFile]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await getUserProfileById(id);
          setUserData(response?.data?.data);
          // setProfile(response?.data?.data)
        } catch (error) {
          toast.error("Failed to fetch User data");
        }
      }
    };
    fetchUserData();
  }, [id]);

  const handleSubmit = async (values: any) => {
    console.log("Form Data:", values);
    setLoading(true);

    try {
      const payload = {
        email: values.email,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        dob: values.dateOfBirth,
        gender: values.gender,
        profileImage: user.profileImage,
      };

      const res = await updateUserProfile(payload);
      if (res?.status == 200) {
        dispatch(
          setProfile({
            ...userProfile,
            ...payload,
          })
        );
        dispatch(
          SetUserData({
            ...user,
            ...payload,
          })
        );
      }
      toast.success("Profile save successfully");
      navigate("/My-profile");
    } catch (error) {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (faqRef.current && !faqRef.current.contains(event.target)) {
        setIsFAQOpen(false);
      }
      if (
        subscriptionRef.current &&
        !subscriptionRef.current.contains(event.target)
      ) {
        setIsSubscriptionOpen(false);
      }
      if (
        generalSettingsRef.current &&
        !generalSettingsRef.current.contains(event.target)
      ) {
        setIsGeneralSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-[800px]  items-center justify-center p-4 relative bg-[#FBF8FF] mb-16">
      <IconButton
        onClick={() => {
          isTablet
            ? navigate(`/My-profile/${id}`, {
                state: { initialValues: { userData } },
              })
            : navigate("/Profile-edit");
        }}
        sx={{
          position: "absolute",
          top: "0.025rem",
          left: "0.1rem",
          fontSize: "8rem",
          width: "80px",
          height: "80px",
        }}
        className="hover:scale-105"
      >
        <CircleArrowLeft />
      </IconButton>

      <div className="">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 -mt-2 text-center  ">
            <h1 className=" text-2xl mt-4 font-bold">Edit Profile</h1>
            <Badge
              overlap="circular"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "200px",
                height: "200px",
                margin: "0 auto",
              }}
            >
              {/* <div className="w-[200px] h-[200px] overflow-hidden rounded-full" style={{ position: "relative" }}>
                <img
                  src={userData?.profileImage || UserImage}
                  alt="Profile"
                  className=" transition-transform duration-300 hover:scale-105"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    width: "100%",
                    maxHeight: "200px",
                  }}
                />
                   </div> */}

              <div
                className={`w-[200px] h-[200px] overflow-hidden rounded-full mt-10 flex items-center justify-center ${
                  !userData?.profileImage
                    ? "bg-white border border-[#C4C7C7] "
                    : ""
                }`}
                style={{ position: "relative" }}
              >
                {userData?.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="transition-transform duration-300 hover:scale-105"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      width: "100%",
                      maxHeight: "200px",
                    }}
                  />
                ) : (
                  <span className="text-[#0b1A97] text-lg font-medium font-serif">
                    Add UserImage
                  </span>
                )}
              </div>

              <IconButton
                style={{
                  position: "absolute",
                  bottom: "14px",
                  right: "-6px",
                  backgroundColor: "#0b1A97",
                  borderRadius: "50%",
                }}
                component="label"
              >
                <img
                  src={CameraIcon}
                  alt="Camera"
                  style={{ width: "2rem", height: "auto" }}
                />

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </IconButton>
            </Badge>
            {/* {selectedFile && (
              <button
                onClick={handleUpload}
                className="bg-[#0b1A97] text-white px-4 py-2 rounded-full mt-4"
              >
                Upload Image
              </button>
            )} */}

            <div
              className={`mt-8 ml-12 ${
                !isTablet ? "block" : "hidden md:block"
              }`}
            >
              <div className="flex flex-wrap gap-3 justify-center ">
                <div className="flex flex-col items-center space-y-1">
                  {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
                    <Google />
                  </button> */}
                  <h1 className="text-xl">{user?.loginBy}</h1>
                  {/* {user?.emailVerified ? (
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-full text-[10px] hover:bg-yellow-600 transition-colors duration-300">
                      Unlink-
                    </button>
                  ) : (
                    <button className="bg-[#0b1A97] text-white px-3 py-1 rounded-full text-[10px] hover:bg-blue-900 transition-colors duration-300">
                      Connect
                    </button>
                  )} */}
                </div>
                {/* <div className="flex flex-col items-center space-y-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
                    <FaceBook />
                  </button>
                  <h1 className="text-xs">Facebook</h1>
                  {user?.facebookLinked ? (
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-full text-[10px] hover:bg-yellow-600 transition-colors duration-300">
                      Unlink-
                    </button>
                  ) : (
                    <button className="bg-[#0b1A97] text-white px-3 py-1 rounded-full text-[10px] hover:bg-blue-900 transition-colors duration-300">
                      Connect
                    </button>
                  )}
                </div> */}
                {/* <div className="flex flex-col items-center space-y-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
                    <Apple />
                  </button>
                  <h1 className="text-xs">Apple</h1>
                  <button className="bg-[#0b1A97] text-white px-3 py-1 rounded-full text-[10px] hover:bg-blue-900 transition-colors duration-300">
                    Connect
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <div className="md:w-2/3 md:pl-8 mt-16">
            {!isTablet && (
              <>
                <h1 className="text-2xl font-semibold text-[#0b1A97] dark:text-black mb-2">
                  {/* John Doe : */}
                </h1>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => setIsFAQOpen(!isFAQOpen)}
                    className="bg-white text-[#0b1A97] border border-[#C4C7C7] px-4 py-2 rounded-full hover:bg-[#F6F4FF] focus:outline-none mb-8 relative"
                  >
                    FAQ
                  </button>

                  {isFAQOpen && (
                    <div
                      ref={faqRef}
                      className="absolute bg-white border border-[#C4C7C7] shadow-lg p-3 mt-14 rounded-lg z-10"
                      style={{ minWidth: "200px", left: "48%" }}
                    >
                      <ul className="text-indigo-900">
                        <li>FAQ list</li>
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => setIsSubscriptionOpen(!isSubscriptionOpen)}
                    className="bg-white text-[#0b1A97] border border-[#C4C7C7] px-4 py-2 rounded-full hover:bg-[#F6F4FF] focus:outline-none mb-8 relative"
                  >
                    My Subscription
                  </button>

                  {isSubscriptionOpen && (
                    <div
                      ref={subscriptionRef}
                      className="absolute bg-white border border-[#C4C7C7] shadow-lg p-3 mt-20  rounded-lg z-10"
                      style={{ minWidth: "200px", left: "60%" }}
                    >
                      <ul className="text-indigo-900">
                        <li>Tier List</li>
                        <li>Payment Method</li>
                      </ul>
                    </div>
                  )}

                  <img
                    src={logo}
                    className="mb-8 cursor-pointer "
                    alt="Logo"
                    onClick={() =>
                      setIsGeneralSettingsOpen(!isGeneralSettingsOpen)
                    }
                  />

                  {isGeneralSettingsOpen && (
                    <div
                      ref={generalSettingsRef}
                      className="absolute bg-white border border-[#C4C7C7] shadow-lg p-3 mt-10 rounded-lg z-10"
                      style={{ minWidth: "200px", left: "70%" }}
                    >
                      <ul className="text-indigo-900">
                        <li>General App Settings</li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}

            <Formik
              initialValues={{
                fullName: userData?.fullName || "",
                phoneNumber: userData?.phoneNumber || "",
                email: userData?.email || "",
                dateOfBirth: userData?.dob ? new Date(userData.dob) : null,
                gender: userData?.gender || "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => (
                <Form className="space-y-4">
                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Full Name
                    </label>

                    <div className="relative">
                      <img
                        src={UserIcon}
                        alt="User Icon"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Field
                        name="fullName"
                        type="text"
                        className="w-full border rounded-full p-2 pl-10 border-[#C4C7C7]  bg-[#F6F4FF]"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>

                    {touched.fullName && errors.fullName && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Phone Number
                    </label>
                    <div className="relative border flex items-center border-[#C4C7C7]  bg-[#F6F4FF] rounded-full">
                      <img
                        src={PhoneIcon}
                        alt="Phone Icon"
                        className="relative left-3 top-2.5 transform -translate-y-1/2 w-5 h-5"
                      />
                      <PhoneInput
                        country={"us"}
                        value={values.phoneNumber}
                        onChange={(phone) =>
                          setFieldValue("phoneNumber", phone)
                        }
                        inputStyle={{
                          width: "100%",
                          border: "none",
                          backgroundColor: "transparent",
                          marginLeft: "12px",
                        }}
                        buttonStyle={{
                          border: "none",
                          backgroundColor: "transparent",
                          marginLeft: "14px",
                        }}
                      />
                    </div>
                    {touched.phoneNumber && errors.phoneNumber && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Email Address
                    </label>

                    <div className="relative">
                      <img
                        src={MailIcon}
                        alt="Mail Icon"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />

                      <Field
                        name="email"
                        type="email"
                        className="w-full border rounded-full p-2 pl-10 border-[#C4C7C7]  bg-[#F6F4FF]"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Date of Birth
                    </label>
                    <div className="relative w-full border border-[#C4C7C7] bg-[#F6F4FF] rounded-full">
                      <img
                        src={CalenderIcon}
                        alt="Calender Icon"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
                      />
                      <DatePicker
                        selected={values.dateOfBirth}
                        onChange={(date) => setFieldValue("dateOfBirth", date)} // Update Formik value
                        onBlur={handleBlur}
                        className="w-full ml-8 p-2 z-20 focus:outline-none bg-[#F6F4FF]"
                        dateFormat="dd-MM-yyyy"
                        placeholderText="Select your date of birth"
                        popperPlacement="bottom-end"
                        popperClassName="calender-tray" 
                      />
                    </div>
                    {touched.dateOfBirth && errors.dateOfBirth && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Gender
                    </label>
                    <div className=" w-full border rounded-full p-2 flex items-center space-x-4 border-[#C4C7C7]  bg-[#F6F4FF]">
                      <label className="inline-flex items-center ">
                        <Field
                          type="radio"
                          name="gender"
                          value="Male"
                          className="form-radio text-[#0b1A97] ml-2"
                          checked={values.gender === "Male"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="ml-2 text-gray-700">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                        <Field
                          type="radio"
                          name="gender"
                          value="Female"
                          className="form-radio text-[#0b1A97] ml-2"
                          checked={values.gender === "Female"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="ml-2 text-gray-700">Female</span>
                      </label>
                      <label className="inline-flex items-center">
                        <Field
                          type="radio"
                          name="gender"
                          value="Not Specified"
                          className="form-radio text-[#0b1A97] ml-2"
                          checked={values.gender === "Not Specified"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <span className="ml-2 text-gray-700">
                          Not Specified
                        </span>
                      </label>
                    </div>
                    {touched.gender && errors.gender && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="bg-[#0b1A97] text-white px-6 py-3 mt-5 rounded-full hover:bg-blue-800 transition duration-300 w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
