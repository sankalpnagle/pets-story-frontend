import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress"; // MUI loader
import useMediaQuery from "@mui/material/useMediaQuery";
import left from "/icons/arrowLeft.svg";
import plusSign from "/icons/plus-sign.svg";
import addCircleIcon from "/icons/addWhiteCircle.png";
import backCircleIcon from "/icons/backWhiteCircle.png";
import cat from "/assets/images/user/cat.jpg";
import MuiButton from "../../components/button/MuiButton";
import PetCard from "../../components/card/PetCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllPet } from "../../services/PetServicesApi/PetService";
import HorizontalSidebar from "../../components/sidebar/HorizontalSidebar";

type Pet = {
  petId: string;
  name: string;
  type: string;
  breed: string;
  weight: number;
  age: string;
};

const AddPet = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const id = user?.id;

  const [petData, setPetData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

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
            gender: pet.gender,
            age: pet.age,
            image: pet.image,
            breed: pet.breed,
            weight: pet.weight,
            color: pet.color,
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
            isTablet ? "bg-[#0b1A97]" : " bg-white"
          } flex flex-col h-full overflow-y-auto `}
        >
          {/* Header */}
          <div className="flex justify-between mx-3 items-center py-7">
            <img
              src={backCircleIcon}
              width={33}
              alt="Back"
              onClick={() => navigate("/user-dashboard")}
            />
            <h1 className="text-2xl text-white md:text-black">Your Pets</h1>
            <button onClick={() => navigate("/Pet-profile")}>
              {/* <img src={addCircleIcon} width={33} alt="Add" /> */}
            </button>
          </div>

          {/* Scrollable Content */}
          <nav className="flex-1 w-full bg-white rounded-t-3xl px-4 py-6 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <CircularProgress size={50} />
              </div>
            ) : petData.length > 0 ? (
              <div className="grid justify-center md:grid-cols-3 mb-24 lg:grid-cols-4 gap-x-1.5 gap-y-4">
                {petData.map((item) => (
                  <Link to={`/Pet-Details/${item.petId}`} key={item.petId}>
                    <PetCard
                      image={item.image}
                      name={item.name}
                      age={item.age}
                      gender={item.gender}
                      breed={item.breed}
                      weight={item.weight}
                      color={item.color}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <>
                <div className="mx-auto w-fit max-w-[500px] mt-6 flex justify-center">
                  <div className="text-4xl flex">
                    <p>🐈</p>
                    <p className="-ml-3">🐕</p>
                  </div>
                </div>
                <p className="text-3xl w-fit mx-auto mt-4">Add Your Pets</p>
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
                    Add Pet Profile
                  </MuiButton>
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

export default AddPet;
