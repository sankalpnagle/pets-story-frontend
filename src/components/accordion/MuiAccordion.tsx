import React, { useState, FC, ReactNode } from "react";
import arrowRight from "/icons/arrow-right-01.svg";
import { Link } from "react-router-dom";

// Define the type for a single link
interface Link {
  label: string;
  url: string;
}

// Define the type for each accordion item
interface AccordionItem {
  title: string;
  content: Link[]; // Array of links for content
  icon: string;
}

// Define the type for props
interface MuiAccordionProps {
  items: AccordionItem[];
}

// Accordion Component
const MuiAccordion: FC<MuiAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-md">
      {items.map((item, index) => (
        <div key={index} className="">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between items-center content-center w-full my-4 text-left text-gray-800 font-medium focus:outline-none"
          >
            <div className="flex gap-x-5 items-center">
              <img src={item.icon} alt="Arrow Icon" />
              {item.title}
            </div>
            <span
              className={`transition-transform transform ${
                openIndex === index ? "rotate-90" : ""
              }`}
            >
              <img src={arrowRight} alt="Arrow Icon" />
            </span>
          </button>
          {openIndex === index && (
            <div className=" text-gray-900 -mt-1">
              {item.content.map((link, linkIndex) => (
                <p key={linkIndex} className="my-3 ml-10">
                  <Link
                    to={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:text-blue-700 "
                  >
                    {link.label}
                  </Link>
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MuiAccordion;
