import React, { useState } from "react";
import "./cardStyle.css";
import homeimage from "../../../../../public/assets/Image/category.png";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import { TailSpin } from "react-loader-spinner";

function Cardbtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const handleClick = () => {
    setLoading(true);
    router.push("/category");
  };

  return (
    <div
      className="w-full h-[195px]  3xl:h-[220px] flex flex-col gap-2  overflow-hidden items-center cursor-pointer"
      onClick={handleClick}
    >
      {/* Card Image Section */}
      <div
        className={`w-full   h-[147px] 3xl:h-[175px] flex justify-center items-center rounded-[1rem] transition duration-300 ease-in-out ${
          isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-[#226FE40F]"
        }`}
      >
        {loading ? (
          <TailSpin
            height="40"
            width="40"
            color={isDarkMode ? "#ffffff" : "#226FE4"}
            ariaLabel="loading"
          />
        ) : (
          <div
            className="w-[50%] h-[50%] bg-center bg-contain"
            style={{
              backgroundImage: `url(${homeimage.src})`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}
      </div>

      {/* Card Content Section */}
      <div className="w-full  h-[40px] flex items-center justify-center px-2 text-center">
        <p className="font-poppins text-T7 text-light-secondary dark:text-dark-secondary leading-snug">
          Popular Categories
        </p>
      </div>
    </div>
  );
}

export default Cardbtn;
