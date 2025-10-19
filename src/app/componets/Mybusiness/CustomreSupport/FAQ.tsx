"use client";

import React, { useState } from "react";
import Image from "next/image";
import questionImage from "../.././../../../public/assets/Image/message-question.png";
import dropdownImage from "../../../../../public/assets/Image/dropdwonicon.png";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { UseGetFaq } from "@/app/storeApp/api/UseGetFaq";
import { useAppSelector } from "@/app/hooks/hooks";

function FAQ() {
  // State to manage the toggle of the main accordion
  const [isOpen, setIsOpen] = useState(false);

  // State to manage the individual accordion items open/close state
  const [openItem, setOpenItem] = useState(null);

  // Toggle the main accordion visibility
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Toggle the individual FAQ item (open/close)
  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index); // Close if the same item is clicked, otherwise open it
  };

  const { data } = UseGetFaq();

  console.log("my accord data", data);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="mx-auto   2xl:w-[68%]  rounded-b-lg  shadow-xl w-[90%] mt-[3rem] gap-5 flex justify-center flex-col items-center cursor-pointer">
      {/* FAQ Header */}
      <div
        className={`w-full justify-between items-center dark:border-none businesslable flex h-auto p-8 rounded-xl  ${
          isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
        }`}
        onClick={toggleAccordion} // On click, toggle the main accordion
      >
        <div className="flex gap-4 items-center">
          <Image
            className={`w-[2rem] h-[2rem] object-contain   ${
              isDarkMode ? " invert" : ""
            }`}
            src={questionImage}
            alt="question"
          />
          <h5 className="text-lg font-medium font-poppins">FAQ</h5>
        </div>
        {/* Dropdown Icon */}
        <div className="flex gap-2">
          <Image
            className={`w-[1.5rem] h-[1.5rem] object-contain transition-transform ${
              isOpen ? "rotate-180" : ""
            }
            
             ${isDarkMode ? " invert" : ""}
            `} // Rotate icon on open
            src={dropdownImage}
            alt="dropdown"
          />
        </div>
      </div>

      {/* Accordion Content multiple accordions */}
      {isOpen && (
        <div
          className={`w-full flex flex-col  p-4 md:p-6 justify-start items-start gap-6  ${
            isDarkMode ? "bg-[#2F2F2F]  rounded-lg " : "bg-white text-black"
          } `}
        >
          {data?.data?.map((faq, index) => (
            <div key={faq.id} className="w-full bg-transparent rounded-b-xl">
              <div className="w-full justify-between items-center p-3 md:p-5 flex">
                <h5
                  className={`text-lg font-medium font-poppins  ${
                    isDarkMode ? " text-white" : " text-black"
                  }`}
                >
                  {faq.question}
                </h5>
                <div className="flex gap-2">
                  {/* Toggle icon based on whether the item is open or closed */}
                  <span onClick={() => toggleItem(index)}>
                    {openItem === index ? (
                      <FaMinus
                        className={` ${
                          isDarkMode ? " text-white" : " text-black"
                        }`}
                      />
                    ) : (
                      <FaPlus
                        className={` ${
                          isDarkMode ? " text-white" : " text-black"
                        }`}
                      />
                    )}
                  </span>
                </div>
              </div>
              {/* Content for the FAQ */}
              {openItem === index && (
                <ul
                  className={`mt-3 px-5 rounded-lg mb-2 py-1 md:py-3 bg-[#226FE45C]  ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <li className={`mb-2  font-poppins  ${
                    isDarkMode
                     ? "border-[#424242]"
                      : "border-[#424242]"
                  }`}>
                    {faq.answer}
                  </li>
                </ul>
              )}

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FAQ;
