import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import PetNameIcon from "/icons/pet name.svg";
import PetIcon from "/icons/pet.svg";
import CameraIcon from "/icons/camera-01.svg";
import PetColorIcon from "/icons/colors.png";
import RFIDIcon from "/icons/RFID.svg";
import logo from "/assets/images/pets/Cat.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconButton } from "@mui/material";
import CircleArrowLeft from "../../assets/icons/CircleArrowLeft";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPetById } from "../../services/PetServicesApi/PetService";
import { useDispatch, useSelector } from "react-redux";
import { setPetData } from "../../redux/slice/PetProfileSlice";

const PetProfile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams()
  console.log('PetId', id)
  // const [petData, setPetData] = useState<any>({});
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(logo);
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  const dispatch = useDispatch();
  const petDataFromRedux = useSelector((state : any) => state.petProfile.petData);
  const [petData, setPetDataState] = useState<any>(petDataFromRedux);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Pet Name must be at least 3 characters")
      .required("Pet Name is required"),
    breed: Yup.string().required("Breed is required"),
    color: Yup.string().required("Color is required"),
    gender: Yup.string().required("Gender is required"),
    about: Yup.string().required("About is required"),
    neuteredOrSpayed: Yup.string().required("This field is required"),
    rfidChipStatus: Yup.string().required("RFID No. is required"),
  });

  // useEffect(() => {
  //   const fetchPetData = async () => {
  //     if (id) {
  //       try {
  //         const response = await getPetById(id);
  //         setPetData(response?.data?.data);
  //         setProfileImage(response?.data?.data?.image)
  //       } catch (error) {
  //         toast.error("Failed to fetch pet data");
  //       }
  //     }
  //   };
  //   fetchPetData();
  // }, [id]);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setProfileImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSubmit = (values: any) => {

  //   console.log("Form Data:", values);
  //   navigate(id ? `/Pet-Health/${id}` : "/Pet-Health", { state: { initialValues: { ...values, profileImage } } });
  // };



  useEffect(() => {
    const fetchPetData = async () => {
      if (id) {
        try {
          const response = await getPetById(id);
          setPetDataState(response?.data?.data);
          setProfileImage(response?.data?.data?.image);
          dispatch(setPetData(response?.data?.data)); 
        } catch (error) {
          toast.error("Failed to fetch pet data");
        }
      }
    };
    fetchPetData();
  }, [id, dispatch]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        dispatch(setPetData({ ...petData, profileImage: reader.result })); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: any) => {
    console.log("Form Data:", values);
    dispatch(setPetData({ ...values, profileImage })); 
    navigate(id ? `/Pet-Health/${id}` : "/Pet-Health", { state: { initialValues: { ...values, profileImage } } });
  };

  return (
    <div className="min-h-[800px] items-center justify-center p-4 relative bg-[#FBF8FF] mb-16">
      <IconButton
        onClick={() => navigate(id ? `/Pet-Details/${id}` : "/user-dashboard")}
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

      <div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 -mt-2 text-center ">
            <h1 className=" text-2xl mt-4 font-bold">Pet Profile</h1>

            <div className="relative mx-auto mt-10" style={{ width: "200px" }}>
              <img
                src={
                  typeof profileImage === "string"
                    ? profileImage
                    : petData?.image
                }
                alt="Profile"
                className="rounded-full mx-auto transition-transform duration-300 hover:scale-105"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <label
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "14px",
                  backgroundColor: "#FBF8FF",
                  border:"1px solid black",
                  borderRadius: "50%",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={CameraIcon}
                  alt="Camera"
                  style={{
                    width: "1rem",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="md:w-2/3 md:pl-8 mt-10">
            <Formik
              // initialValues={{
              //   name: petData?.name || "",
              //   breed: petData?.breed || "",
              //   color: petData?.color || "",
              //   gender: petData?.gender || "",
              //   about: petData?.about || "",
              //   neuteredOrSpayed: petData?.neuteredOrSpayed || "",
              //   rfidChipStatus: petData?.rfidChipStatus || "",
              // }}

              initialValues={{
                name: petData?.name || petDataFromRedux?.name || "",
                breed: petData?.breed || petDataFromRedux?.breed || "",
                color: petData?.color || petDataFromRedux?.color || "",
                gender: petData?.gender || petDataFromRedux?.gender || "",
                about: petData?.about || petDataFromRedux?.about || "",
                neuteredOrSpayed:
                  petData?.neuteredOrSpayed ||
                  petDataFromRedux?.neuteredOrSpayed ||
                  "",
                rfidChipStatus:
                  petData?.rfidChipStatus ||
                  petDataFromRedux?.rfidChipStatus ||
                  "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ values, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Pet Name
                    </label>
                    <div className="relative">
                      <img
                        src={PetNameIcon}
                        alt="Pet Name Icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Field
                        name="name"
                        type="text"
                        className="w-full border border-[#C4C7C7] bg-[#F6F4FF] rounded-full p-2 pl-10"
                        value={values?.name}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-sm ml-4">{errors.name}</p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Breed
                    </label>
                    <div className="relative">
                      <img
                        src={PetIcon}
                        alt="Breed Icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Field
                        name="breed"
                        type="text"
                        className="w-full border border-[#C4C7C7] rounded-full p-2 pl-10 bg-[#F6F4FF]"
                        value={values?.breed}
                      />
                    </div>
                    {touched.breed && errors.breed && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.breed}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Color
                    </label>
                    <div className="relative">
                      <img
                        src={PetColorIcon}
                        alt="PetColor Icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Field
                        name="color"
                        type="text"
                        className="w-full border border-[#C4C7C7] rounded-full p-2 pl-10 bg-[#F6F4FF]"
                        value={values?.color}
                      />
                    </div>
                    {touched.color && errors.color && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.color}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Gender
                    </label>
                    <div className="relative flex w-full">
                      <label className="inline-flex items-center border border-[#C4C7C7] rounded-full px-4 py-2 w-1/2 justify-start mr-4 bg-[#F6F4FF]">
                        <Field
                          type="radio"
                          name="gender"
                          className="form-radio text-[#0b1A97] ml-1"
                          value="Male"
                          checked={values?.gender === "Male"}
                        />
                        <span className="ml-2 text-gray-700">Male</span>
                      </label>
                      <label className="inline-flex items-center border border-[#C4C7C7] rounded-full px-4 py-2 w-1/2 justify-start ml-2 bg-[#F6F4FF]">
                        <Field
                          type="radio"
                          name="gender"
                          className="form-radio text-[#0b1A97] ml-1"
                          value="Female"
                          checked={values?.gender === "Female"}
                        />
                        <span className="ml-2 text-gray-700">Female</span>
                      </label>
                    </div>
                    {touched.gender && errors.gender && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      About
                    </label>
                    <div className="relative">
                      <Field
                        name="about"
                        placeholder="Write about..."
                        className="w-full border border-[#C4C7C7] rounded-xl p-4 bg-[#F6F4FF] resize-none"
                        style={{ height: "112px" }}
                        value={values?.about}
                      ></Field>
                    </div>
                    {touched.about && errors.about && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.about}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      Neutered/Spayed
                    </label>
                    <div className="relative flex w-full">
                      <label className="inline-flex items-center border border-[#C4C7C7] rounded-full px-4 py-2 w-1/2 justify-start mr-4 bg-[#F6F4FF]">
                        <Field
                          type="radio"
                          name="neuteredOrSpayed"
                          className="form-radio text-[#0b1A97] ml-1"
                          value="Yes"
                          checked={values?.neuteredOrSpayed === "Yes"}
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center border border-[#C4C7C7] rounded-full px-4 py-2 w-1/2 justify-start ml-2 bg-[#F6F4FF]">
                        <Field
                          type="radio"
                          name="neuteredOrSpayed"
                          className="form-radio text-[#0b1A97] ml-1"
                          value="No"
                          checked={values?.neuteredOrSpayed === "No"}
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                    {touched.neuteredOrSpayed && errors.neuteredOrSpayed && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.neuteredOrSpayed}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-4">
                      RFID Number
                    </label>
                    <div className="relative">
                      <img
                        src={RFIDIcon}
                        alt="RFID Icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      />
                      <Field
                        name="rfidChipStatus"
                        type="text"
                        className="w-full border border-[#C4C7C7] rounded-full p-2 pl-10 bg-[#F6F4FF]"
                        value={values?.rfidChipStatus}
                      />
                    </div>
                    {touched.rfidChipStatus && errors.rfidChipStatus && (
                      <p className="text-red-500 text-sm ml-4">
                        {errors.rfidChipStatus}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-[#0b1A97] text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300 w-full"
                  >
                    Continue
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;



