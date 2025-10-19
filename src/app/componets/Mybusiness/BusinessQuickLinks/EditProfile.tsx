import React from "react";
import addprofile from "../../../../../public/assets/Image/editprofilebusiness.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import useTranslation from "@/app/hooks/useTranslation";

function EditProfile() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const dispatch = useDispatch();
  const { getTranslation } = useTranslation();

  return (
    <div
      className="  flex  flex-col gap-2 cursor-pointer "
      onClick={() => {
        dispatch(showModal("BusinessPorfileUpdateModal"));
      }}
    >
      <div className=" w-[6rem]  h-[6rem]  rounded-lg  flex justify-center items-center  bg-[#FFDCDC]  ">
        <Image
          src={addprofile}
          alt="edit profile"
          className="w-[50%] h-[50%] object-cover rounded-lg"
        />
      </div>
      {/*  lable  */}
      <div
        className={`flex flex-col  items-center  gap-1  font-poppins pt-2   text-[14px] font-medium    2xl:text-B2  ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        } `}
      >
        <p> {getTranslation("Edit", "Edit")} </p>
        <p> {getTranslation("Profile", "Profile")} </p>
      </div>
    </div>
  );
}

export default EditProfile;
