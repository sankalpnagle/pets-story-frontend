import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import task from "/icons/task-add-01.svg";
import GenderIcon from '/icons/GenderIcon.png';

const CardSlider = ({
  data,
  searchTerm,
}: {
  data: any[];
  searchTerm: string;
}) => {
  const navigate = useNavigate();

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const settings = {
    infinite: filteredData.length > 1 ? true : false,
    slidesToShow: 3, 
    swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
    slidesToScroll: 3,
    speed: 500,
    // initialSlide: 1,
    // cssEase: "ease-in-out", 
  };

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="w-full max-w-lg h-[260px] flex flex-col justify-center items-center bg-gray-50 border border-blue-500 rounded-3xl shadow-md relative p-4 sm:w-4/5 md:w-3/5 lg:w-2/5">
        <div className="absolute inset-0 bg-white border border-[#0b1A97] blur-lg rounded-3xl"></div>
        <div className="z-10 flex flex-col items-center">
          <p className="text-xl font-semibold text-[#0b1A97] mb-2">
            No Pets Found
          </p>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Add your beloved pets to get started.
          </p>
          <button
            onClick={() => navigate("/add-Pet")}
            className="px-4 py-2 bg-[#0b1A97] text-white font-medium rounded-lg hover:bg-blue-900 transition"
          >
            Add Your Pets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" -ml-[291px] sm:ml-0 relative w-[250%] sm:w-full overflow-visible">
      <Slider {...settings}>
        {filteredData.map((item, index) => (
          <div
            key={item.id}
            className="px-2 my-5 max-w-60 w-[150.89px]"
            style={{
              transform: index === 0 ? "scale(1.2)" : "scale(1)", 
              zIndex: index === 0 ? 2 : 1, 
              transition: "transform 0.3s ease, z-index 0.3s ease", 
            }}
          >
            <div className="bg-[#F6F4FF] rounded-3xl pb-1 overflow-hidden">
              <div className="w-full h-[246.53px] overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <button
                onClick={() => navigate(`/AddSmartJournal/${item.petId}`)}
              >
                <div className="relative float-right left-40 flex justify-center items-center -mt-5 h-10 w-10 bg-[#0B1A97] rounded-full">
                  <img src={task} className="h-5 w-5" alt="Task Icon" />
                </div>
              </button>
              <div className="my-3 px-4">
                <h1 className="text-[#0B1A97] flex flex-col-1 gap-2 font-bold text-base">
                  {item.name}
                  {/* <span className="ml-1">{item.gender}</span> */}
               
                 <div className="rounded-full py-1.0">
                 <img src={GenderIcon} alt="" />
                 </div>
                          
                       
                </h1>
                <p className="font-medium text-xs">{item.breed}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;


