import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PlusIcon from '/icons/plus-sign.svg';
import MedicineIcon from '/icons/medicine-02.svg';
import { IconButton } from '@mui/material';
import CircleArrowLeft from '../../assets/icons/CircleArrowLeft';

const validationSchema = Yup.object({
  age: Yup.string().required('Age is required'),
  weight: Yup.string().required('Weight is required'),
  medications: Yup.array().of(Yup.string()),
  vaccinated: Yup.string().required('Please select an option'),
});

const SmartJournal = () => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [newMedication, setNewMedication] = useState('');

  const initialValues = {
    age: '',
    weight: '',
    vaccinated: '',
    medications: [],
    healthRecord: null,
    newMedication: '',
  };

  const handleAddMedicationClick = () => setShowInput(true);

  const handleSaveMedication = (values: any, setFieldValue: any) => {
    if (newMedication.trim()) {
      setFieldValue('medications', [...values.medications, newMedication]);
      setNewMedication('');
      setShowInput(false);
    }
  };

  const handleSubmit = (values: any) => {
    console.log('Form Data:', values);
  
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => (
        <Form className="w-full max-w-md mx-auto p-6 bg-[#FBF8FF] rounded-lg shadow-md">
          {/* Header */}
          <div className="flex items-center justify-start mb-6 relative">
            <IconButton
              onClick={() => navigate("/Journal-register")}
              sx={{
                fontSize: "2rem",
                width: "60px",
                height: "60px",
                marginRight: "0.5rem",
              }}
              className="hover:scale-105"
              aria-label="Go back to Pet Profile"
            >
              <CircleArrowLeft />
            </IconButton>
            <h2 className="text-2xl text-[#1B1B22] font-bold">Smart Journal</h2>
          </div>

          <h3 className="text-2xl sm:text-4xl md:text-3xl font-bold text-[#0b1A97] mb-2">
            <span className="block">Help us understand</span>
            <span className="block">Maximilian better!</span>
          </h3>

          <p className="text-[#1B1B22] mb-4 mt-6">
            Help us check and update if there are any changes to the following:
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-1 ml-4">
              Energy Level
            </label>
            <div className="flex items-center border border-[#C4C7C7] bg-[#F6F4FF] rounded-full p-2">
              <Field
                type="text"
                name="age"
                className="w-full bg-transparent outline-none ml-2"
                placeholder=""
              />
            </div>
            {/* <ErrorMessage
              name="age"
              component="div"
              className="text-red-500 text-sm mt-1 ml-4"
            /> */}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-1 ml-4">
              Appetite and Eating Habits
            </label>
            <div className="flex items-center border border-[#C4C7C7] bg-[#F6F4FF] rounded-full p-2">
              <Field
                type="text"
                name="appetiteAndEatingHabits"
                className="w-full bg-transparent outline-none ml-2"
                placeholder=""
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-1 ml-4">
              Water Intake
            </label>
            <div className="flex items-center border border-[#C4C7C7] bg-[#F6F4FF] rounded-full p-2">
              <Field
                type="text"
                name="waterIntake"
                className="w-full bg-transparent outline-none ml-2"
                placeholder=""
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-1 ml-4">
              Bathroom Habits
            </label>
            <div className="flex items-center border border-[#C4C7C7] bg-[#F6F4FF] rounded-lg p-2">
              <Field
                type="text"
                name="bathroomHabits"
                className="w-full bg-transparent outline-none ml-2"
                placeholder=""
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1B1B22] mb-2 ml-4">
              Additional Remarks
            </label>
            <div className="  bg-white rounded-full shadow-sm  p-3">
              {values.medications.map((med, index) => (
                <div key={index} className="flex items-center mb-3">
                  <img
                    src={MedicineIcon}
                    alt="Medicine Icon"
                    className="w-6 h-6 mr-2"
                  />
                  <span className="text-[#1B1B22] font-medium">{med}</span>
                </div>
              ))}

              {showInput ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Enter remarks"
                    className="flex-1   rounded-md px-3 bg-[#F6F4FF] py-1 focus:outline-none focus:ring-1 focus:ring-indigo-900"
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
                <div className="flex ml-2">
                  <button
                    type="button"
                    onClick={handleAddMedicationClick}
                    className="flex items-center  text-[#797776]  font-medium transition"
                  >
                    <img
                      src={PlusIcon}
                      alt="Add Medication Icon"
                      className="w-5 h-5 mr-2"
                    />
                    Remarks
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-[#0b1A97] text-white rounded-full hover:bg-indigo-800 mb-8"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/Pet-profile")}
              className="text-[#0b1A97] hover:text-indigo-800 transition"
            >
              Skip for now
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SmartJournal;
