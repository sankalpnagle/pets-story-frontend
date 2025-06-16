import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import SOPMain from "/icons/SOP Light.svg";
import pet from "/icons/pet.svg";
import Frame from "/icons/Frame 10.svg";
import ManIcon from "/icons/userDefault.png";
import RedDot from "/icons/redDot.png";
import notification from "/icons/notification-block-02.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllPet } from "../../../services/PetServicesApi/PetService";
import HorizontalSidebar from "../../../components/sidebar/HorizontalSidebar";
import AddCircleIcon from "/icons/add-circle.svg";
import taskAdd from "/icons/task-add-01.svg";
import notify from "/icons/Group.png";
import {
  checkJournalsStatus,
  getAllJaurnalByUserId,
} from "../../../services/SmartJournalApi/SmartJournalServices";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Popover, Typography } from "@mui/material";
import catDogIcon from "/icons/PetIcons/catDog.png";
import MuiButton from "../../../components/button/MuiButton";
 
type Pet = {
  petId: string;
  name: string;
  type: string;
  breed: string;
  weight: number;
  age: string;
  image: string;
};
 
const UserDashBoard = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const userData = useSelector((state: any) => state?.userProfile?.data);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingData, setPendingData] = useState([]);
 
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const id = user?.id;
 
  const [petData, setPetData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [journalData, setJournalData] = useState([]);
 
  const userProfile = useSelector((state: any) => state?.userProfile?.profile);
 
  const fullName = userProfile?.fullName;
  const userImage = userProfile?.profileImage;
 
  useEffect(() => {
    const JournalsStatus = async () => {
      try {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
 
        const isValidDay = dayOfWeek === 2 || dayOfWeek === 5;
 
        if (isValidDay) {
          const payload = {
            date: currentDate.toISOString().split("T")[0],
            userId: id,
          };
 
          const res = await checkJournalsStatus(payload);
 
          setPendingData(res.data.pending || []);
        } else {
          setPendingData([]);
        }
      } catch (error) {
        console.error("Error fetching journal status:", error);
      }
    };
 
    JournalsStatus();
  }, []);
 
  const getAllJournals = async () => {
    try {
      const payload = {
        userId: id,
      };
      const res = await getAllJaurnalByUserId(payload);
      setJournalData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await getAllPet(id);
        if (response.data.success) {
          const pets = response.data.data.map((pet: any) => ({
            petId: pet.id,
            name: pet.name,
            type: pet.type,
            breed: pet.breed,
            weight: pet.weight,
            age: pet.age,
            neuteredOrSpayed: pet.neuteredOrSpayed,
            image: pet.image,
          }));
          setPetData(pets);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
    getAllJournals();
  }, []);
 
  const missingPetIds = journalData
    .filter((entry) => entry.status === "Pending")
    .map((entry) => entry.missingPetIds)
    .flat()
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
 
  console.log("Missing Pet IDs:", missingPetIds);
 
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // navigate(`/AIPetAssistant?search=${searchTerm}`);
      navigate("/AIPetAssistant", { state: { searchTerm: searchTerm } });
    }
  };
 
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
 
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
 
  const open = Boolean(anchorEl);
 
  const handleAddPet = () => {
    navigate("/petHome");
  };
 
  const handleClick = () => {
    navigate("/My-profile");
  };
 
  const handleProfile = () => {
    navigate("/Profile-edit");
  };
 
  return (
    <div className="h-screen sm:w-full w-[100vw]  bg-white">
      <div>
        <div className="bg-[#0B1A97] flex flex-col h-full overflow-y-auto">
          <div className={`flex items-center justify-between mx-6`}>
            <img
              src={SOPMain}
              width={100}
              alt="Back"
              className={`${isTablet ? "block my-7" : "hidden"}`}
            />
            {/* <div className="ml-auto ">
              <button className={`${isTablet ? "" : "my-3"}`} style={{ position: "relative", border: "none", background: "none" }}>
               
 
                <NotificationsNoneIcon style={{ width: 40, height: 40, color: 'white' }} />
                {user?.fullName && user?.profileImage && user?.dob && user?.gender ?
                 "":
                 <img
                 src={RedDot}
                 alt="Notification Dot"
                 style={{
                   position: "absolute",
                   top: 0,
                   right: 0,
                   marginRight: 6,
                   marginTop: 8,
                   width: 15,
                   height: 15,
                 }}
                 className="animate-pulse"
               />
              }
               
              </button>
            </div> */}
 
            {/* <div className="ml-auto">
              <button
                className={`${isTablet ? "" : "my-3"}`}
                style={{
                  position: "relative",
                  border: "none",
                  background: "none",
                }}
              >
               
                {!user?.fullName ||
                !user?.profileImage ||
                !user?.dob ||
                !user?.gender ? (
                  <>
                  <NotificationsNoneIcon
                  style={{ width: 40, height: 40, color: "white" }}
                />
                    <img
                      src={RedDot}
                      alt="Notification Dot"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        marginRight: 6,
                        marginTop: 8,
                        width: 13,
                        height: 13,
                      }}
                      // className="animate-pulse"
                      onClick={handlePopoverOpen}
                    />
                    <Popover
                      id="notification-popover"
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography sx={{ p: 1, fontFamily: "serif" }} onClick={handleProfile}>
                        Complete User Profile
                      </Typography>
                    </Popover>
                  </>
                ) : null}
              </button>
            </div> */}
          </div>
 
          <div className="flex gap-x-4 mx-4 items-center sm:mt-6">
            <div className="w-11 h-11 ml-1 overflow-hidden rounded-full bg-[#D9D9D9] flex items-center justify-center">
              <img
                className={`object-cover object-center ${
                  user?.profileImage ? "w-full" : "w-6 h-6"
                }`}
                src={user?.profileImage ? user?.profileImage : ManIcon}
                alt=""
                onClick={handleClick}
              />
            </div>
            <div className="text-white">
              <h4 className="text-base  font-bold">
                {user?.fullName ? `Hello, ${user?.fullName}!` : "Hello!"}
              </h4>
              <p className="text-xs">How can we help your pets today?</p>
            </div>
          </div>
 
          <div className="flex mx-auto sm:mx-6 bg-white overflow-hidden my-4 p-2 sm:p-2 rounded-full w-[90vw] max-w-96 ">
            <input
              type="text"
              placeholder="Curious about your pets? Ask away!"
              className="w-full px-6 placeholder:text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <img
              src={Frame}
              className="w-[36px] cursor-pointer"
              alt="Search"
              onClick={handleSearch}
            />
          </div>
 
          <nav className="flex-1 w-full mt-3 bg-white rounded-t-3xl px-4 py-6 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <CircularProgress size={50} />
              </div>
            ) : !petData || petData.length === 0 ? (
              // <div className="w-full max-w-lg h-[260px] flex flex-col justify-center items-center bg-gray-50 border border-blue-500 rounded-3xl shadow-md relative p-4 sm:w-4/5 md:w-3/5 lg:w-2/5">
              //   <div className="absolute inset-0 bg-white border border-[#0b1A97] blur-lg rounded-3xl"></div>
              //   <div className="z-10 flex flex-col items-center">
              //     <p className="text-xl font-semibold text-[#0b1A97] mb-2">
              //       No Pets Found
              //     </p>
              //     <p className="text-sm text-gray-600 mb-4 text-center">
              //       Add your beloved pets to get started.
              //     </p>
              //     <button
              //       onClick={() => navigate("/add-Pet")}
              //       className="px-4 py-2 bg-[#0b1A97] text-white font-medium rounded-lg hover:bg-blue-900 transition"
              //     >
              //       Add Your Pets
              //     </button>
              //   </div>
              // </div>
 
              <div>
                <div className="mx-auto w-fit max-w-[500px] mt-14 flex justify-center">
                  <div className="text-4xl flex">
                    {/* <p>🐈</p>
                    <p className="-ml-3">🐕</p> */}
                    <img src={catDogIcon} alt="" />
                  </div>
                </div>
                <p className="text-3xl font-bold w-fit mx-auto mt-8 text-[#0B1A97]">
                  Add Your Pets
                </p>
                <p className="text-center mx-10 my-4">
                  Create a profile for your furry friends and keep all their
                  info in one place!
                </p>
                <div className="w-fit mx-auto mt-6 mb-24">
                  <MuiButton
                    color="#0B1A97"
                    size="large"
                    onClick={() => navigate("/Pet-profile")}
                  >
                    Add Your Pets
                  </MuiButton>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-hidden items-center">
                  <div className="w-fit flex gap-x-3 mx-2 my-2 relative">
                    <h1 className="text-[#0B1A97] font-bold text-[22px]">
                      Your Active Pets
                    </h1>
                    <div>
                      <span>
                        <img src={pet} alt="Pet icon" className="py-1" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="my-4 mb-24 mx-2 cl">
                  <div className="flex justify-between my-4">
                    <h1 className="flex gap-x-2">
                      <button
                        onClick={handleAddPet}
                        disabled={petData.length > 4}
                      >
                        <div
                          // className="overflow-hidden py-1.0 rounded-full hover:bg-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer"
                          className={`overflow-hidden py-1.0 rounded-full hover:bg-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer ${
                            petData.length > 4
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          }`}
                        >
                          <img src={AddCircleIcon} alt="Add icon" />
                        </div>
                      </button>
                    </h1>
                    <p
                      className="cursor-pointer text-[#0B1A97]"
                      onClick={() => navigate("/add-pet")}
                    >
                      More Info
                    </p>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-x-2 sm:gap-x-1 gap-y-4">
                    {petData?.map((item, index) => {
                      try {
                        const hasNotification = pendingData.some(
                          (ob) => ob.petId === item.petId
                        );
                        const hasPending = missingPetIds.some(
                          (ob) => ob === item.petId
                        );
                        return (
                          <div
                            key={index}
                            className={`w-24 h-24 relative rounded-full ${
                              index >= 3 ? "ml-14 sm:ml-0" : ""
                            }`}
                          >
                            <div className="w-24 h-24 relative overflow-hidden rounded-full ml-1">
                              <img
                                className="object-fill h-24 object-center w-full"
                                src={item.image}
                                alt="Pet"
                                onClick={() =>
                                  navigate(`/Pet-Details/${item.petId}`)
                                }
                              />
                            </div>
 
                            {hasPending && (
                              <div>
                                <button
                                  onClick={() =>
                                    navigate(`/AddSmartJournal/${item.petId}`)
                                  }
                                  className="absolute bottom-[7px]  right-[-12px] h-[30px] w-[30px] bg-[#0B1A97] rounded-full flex items-center justify-center z-10 shadow-lg"
                                >
                                  <img
                                    src={notify}
                                    className="absolute -top-3 left-2.5"
                                    alt=""
                                  />
 
                                  <img
                                    src={taskAdd}
                                    className="h-3.5 w-3.5"
                                    alt="Task Icon"
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      } catch (error) {
                        console.error(
                          `Error rendering pet item ${index}:`,
                          error
                        );
                        return null;
                      }
                    })}
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
 
export default UserDashBoard;