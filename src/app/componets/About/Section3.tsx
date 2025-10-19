import React from "react";
import bgimage from "../../../../public/assets/Image/aboutsection3.png";
import Heading from "../Heading/Heading";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function Section3() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  return (
    <div className="w-full flex justify-center items-center flex-col ">
      {/* content of heading */}
      <div className="w-full flex flex-col items-center gap-2 text-center">
        <Heading
          title="Deep Experience"
          highlightedTitle=" Across Multiple Areas  "
        />
      </div>

      {/* description */}
      <div className="w-full sm:w-[80%] md:w-[60%] mx-auto flex justify-center items-center mt-4 xl:mt-[2rem]">
        <p
          className={` font-poppins text-base sm:text-lg text-center  ${
            isDarkMode ? "text-[#FFFFFFBA]" : "text-[#4A4A4A]"
          }`}
        >
          {getTranslation(
            "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change.",
            "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change."
          )}
        </p>
      </div>

      {/* image */}
      <div
        className="w-full h-[20rem] sm:h-[25rem] xl:h-[30rem]  bg-cover bg-center bg-no-repeat rounded-xl mt-6"
        style={{
          backgroundImage: `url(${bgimage.src})`,
        }}
      ></div>
    </div>
  );
}

export default Section3;
