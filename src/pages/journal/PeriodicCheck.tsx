import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import DailyObservationFirst from "./DailyObservationFirst";
import DailyObservationSecond from "./DailyObservationSecond";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PeriodicCheckFirst from "./PeriodicCheckFirst";
import PeriodicCheckSecond from "./PeriodicCheckSecond";
import {
  addSmartJournals,
  getComprehensiveQuestions,
  getJournalByUserId,
  updateComprehensiveDefaultValues,
  updateSmartJournal,
} from "../../services/SmartJournalApi/SmartJournalServices";
import { toast } from "react-toastify";

const PeriodicCheck = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultValue, setDefaultValue] = useState(false);

  const { id, journalId } = useParams();

  console.log("petId", id);

  console.log("journalId", journalId);

  const user = useSelector((state: any) => state.auth.user);
  const userId = user?.id;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getComprehensiveQuestions();
        const { data } = response.data;
        setQuestions(data);
        initializeFormData(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    return () => {};
  }, []);

  const initializeFormData = (questions) => {
    const initialData = {};
    questions.forEach((q) => {
      if (q.type === "slider") {
        // initialData[q.id] =  q.options[0];
        // initialData[q.id] =  "";

        initialData[q.id] = q.defaultValue;
      } else if (q.type === "boolean") {
        // initialData[q.id] =  null;
        initialData[q.id] = q.defaultValue;
      } else if (q.type === "text") {
        initialData[q.id] = "";
      }
    });
    setFormData(initialData);
  };

  const journalDate = localStorage?.getItem("journalDate");
  const journalType = localStorage?.getItem("journalType");
  console.log("journalDate", journalDate);

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (journalId) {
        try {
          const payload = { userId };
          const response = await getJournalByUserId(journalId, payload);
          const journalData = response?.data?.data;

          if (journalData) {
            const transformedData = journalData.responses.reduce(
              (acc, item) => {
                acc[item.questionId] = item.response;
                return acc;
              },
              {}
            );

            console.log("transformedData", transformedData);
            setFormData((prevData) => ({
              ...prevData,
              ...transformedData,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch journal data:", error);
          toast.error("Failed to fetch journal data");
        }
      }
    };

    fetchUserData();
  }, [journalId, userId, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filteredResponses = questions
      .filter(
        (question) =>
          question.id &&
          formData[question.id] !== null &&
          formData[question.id] !== ""
      )
      .map((question) => ({
        questionId: question.id,
        response: formData[question.id],
      }));

    const DefaultQuestions = questions
      .filter(
        (question) =>
          question.firebaseId &&
          formData[question.firebaseId] !== null &&
          formData[question.firebaseId] !== ""
      )
      .map((question) => ({
        id: question.firebaseId,
        defaultValue: formData[question.id],
      }));

    console.log(DefaultQuestions, "defaultValues");

    const payload = {
      userId: userId,
      petId: id,
      journalType: journalType,
      date: journalDate,
      // responses: questions?.map((question) => ({
      //     questionId: question.id,
      //     response: formData[question.id],
      // })),

      responses: filteredResponses,
    };
    setLoading(true);
    try {
      if (defaultValue === true) {
        const defaultPayload = {
          DefaultQuestions,
        };
        await updateComprehensiveDefaultValues(defaultPayload);
        toast.success("Default Value Set Successfully");
      } else if (!journalId) {
        await addSmartJournals(payload);
        toast.success("Saved Successfully");

        setTimeout(() => {
          navigate(`/AddSmartJournal/${id}`);
        }, 1000);
      } else {
        await updateSmartJournal(journalId, payload);
        toast.success("Updated Successfully");

        setTimeout(() => {
          navigate(`/AddSmartJournal/${id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error handling user submission:", error);
    } finally {
      setLoading(false);
      setDefaultValue(false);
    }
  };

  const handleDefault = () => {
    setDefaultValue(!defaultValue);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {
        <PeriodicCheckFirst
          questions={questions}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          handleDefault={handleDefault}
          defaultValue={defaultValue}
        />
      }
    </div>
  );
};

export default PeriodicCheck;
