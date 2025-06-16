import React from "react";

interface PetCardProps {
  image: string;
  name: string;
  age: string;
  gender: string;
  breed: string;
  weight: string;
  color: string;
}

const PetCard: React.FC<PetCardProps> = ({
  image,
  name,
  age,
  gender,
  breed,
  weight,
  color,
}) => {
  return (
    <div className="w-[340px] md:w-fit max-w-[340px] pb-1 h-[165px] md:shadow-md md:h-auto mx-auto bg-[#F6F4FF] rounded-3xl overflow-hidden">
      <div className="flex md:flex-col gap-3">
        {/* Image Section */}
        <div className="shrink-0">
          <img
            className="h-[165px] rounded-3xl object-cover w-[160px]"
            src={image}
            alt={`${name} profile`}
          />
        </div>

        {/* Details Section */}
        <div className="mt-3 px-3 pb-4 mr-3">
          <div className="text-base text-[#0B1A97] font-bold">
            <h1>{name.length > 5 ? `${name.slice(0, 16)}...` : name}</h1>
            <span>{breed.length > 5 ? `${breed.slice(0, 16)}...` : breed}</span>
          </div>
          <div className="grid  grid-cols-2  gap-y-2 mt-1 gap-x-4">
            <div>
              <h1 className="font-bold text-sm">Age</h1>
              <p className="font-medium text-sm">{age}</p>
            </div>
            <div>
              <h1 className="font-bold text-sm">Gender</h1>
              <p className="font-medium text-sm">{gender}</p>
            </div>
            <div>
              <h1 className="font-bold text-sm">Color</h1>
              <p className="font-medium text-sm">{color}</p>
            </div>
            <div>
              <h1 className="font-bold text-sm">Weight</h1>
              <p className="font-medium text-sm">{weight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
