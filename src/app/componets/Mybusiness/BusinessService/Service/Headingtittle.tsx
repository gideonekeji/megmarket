"use client";

import React from "react";
import "../../businesscss.css";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";
import { reset } from "@/app/storeApp/Slice/toggleSlice";
import { resetAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import Heading from "@/app/componets/Heading/Heading";
function Headingtittle() {
  const dispatch = useDispatch();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  const { getTranslation } = useTranslation();

  return (
    <div className=" w-full justify-center items-center">
      {/*  heading */}


      <div>
        <Heading title="All" highlightedTitle="Services" />
      </div>

      {/*  add service btn  */}
      <div className=" w-full  flex justify-end  items-center">
        <button
          className=" bordercolorservice text-light-button-base px-14 py-3 rounded-xl text-lg font-semibold"
          onClick={() => {
            dispatch(showModal("AddStoreModal"));
            dispatch(reset())
            dispatch(resetAddPostData())
          }}
        >
          {getTranslation("Add Service ", "Add Service ")}
        </button>
      </div>
    </div>
  );
}

export default Headingtittle;
