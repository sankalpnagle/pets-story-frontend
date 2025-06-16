import { Badge } from '@mui/material';
import notify from "/icons/notify.svg";
import React from 'react'

const JournalCard = ({data}:any) => {
  return (
    <div
      className="max-w-[276px] mx-auto rounded-3xl overflow-hidden  relative"
      style={{
        backgroundImage: `url(${data.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "315px", // Adjust the height as needed
      }}
    >
      <div className="absolute right-2 bg-[#FFDAD6] w-9 h-9 rounded-full flex justify-center items-center top-2">
        <Badge
          color="secondary"
          overlap="circular"
          variant="dot"
          badgeContent=" "
        >
          <img src={notify} width={16} alt="Add" />
        </Badge>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-2">
        <div>
          <h2 className="text-sm font-bold text-white">{data.name}</h2>
          <p className="text-xs text-white">Pug</p>
          <div className="  grid grid-cols-2 w-32">
            <p className="text-white text-xs">
              <span className="font-bold">Age</span> <h5> {data.name}</h5>
            </p>
            <p className="text-white text-xs">
              <span className="font-bold">Color</span> <h5>{data.name}</h5>
            </p>
            <p className="text-white text-xs">
              <span className="font-bold">Gender</span> <h5> {data.name}</h5>
            </p>
            <p className="text-white text-xs">
              <span className="font-bold">Weight</span> <h5> {data.weight}</h5>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalCard
