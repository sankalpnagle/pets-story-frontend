import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getPetById, petRegister, updatePet } from "../../services/PetServicesApi/PetService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const PetRegister = () => {
  const user = useSelector((state: any) => state.auth.user);
  const Id = user?.id;
  const navigate = useNavigate();
  const { id } = useParams();

  const [petData, setPetData] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false); 

  const validationSchema = Yup.object({
    name: Yup.string().required("Pet Name is required"),
    type: Yup.string().required("Type is required"),
    breed: Yup.string().required("Breed is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number")
      .integer("Age must be an integer"),
    weight: Yup.number()
      .required("Weight is required")
      .positive("Weight must be a positive number"),
  });

  useEffect(() => {
    const fetchPetData = async () => {
      if (id) {
        try {
          const response = await getPetById(id);
          setPetData(response.data);
          console.log('petData', petData)
          setIsEditMode(true);
        } catch (error) {
          toast.error("Failed to fetch pet data");
        }
      }
    };
    fetchPetData();
  }, [id]);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true); 
    try {
      debugger
      if (id) {
        await updatePet(id, values);
        toast.success("Pet updated successfully!");
      } else {
        await petRegister(values);
        toast.success("Pet registered successfully!");
      }
      navigate("/pet-list");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      debugger
      toast.error(isEditMode ? "Failed to update pet." : "Failed to register pet.");
    } finally {
      setLoading(false); 
    }
  };

  const formik = useFormik({
    initialValues: {
      name: petData?.data?.name || "",
      type: petData?.data?.type || "",
      breed: petData?.data?.breed || "",
      age: petData?.data?.age || "",
      weight: petData?.data?.weight || "",
      ownerId: petData?.data?.id || Id || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center bg-slate-50 justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white p-5 rounded-lg">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Pet Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Pet Name"
              className={`w-full rounded-md border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-x-3">
            <div className="mb-5">
              <label
                htmlFor="type"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Type
              </label>
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Type (e.g., Dog, Cat)"
                className={`w-full rounded-md border ${
                  formik.touched.type && formik.errors.type
                    ? "border-red-500"
                    : "border-[#e0e0e0]"
                } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.type && formik.errors.type && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.type}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="breed"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Breed
              </label>
              <input
                type="text"
                name="breed"
                id="breed"
                placeholder="Breed"
                className={`w-full rounded-md border ${
                  formik.touched.breed && formik.errors.breed
                    ? "border-red-500"
                    : "border-[#e0e0e0]"
                } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                value={formik.values.breed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.breed && formik.errors.breed && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.breed}</p>
              )}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-3">
            <div className="mb-5">
              <label
                htmlFor="age"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Age (in years)"
                className={`w-full rounded-md border ${
                  formik.touched.age && formik.errors.age
                    ? "border-red-500"
                    : "border-[#e0e0e0]"
                } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.age}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="weight"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Weight
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight (in kg)"
                className={`w-full rounded-md border ${
                  formik.touched.weight && formik.errors.weight
                    ? "border-red-500"
                    : "border-[#e0e0e0]"
                } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.weight && formik.errors.weight && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.weight}</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-[#0288d1] hover:bg-[#236f99] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              disabled={loading} 
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" /> 
              ) : (
                isEditMode ? "Update Pet" : "Register Pet"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetRegister;

