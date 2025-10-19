import React, { useState } from "react";
import LeftSideBox from "./LeftSideBox";
import RightSideBox from "./RightSideBox";
import { useAppSelector } from "@/app/hooks/hooks";
import { FiMenu, FiX } from "react-icons/fi";

function Messagelist() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const [menuOpen, setMenuOpen] = useState(false);

  const userselected = useAppSelector(
    (state) => state.userSlice.selectedUser?.second_id
  );

  return (
    <div className="w-full relative">
      {/* Menu Toggle Button */}
      <div className="absolute right-4 top-[-2rem] rounded-full">
        <div
          className="block md:hidden cursor-pointer z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </div>
      </div>

      <div
        className={`mx-auto h-auto w-[90%] 2xl:w-[68%] rounded-xl shadow-xl 
        md:grid md:grid-cols-[40%_60%] 2xl:grid-cols-[30%_70%] 
        ${isDarkMode ? "" : "main-borderclor"}`}
      >
        {/* --- Mobile view --- */}
        <div className="block md:hidden w-full">
          {!userselected ? (
           <div className="z-50">
             <LeftSideBox menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          ) : (
            <RightSideBox />
          )}
        </div>

        {/* --- Desktop view --- */}
        <div className="hidden md:block w-full">
          <LeftSideBox menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
        <div className="hidden md:block w-full">
          <RightSideBox />
        </div>
      </div>
    </div>
  );
}

export default Messagelist;
