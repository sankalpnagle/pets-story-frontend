import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress"; // MUI loader
import useMediaQuery from "@mui/material/useMediaQuery";
import left from "/icons/arrowLeft.svg";
import plusSign from "/icons/plus-sign.svg";
import taskAdd from "/icons/task-add-01.svg";
import cat from "/assets/images/user/cat.jpg";
import MuiButton from "../../components/button/MuiButton";
import PetCard from "../../components/card/PetCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllPet } from "../../services/PetServicesApi/PetService";
import HorizontalSidebar from "../../components/sidebar/HorizontalSidebar";
import JournalCalender from "../../components/calender/JournalCalender";

const StartJournal = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const data = true;

  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const id = user?.id;

  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen bg-white">
      <div>
        <div
          className={`${
            isTablet ? " bg-[#0B1A97]" : " bg-white"
          } flex flex-col h-full overflow-y-auto `}
        >
          {/* Header */}
          <div className="flex justify-between mx-3 items-center py-7">
            <img src={left} width={33} alt="Back" onClick={()=>navigate("/AddSmartJournal")}/>
            <h1 className="text-2xl text-white md:text-black">Your Pets</h1>
            <button onClick={() => navigate("/Profile-edit")}>
              <img src={plusSign} width={33} alt="Add" />
            </button>
          </div>

          {/* Scrollable Content */}
          <nav className="flex-1 w-full bg-white rounded-t-3xl px-4 py-6 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <CircularProgress size={50} />
              </div>
            ) : (
              <>
                <div>
                  <div className="w-14 h-14 my-5 overflow-hidden rounded-full">
                    <img
                      className="object-fill object-center w-full"
                      src={cat}
                      alt="Pet"
                    />
                  </div>
                  <h1 className="text-4xl font-bold text-[#0B1A97] my-5">
                    Help us understand Maximilian better!
                  </h1>
                  <p className="text-base font-medium">
                    Share your pet's details with us to enhance the accuracy of
                    our recommendations!
                  </p>
                  <h1 className="mt-7 font-semibold text-base">
                    Select Your Journal
                  </h1>
                  <div className="flex gap-x-3 my-5">
                    <button className="px-4 py-2 rounded-full bg-[#FFB952]">
                      Daily
                    </button>
                    <button className="px-5 py-2 rounded-full bg-[#BDC2FF]">
                      Comprehensive
                    </button>
                  </div>
                  <div className="w-fit mx-auto  mt-16">
                    <MuiButton
                      color="#0B1A97"
                      size="large"
                    
                    >
                      Start Journaling
                    </MuiButton>
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
      {isTablet && <HorizontalSidebar />}
    </div>
  );
};

export default StartJournal;
