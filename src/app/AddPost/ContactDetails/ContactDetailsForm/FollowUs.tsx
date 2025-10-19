import React from "react";
import "../../style.css";
import SocilMediaIcon from "./SocilMediaIcon";
import AddWhatsappinkInputBox from "./AddWhatsappinkInputBox";
import AddFacebookprofilelink from "./AddFacebookprofilelink";
import AddInstagramInput from "./AddInstagramInput";
import AddTwitterlink from "./AddTwitterlink";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import { toast } from "react-toastify";
import useTranslation from "@/app/hooks/useTranslation";
import steponebg from "../../../../../public/assets/Image/step1.png"
import Image from "next/image";
import step2 from "../../../../../public/assets/Image/step2.png"


function FollowUs() {
  const dispatch = useAppDispatch();
  const addPostData = useAppSelector((state) => state.AddPost);

  // Validation function
  const validateFields = () => {
    // Check if required fields are empty and show the appropriate toast messages

    if (!addPostData.service_phone) {
      toast.error("Please select service_phone ");
      return false;
    }

    if (!addPostData.service_email) {
      toast.error("Please select service_email ");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    // Validate before submitting
    const isValid = validateFields();
    if (!isValid) return; // If validation fails, stop form submissio

    // Increment add_new_post_steps by 1
    if ((addPostData.add_new_post_steps ?? 0) < 3) {
      dispatch(
        updateAddPostData({
          add_new_post_steps: ((addPostData.add_new_post_steps ?? 0) + 1) as
            | 1
            | 2
            | 3,
        })
      );
    }
  };

  const handlePreviousStep = () => {
    // Decrement add_new_post_steps by 1
    if ((addPostData.add_new_post_steps ?? 0) > 1) {
      dispatch(
        updateAddPostData({
          add_new_post_steps: ((addPostData.add_new_post_steps ?? 0) - 1) as
            | 1
            | 2
            | 3,
        })
      );
    }
  };


  const { getTranslation } = useTranslation();


  return (
    <div className="h-auto w-full">
      {/* heading */}
      <div className="flex w-full items-start justify-start pb-3">
        <h2 className="font-poppins  text-B4 dark:text-dark-darkcolor text-black">
          {getTranslation("Follow Us on", "Follow Us on")}
        </h2>
      </div>

      {/* input box  */}
      <div className=" border  border-[#F0F0F0]  dark:border-dark-border shadow-md w-full rounded-xl p-6">
        <SocilMediaIcon />
        <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <AddWhatsappinkInputBox />
          <AddFacebookprofilelink />
          <AddInstagramInput />
          <AddTwitterlink />
        </div>
      </div>

      {/* Previous btn and next btn */}
      <div className="mx-auto flex w-[90%] flex-col md:flex-row items-center justify-center gap-6 pt-10 xl:w-full">
        <div>
          <button
            type="submit"
            className="flex w-fit items-center justify-between gap-2 rounded-lg bg-light-button-base px-12 py-[14px]"
            onClick={handlePreviousStep}
          >
            <Image
              src={steponebg}
              alt="steponebg"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="font-poppins text-lg font-medium   2xl:text-B3 text-white">
              {getTranslation("Previous", "Previous")}
            </p>
          </button>
        </div>


        <div>
          <button
            type="submit"
            className="flex w-fit items-center justify-between gap-2 rounded-lg bg-light-button-base px-12 py-[14px]"
            onClick={handleNextStep}
          >
            <Image
              src={step2}
              alt="steponebg"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="font-poppins text-lg font-medium   2xl:text-B3 text-white">
              {getTranslation(" Next Step", " Next Step")}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FollowUs;
