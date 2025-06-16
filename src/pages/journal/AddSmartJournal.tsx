import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import left from "/icons/arrowLeft.svg";
import plusSign from "/icons/plus-sign.svg";
import taskAdd from "/icons/task-add-02.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HorizontalSidebar from "../../components/sidebar/HorizontalSidebar";
import JournalCalender from "../../components/calender/JournalCalender";
import {
  checkJournalsStatus,
  getAllJaurnalByUserId,
} from "../../services/SmartJournalApi/SmartJournalServices";
import { Badge } from "@mui/material";

const AddSmartJournal = () => {
  const petId = useParams().id;
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const data = true;
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const Id = user?.id;
  const currentDate = new Date();
  const [journalData, setJournalData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedJournalType, setSelectedJournalType] = useState();
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [datEventShow, setShowEvent] = useState();
  const dayOfWeek = selectedDate.getDay();

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getAllJournals = async () => {
    try {
      const payload = {
        userId: Id,
      };
      const res = await getAllJaurnalByUserId(payload);
      setJournalData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const JournalsStatus = async () => {
      try {
        const payload = {
          date: selectedDate.toString(),
          userId: Id,
        };

        const res = await checkJournalsStatus(payload);
        setPendingData(res.data.pending);
        setCompletedData(res.data.completed);
      } catch (error) {
        console.log(error);
      }
    };
    JournalsStatus();
  }, [selectedDate]);

  useEffect(() => {
    getAllJournals();
  }, []);

  const handleDateSelect = ({ date, journalType }) => {
    setSelectedDate(date);
    setSelectedJournalType(journalType);
    return;
  };

  const handleEvent = () => {
    if (selectedJournalType === "Comprehensive") {
      navigate(`/PeriodicCheck/${id}`);
    } else {
      navigate(`/DailyObservation/${id}`);
    }
  };

  const handlePetNavigate = (petId) => {
    localStorage.setItem("journalDate", selectedDate);
    localStorage.setItem("journalType", selectedJournalType);

    if (selectedJournalType === "Comprehensive") {
      navigate(`/PeriodicCheck/${petId}`);
    } else {
      navigate(`/DailyObservation/${petId}`);
    }
  };

  return (
    <div className="h-screen min-w-[280px] overflow-x-hidden  bg-white">
      <div>
        <div
          className=" bg-[#0B1A97] 
           flex flex-col h-full overflow-y-auto"
        >
          <div className="flex justify-between mx-3 items-center py-7">
            <img
              src={left}
              width={33}
              alt="Back"
              onClick={() => navigate("/user-dashboard")}
            />
            <h1 className="text-2xl text-white">Your Pets</h1>
            <button onClick={() => navigate("/user-dashboard")}>
              <img className="hidden" src={plusSign} width={33} alt="Add" />
            </button>
          </div>

          <nav className="flex-1 w-full min-w-[280px] overflow-x-hidden pb-[8rem] bg-white rounded-t-3xl px-4 py-6 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <CircularProgress size={50} />
              </div>
            ) : (
              <div className="grid justify-center sm:grid-cols-2">
                <div className="">
                  <JournalCalender
                    journalData={journalData}
                    onDateSelect={handleDateSelect}
                    pendingData={pendingData}
                    completedData={completedData}
                  />
                </div>
                <div>
                  {!(dayOfWeek === 2 || dayOfWeek === 5) && (
                    <div className="w-[327px] h-[112px] my-3 content-center rounded-3xl mx-auto bg-[#F6F4FF]">
                      <div className="flex justify-center">
                        <img src={taskAdd} alt="" />
                        <button onClick={handleEvent} disabled>
                          <p className="mx-2 text-[#747878]">Add events</p>
                        </button>
                      </div>
                    </div>
                  )}
                  {pendingData.length > 0 &&
                    selectedDate <= currentDate &&
                    (dayOfWeek === 2 || dayOfWeek === 5) && (
                      <div className="w-[327px] h-fit my-3 overflow-x-hidden content-center rounded-3xl mx-auto bg-[#F6F4FF]">
                        <div className="border border-l-8 my-2.5 border-l-[#FFB647] h-full">
                          <h1 className="text-slate-800 font-normal ml-4 text-sm flex flex-wrap w-fit my-3">
                            {selectedJournalType} examination Pending for{" "}
                            {pendingData.map((item, index) => (
                              <span key={index} className="text-[#0B1A97] mx-1">
                                @{item.name}
                              </span>
                            ))}
                          </h1>
                          <hr className="border-[#C4C7C7]  mx-3" />
                          <div className="flex gap-1.5 mx-5 my-3 ">
                            {pendingData.map((item, index) => (
                              <button
                                onClick={() => handlePetNavigate(item?.petId)}
                              >
                                <div
                                  key={index}
                                  className="w-8 h-8 pb-3 overflow-hidden rounded-full"
                                >
                                  <img
                                    className="object-fill w-8 h-8 object-center w-full"
                                    src={item.image}
                                    alt="Pet"
                                  />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  {completedData.length > 0 &&
                    (dayOfWeek === 2 || dayOfWeek === 5) && (
                      <div className="w-[327px] h-fit my-3 overflow-hidden content-center rounded-3xl mx-auto bg-[#F6F4FF]">
                        <div className="border border-l-8 my-2.5 border-l-[#FFB647] h-full">
                          <h1 className="text-slate-800 font-normal ml-4 text-sm flex flex-wrap w-fit my-3">
                            {selectedJournalType} examination completed for{" "}
                            {completedData.map((item, index) => (
                              <span key={index} className="text-[#0B1A97] mx-1">
                                @{item.name}
                              </span>
                            ))}
                          </h1>
                          <hr className="border-[#C4C7C7]  mx-3" />
                          <div className="flex gap-1.5 mx-5 my-3 ">
                            {completedData.map((item, index) => (
                              <Badge
                                badgeContent={
                                  <svg
                                    className="ml-2 mb-2"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.9375 3L2.645 3.7075L4.0625 2.2925M3 5.5C4.375 5.5 5.5 4.375 5.5 3C5.5 1.625 4.375 0.5 3 0.5C1.625 0.5 0.5 1.625 0.5 3C0.5 4.375 1.625 5.5 3 5.5Z"
                                      stroke="#34A853"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                }
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                                key={index}
                              >
                                <button
                                  onClick={() => {
                                    if (
                                      selectedJournalType === "Comprehensive"
                                    ) {
                                      navigate(
                                        `/PeriodicCheck/${item.journalId}/${item.petId}`
                                      );
                                    } else {
                                      navigate(
                                        `/DailyObservation/${item.journalId}/${item.petId}`
                                      );
                                    }
                                  }}
                                >
                                  {" "}
                                  <div
                                    key={index}
                                    className="w-8 h-8 pb-3 overflow-hidden rounded-full"
                                  >
                                    <img
                                      className="object-fill w-8 h-8 object-center w-full"
                                      src={item.image}
                                      alt="Pet"
                                    />
                                  </div>
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
      <div>{isTablet && <HorizontalSidebar />}</div>
    </div>
  );
};

export default AddSmartJournal;
