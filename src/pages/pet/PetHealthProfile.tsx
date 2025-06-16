import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AgeIcon from '/icons/Age.svg';
import WeightIcon from '/icons/weight-scale-01.svg';
import AddCircleIcon from '/icons/add-circle.svg';
import UploadIcon from '/icons/upload-square-02.svg';
import MedicineIcon from '/icons/medicine-02.svg';
import { CircularProgress, IconButton } from '@mui/material';
import CircleArrowLeft from '../../assets/icons/CircleArrowLeft';
import { toast } from 'react-toastify';
import { getPetById, petRegister, updatePet } from '../../services/PetServicesApi/PetService';
import { useDispatch, useSelector } from 'react-redux';
import { clearPetData } from '../../redux/slice/PetProfileSlice';

const validationSchema = Yup.object({
  age: Yup.string().required('Age is required'),
  weight: Yup.string().required('Weight is required'),
  medications: Yup.array().of(Yup.string()),
  vaccinated: Yup.string().required('Please select an option'),
});

const PetHealthProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const user = useSelector((state: any) => state.auth.user);
  const Id = user?.id;

  const [showInput, setShowInput] = useState(false);
  const [newMedication, setNewMedication] = useState('');
  const [petData, setPetData] = useState<any>({});

  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false); 

  const location = useLocation();
  const petValues = location?.state?.initialValues;

  console.log("Received Initial Values:", petValues);

  console.log("Type", petData)

  const initialValues = {
    age: petData.age || '',
    weight: petData.weight || '',
    vaccinated: petData.vaccineStatus || '',
    medications: petData.currentMedications || [],
    pdf: petData.pdf || null,
    newMedication: '',
  };

  const dispatch = useDispatch()
  
  const handleAddMedicationClick = () => setShowInput(true);

  const handleSaveMedication = (values: any, setFieldValue: any) => {
    if (newMedication.trim()) {
      setFieldValue('medications', [...values.medications, newMedication]);
      setNewMedication('');
      setShowInput(false);
    }
  };

  useEffect(() => {
    const fetchPetData = async () => {

      if (id) {
        try {
          const response = await getPetById(id);
          setPetData(response.data.data);
          setIsEditMode(true);
        } catch (error) {
          toast.error("Failed to fetch pet data");
        }
      }
    };
    fetchPetData();
  }, [id]);

  const handleSubmit = async (values: any) => {
    console.log("Form Data:", values);
    setLoading(true); 

    try {
      
      const formData = new FormData();

      const fields = [
        { key: "name", value: petValues.name || petData.name },
        { key: "type", value: petData.type },
        { key: "ownerId", value: Id || petData.ownerId },
        { key: "breed", value: petValues.breed || petData.breed },
        { key: "color", value: petValues.color || petData.color },
        { key: "gender", value: petValues.gender || petData.gender },
        { key: "about", value: petValues.about || petData.about },
        { key: "neuteredOrSpayed", value: petValues.neuteredOrSpayed || petData.neuteredOrSpayed },
        { key: "rfidChipStatus", value: petValues.rfidChipStatus || petData.rfidChipStatus },
        { key: "age", value: values.age },
        { key: "weight", value: values.weight },
        { key: "vaccineStatus", value: values.vaccinated },
        { key: "currentMedications", value: values.medications || "" },
      ];

      fields.forEach(({ key, value }) => {
        if (value !== undefined) formData.append(key, value);
      });


      const profileImage = petValues.profileImage || petData.image;
      if (profileImage instanceof File) {
        formData.append("image", profileImage);
      } else if (typeof profileImage === "string") {
        try {
          const blob = await (await fetch(profileImage)).blob();
          formData.append("image", blob, "profileImage.png");
        } catch {
          console.error("Failed to convert base64 image to Blob");
        }
      }


      if (values.pdf) {
        formData.append("pdf", values.pdf);
      }

      if (!id) {
        await petRegister(formData);
        dispatch(clearPetData()); 
        toast.success("Profile saved successfully");
      } else {
        await updatePet(id, formData);
        toast.success("Profile updated successfully");
      }

      navigate("/user-dashboard");
    } catch (error) {
      console.error(error);
      // toast.error("Failed to save profile");

      toast.error(isEditMode ? "Failed to update pet." : "Failed to register pet.");
    }finally {
      setLoading(false); 
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => (
        <Form className="w-full max-w-md mx-auto p-6 bg-[#FBF8FF] rounded-lg shadow-md">
          <div className="flex items-center justify-start mb-6 relative">
            <IconButton
              onClick={() => navigate(id ? `/Pet-profile/${id}` : '/Pet-profile')}
              sx={{
                fontSize: '2rem',
                width: '60px',
                height: '60px',
                marginRight: '0.5rem',
              }}
              className="hover:scale-105"
              aria-label="Go back to Pet Profile"
            >
              <CircleArrowLeft />
            </IconButton>
            <h2 className="text-2xl font-bold text-[#1B1B22]">Health Profile</h2>
          </div>

          <h3 className="text-4xl font-bold text-[#0b1A97] mb-2">
            Help us know your pet better
          </h3>
          <p className="text-[#1B1B22] mb-4 mt-6">
            Fill your pet details so that we can provide you with more accurate results.
          </p>

         <div className="mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-1 ml-4">
              Age
            </label>
            <div className="flex items-center border border-[#C4C7C7] bg-[#F6F4FF] rounded-full p-2">
              <img src={AgeIcon} className="p-2" alt="Age Icon" />
              <Field
                type="number"
                name="age"
                className="w-full  bg-transparent outline-none text-[#1B1B22]"
                placeholder="Enter age"
              />

             {values.age && (
                <span
                  className="mr-[67%] sm:mr-[72%] md:mr-[74%] lg:mr-[74%] xl:mr-[72%] text-[#1B1B22] text-sm"
                >
                  Year
                </span>
              )}
         </div>
            <ErrorMessage
              name="age"
              component="div"
              className="text-red-500 text-sm mt-1 ml-4"
            />
          </div>

         <div className="mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-1 ml-4">
              Weight
            </label>
            <div className="flex items-center border border-[#C4C7C7] bg-[#F6F4FF] rounded-full p-2">
              <img src={WeightIcon} className="p-2" alt="Weight Icon" />
              <Field
                type="number"
                name="weight"
                className="w-full bg-transparent outline-none text-[#1B1B22]"
                placeholder="Enter weight"
              />

             {values.weight && (
                <span
                  className="mr-[71%] sm:mr-[72%] md:mr-[76%] lg:mr-[77%] xl:mr-[77%] text-[#1B1B22] text-sm"
                >
                  kg
                </span>
              )}

            </div>
            <ErrorMessage
              name="weight"
              component="div"
              className="text-red-500 text-sm mt-1 ml-4"
            />
          </div>

          <div className="relative w-full mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-1 ml-4">
              Vaccinated
            </label>
            <div className="relative flex w-full">
              <label className="inline-flex items-center border border-[#C4C7C7] rounded-full px-4 py-2 w-1/2 justify-start mr-4 bg-[#F6F4FF]">
                <Field
                  type="radio"
                  name="vaccinated"
                  value="Yes"
                  className="form-radio text-[#0b1A97] ml-1"
                />
                <span className="ml-2 text-[#1B1B22]">Yes</span>
              </label>
              <label className="inline-flex items-center border border-[#C4C7C7] rounded-full px-4 py-2 w-1/2 justify-start ml-2 bg-[#F6F4FF]">
                <Field
                  type="radio"
                  name="vaccinated"
                  value="No"
                  className="form-radio text-[#0b1A97] ml-1"
                />
                <span className="ml-2 text-[#1B1B22]">No</span>
              </label>
            </div>
            <ErrorMessage
              name="vaccinated"
              component="div"
              className="text-red-500 text-sm mt-1 ml-4"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-2 ml-4">Current Medication</label>
            <div className="border border-[#C4C7C7] bg-[#F6F4FF] rounded-xl  p-4">
              {values.medications.map((med, index) => (
                <div key={index} className="flex items-center mb-3">
                  <img src={MedicineIcon} alt="Medicine Icon" className="w-6 h-6 mr-2" />
                  <span className="text-[#1B1B22] font-medium">{med}</span>
                </div>
              ))}
              <hr className="my-3 border-gray-300" />

              {showInput ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Enter medication"
                    className="flex-1 text-[#1B1B22] border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-900"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveMedication(values, setFieldValue)}
                    className="ml-2 text-indigo-900 hover:text-indigo-800 font-medium transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                  <button
                    type="button"
                    onClick={handleAddMedicationClick}
                    className="flex items-center  text-[#0b1A97] hover:text-indigo-800 font-medium transition"
                  >
                    <img
                      src={AddCircleIcon}
                      alt="Add Medication Icon"
                      className="w-5 h-5 mr-2"
                    />
                    Add Current Medication
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1B1B22] mb-1 ml-4">
              Health Records
            </label>
            <div className="border-dashed border-2 border-[#0b1A97] bg-[#F6F4FF] rounded-lg p-4 flex items-center justify-center">
              <label className="text-[#0b1A97] cursor-pointer flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFieldValue('pdf', file);
                  }}
                />
                <img src={UploadIcon} alt="Upload Icon" className="w-5 h-5" />
                {values.pdf
                  ? values?.pdf?.name
                  : 'Choose PDF file to upload'}
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-[#0b1A97] text-white rounded-full hover:bg-indigo-800 mb-8"
              disabled={loading} 
            >
              

              {loading ? (
                <CircularProgress size={24} color="inherit" /> 
              ) : (
                isEditMode ? "Update Changes" : "Save Changes"
              )}
            
            </button>
         </div>
        </Form>
      )}
    </Formik>
  );
};

export default PetHealthProfile;
