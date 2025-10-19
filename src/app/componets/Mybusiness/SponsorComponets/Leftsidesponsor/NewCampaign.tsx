import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import CampaignList from "./CampaignList";

function NewCampaign() {
  // State to manage the visibility of CampaignList
  const [isOpen, setIsOpen] = useState(true);

  // Toggle function to show/hide CampaignList
  const toggleCampaignList = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full businesslable dark:bg-[#2F2F2F]  dark:border-none rounded-lg h-auto  flex gap-6 flex-col">

      <div
        className="w-full leftsidesponsor dark:rounded-xl rounded-t-lg cursor-pointer bg-[#226FE40F] flex justify-between  px-10  2xl:px-[3rem]  py-4"
        onClick={toggleCampaignList}
      >
        <p className="font-poppins text-lg  dark:text-dark-darkcolor   2xl:text-[20px] 2xl:font-medium font-normal">Campaign</p>
        <MdExpandLess
          className={`text-3xl dark:text-dark-darkcolor  ${isOpen ? " rotate-180" : ""}`}
        />
      </div>

      {/* Only render CampaignList if isOpen is true */}
     <div  className=" px-4 pb-4">
       {isOpen && <CampaignList />}
     </div>
    </div>
  );
}

export default NewCampaign;
