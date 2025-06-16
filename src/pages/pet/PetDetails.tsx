import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import left from "/icons/arrowLeft.svg";
import CircleArrowLeft from "../../../src/assets/icons/CircleArrowLeft";
import pen from "/icons/pen-01.svg";
import pet from "/icons/pet.svg";
import Age from "/icons/Age.svg";
import cat from "/assets/images/user/cat.jpg";
import MuiButton from "../../components/button/MuiButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { getPetById } from "../../services/PetServicesApi/PetService";
import { toast } from "react-toastify";
import petAge from "/icons/PetIcons/Age.svg";
import vaccine from "/icons/PetIcons/vaccine.svg";
import RFID from "/icons/PetIcons/RFID.svg";
import gender from "/icons/PetIcons/gender.svg";
import healtcare from "/icons/PetIcons/healtcare.svg";
import heatlhRecord from "/icons/PetIcons/heatlh-record.svg";
import colors from "/icons/PetIcons/colors.svg";
import weight from "/icons/PetIcons/weight-scale-01.svg";
import healthcare from "/icons/PetIcons/heatlhcare.svg";
import blood from "/icons/PetIcons/blood.svg";
import HeartFilled from "/icons/PetIcons/HeartFilled.svg";
import medicine02 from "/icons/medicine-02.svg";
import girlpet from "/assets/images/pets/backpet.png";
import backCircleIcon from "/icons/backWhiteCircle.png";
import editCircleIcon from "/icons/editCircle.png";

const PetDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const { id } = useParams();
  console.log("Id of Pet", id);
  const [petData, setPetData] = useState<any>({});
  const [petId, setPetId] = useState<any>({});

  useEffect(() => {
    const fetchPetData = async () => {
      if (id) {
        try {
          const response = await getPetById(id);
          setPetData(response.data.data);
          setPetId(response.data.data.id);
          console.log("petData", petData);
        } catch (error) {
          toast.error("Failed to fetch pet data");
        }
      }
    };
    fetchPetData();
  }, [id]);

  const Medicaldata = [
    {
      icon: heatlhRecord,
      label: "Health Records",
      value: "Track pet records and get medical updates.",
    },
    {
      icon: blood,
      label: "Blood Test",
      value: "Quick, accurate blood tests for your pet's health.",
    },
    {
      icon: medicine02,
      label: "Medication",
      value: "Keep track of your pet's treatments.",
    },
    {
      icon: vaccine,
      label: "Vaccine",
      value: "Stay updated on your pet's vaccinations.",
    },
  ];

  return (
    <div 
    // className="min-h-screen sm:w-full w-fit overflow-y-auto bg-[#ffffff]"
    className="min-h-screen sm:w-full w-[100vw] overflow-y-auto bg-[#ffffff]"
    >
      <div className={` relative `}>
        <div className="flex flex-col h-full overflow-y-auto">
          {isTablet ? (
            <div
              // className=" bg-cover bg-center  h-[350px] w-[370px] "
              //  className="bg-cover bg-center h-[350px] w-[370px] xs:h-[200px] xs:w-[250px] sm:h-[250px] sm:w-[270px] md:h-[300px] md:w-[320px] lg:h-[350px] lg:w-[370px]"
              className="bg-cover bg-center h-[410px] w-full xs:h-[200px] xs:w-full sm:h-[250px] sm:w-full md:h-[300px] md:w-full lg:h-[350px] lg:w-full"

              style={{
                backgroundImage: `url(${petData.image})`,
              }}
            >
              <div className="header relative flex justify-between items-center px-3 py-5">
                <button
                  className="bg-white rounded-full p-2"
                  onClick={() => navigate("/user-dashboard")}
                >
                  <img src={backCircleIcon} width={28} alt="Back" />
                  {/* <CircleArrowLeft /> */}
                </button>
                <button
                  className="bg-white rounded-full p-2 "
                  onClick={() => navigate(`/Pet-profile/${petId}`)}
                >
                  <img src={editCircleIcon} width={28} alt="Add" />
                </button>
              </div>
            </div>
          ) : (
            <div className=" bg-cover bg-white bg-center  h-[50px] w-full ">
              <div className="header relative flex justify-between items-center px-3 py-5">
                <button onClick={() => navigate("/user-dashboard")}>
                  {/* <img src={left} width={33} alt="Back" /> */}

                  <img src={backCircleIcon} width={28} alt="Back" />
                </button>
                <button onClick={() => navigate(`/Pet-profile/${petId}`)}>
                  {/* <img src={pen} width={30} alt="Add" /> */}

                  <img src={editCircleIcon} width={28} alt="Add" />
                </button>
              </div>
            </div>
          )}

          <nav className=" sm:flex w-[100vw] flex-1 md:justify-center md:w-10/12 mx-auto  gap-x-9 -mt-5 z-30 bg-white rounded-t-3xl px-4 py-6 overflow-y-hidden sm:overflow-y-auto">
            <div className="md:w-[206px] md:mt-10 md:ml-4 md:h-[206px] md:rounded-3xl md:overflow-hidden">
              {!isTablet && (
                <div className=" rounded-full">
                  <img src={petData.image} alt="" />
                </div>
              )}
            </div>
            <div className="mx-1 my-5 sm:w-4/5  w-[90vw] relative float-end right-[-5px]">
              <h1 className="text-[#0B1A97] font-bold text-3xl ">
                {petData.name}
              </h1>
              <p className="font-normal text-sm">{petData.breed}</p>
              <div className="my-3">{petData.about}</div>
              <div className=" grid grid-cols-2 gap-y-2 gap-x-2">
                <div className="bg-[#F6F4FF]  rounded-xl gap-2 w-[158.5px] h-[56px] flex items-center">
                  <div className="w-[50px] h-[50px] rounded-xl bg-[#FFAA00] content-center">
                    <img
                      src={gender}
                      alt=""
                      className="w-fit mx-auto h-[32px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-xs font-normal text-[#0B1A97]"
                    >
                      Gender
                    </label>
                    <p className="text-sm font-normal">{petData.gender}</p>
                  </div>
                </div>
                <div className="bg-[#F6F4FF]  rounded-xl gap-2 w-[158.5px] h-[56px] flex items-center">
                  <div className="w-[50px] h-[50px] rounded-xl bg-[#FFAA00] content-center">
                    <img
                      src={petAge}
                      alt=""
                      className="w-fit mx-auto h-[32px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-xs font-normal text-[#0B1A97]"
                    >
                      Age
                    </label>
                    <p className="text-sm font-normal">{petData.age}</p>
                  </div>
                </div>
                <div className="bg-[#F6F4FF]  rounded-xl gap-2 w-[158.5px] h-[56px] flex items-center">
                  <div className="w-[50px] h-[50px] rounded-xl bg-[#FFAA00] content-center">
                    <img
                      src={colors}
                      alt=""
                      className="w-fit mx-auto h-[32px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-xs font-normal text-[#0B1A97]"
                    >
                      Color
                    </label>
                    <p className="text-sm font-normal">{petData.color}</p>
                  </div>
                </div>
                <div className="bg-[#F6F4FF]  rounded-xl gap-2 w-[158.5px] h-[56px] flex items-center">
                  <div className="w-[50px] h-[50px] rounded-xl bg-[#FFAA00] content-center">
                    <img
                      src={weight}
                      alt=""
                      className="w-fit mx-auto h-[32px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-xs font-normal text-[#0B1A97]"
                    >
                      Weight
                    </label>
                    <p className="text-sm font-normal">{petData.weight}</p>
                  </div>
                </div>
                <div className="bg-[#F6F4FF]  rounded-xl gap-2 w-[158.5px] h-[56px] flex items-center">
                  <div className="w-[50px] h-[50px] rounded-xl bg-[#FFAA00] content-center">
                    <img src={RFID} alt="" className="w-fit mx-auto h-[32px]" />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-xs font-normal text-[#0B1A97]"
                    >
                      RFID
                    </label>
                    <p className="text-sm font-normal">
                      {petData.rfidChipStatus}
                    </p>
                  </div>
                </div>
                <div className="bg-[#F6F4FF]  rounded-xl gap-2 w-[158.5px] h-[56px] flex items-center">
                  <div className="w-[50px] h-[50px] rounded-xl bg-[#FFAA00] content-center">
                    <img
                      src={vaccine}
                      alt=""
                      className="w-fit mx-auto h-[32px]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-xs font-normal text-[#0B1A97]"
                    >
                      Vaccine
                    </label>
                    <p className="text-sm font-normal">
                      {petData.vaccineStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-4 my-7"></div>
              <div
                className="flex w-[327px] rounded-3xl bg-[#4552C5] overflow-hidden"
                onClick={() => navigate("/AIPetAssistant")}
              >
                <div className="content-center px-3 text-white ">
                  <h4 className="font-bold text-2xl ">Ask AI Pet Expert</h4>
                  <p className="font-medium text-base mt-2.5">
                    Get instant advice from our AI pet expert.
                  </p>
                </div>
                <div className="w-[200px] h-[156px] overflow-hidden bg-cover bg-center rounded-l-3xl bg-[#F7A500]">
                  <img
                    src={girlpet}
                    className=" object-cover object-center"
                    alt=""
                    style={{
                      marginLeft: "-190px",
                      marginTop: "-8.5rem",
                      position: "relative",
                      maxWidth: "457px",
                    }}
                  />
                </div>
              </div>
              <div className="my-6">
                <h3 className="flex gap-x-2  text-base font-medium">
                  <span>
                    <img src={healtcare} alt="" />
                  </span>
                  General Health Records
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Medicaldata.map((item) => (
                  <div className="w-[156px] h-[156px] rounded-3xl bg-[#F6F4FF] px-5 py-3">
                    <img src={item.icon} alt="" />
                    <h5 className="text-base my-1.5 ">{item.label}</h5>
                    <p className="text-xs">{item.value}</p>
                  </div>
                ))}
              </div>
              {/* <div className="my-7 w-fit mx-auto h-[32px]">
                <MuiButton
                  onClick={() => navigate(`/AddSmartJournal/${id}`)}
                  color="#0B1A97"
                  size="large"
                >
                  Add Smart Journal
                </MuiButton>
              </div> */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
