import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress"; // MUI loader
import useMediaQuery from "@mui/material/useMediaQuery";
import left from "/icons/arrowLeft.svg";
import plusSign from "/icons/plus-sign.svg";

import cat from "/assets/images/user/cat.jpg";
import MuiButton from "../../components/button/MuiButton";
import PetCard from "../../components/card/PetCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllPet } from "../../services/PetServicesApi/PetService";
import HorizontalSidebar from "../../components/sidebar/HorizontalSidebar";
import { Badge } from "@mui/material";
import JournalCard from "../../components/card/JournalCard";
import CardSlider from "../../components/slider/CardSlider";

type Pet = {
  petId: string;
  name: string;
  type: string;
  breed: string;
  weight: number;
  age: string;
};

const AddJournal = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const id = user?.id;

  const [petData, setPetData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

  const data = [
    {
      name: "Tommy",
      image:cat,
      weight:"12",
      gender:"male"
    },
    {
      name: "Bull",
      image:cat,
      weight:"12",
      gender:"male"
    },
    {
      name: "Guffy",
      image:cat,
      weight:"12",
      gender:"male"
    },
    {
      name: "Jerry",
      image:cat,
      weight:"12",
      gender:"male"
    },
  ];

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
  }, []);

  return (
    <div className="h-screen bg-white">
      <div
        className={`${
          isTablet ? "translate-x-0 z-50" : "-translate-x-full"
        } fixed inset-y-0 left-0 w-full transform md:translate-x-0 md:static md:inset-0 transition-transform duration-200 ease-in-out`}
      >
        <div
          className={`${
            isTablet ? "bg-[#2734A9]" : " bg-white"
          } flex flex-col h-full overflow-y-auto `}
        >
          {/* Header */}
          <div className="flex justify-between mx-3 items-center py-7">
            <img src={left} width={33} alt="Back" />
            <h1 className="text-2xl text-white md:text-black">Your Pets</h1>
            <button onClick={() => navigate("/SmartJournal")}>
              <img src={plusSign} width={33} alt="Add" />
            </button>
          </div>

          {/* Scrollable Content */}
          <nav className="flex-1 w-full mt-3 bg-white rounded-t-3xl px-4 py-6 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <CircularProgress size={50} />
              </div>
            ) : (
              <>
                <div className="overflow-hidden">
                  <div className="w-fit mx-auto my-5 relative">
                    <h1 className="text-[#0B1A97] font-bold text-3xl">
                      Your active pets
                    </h1>
                  </div>
                  <div className="w-[300%]  sm:w-full mx-auto ml-[-22rem] sm:ml-0 -pl-16 sm:pl-0">
                    <Link to={"/SmartJournal"}>
                      {" "}
                      <CardSlider data={data} />
                    </Link>
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

export default AddJournal;
