import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";
import { HeadingcontentProps } from "@/app/types/Restypes";
import React from "react";

const Heading: React.FC<HeadingcontentProps> = ({
  title,
  highlightedTitle,
}) => {
  const { getTranslation } = useTranslation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full text-center">
      {/* Normal title */}
      <h4 className="AmericanSign text-3xl 2xl:text-H2 text-light-button-base">
        {getTranslation(title, title)}
      </h4>

      {/* Highlighted title */}
      <h4
        className={`font-poppins font-semibold text-3xl 2xl:text-H1 tracking-wide ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {getTranslation(highlightedTitle, highlightedTitle)}
      </h4>
    </div>
  );
};

export default Heading;
