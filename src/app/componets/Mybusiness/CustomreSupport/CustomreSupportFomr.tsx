"use client";

import React, { useState } from "react";
import Image from "next/image";
import questionImage from "../.././../../../public/assets/Image/24-support.png";
import dropdownImage from "../../../../../public/assets/Image/dropdwonicon.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { useAddCustomerSupportMutation } from "@/app/storeApp/api/add-customersupport";
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from "@/app/hooks/hooks";
import "./CustomerSupport.css"

function CustomreSupportFomr() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Destructure the mutation hook for adding customer support
  const [addCustomerSupport, { isLoading, isSuccess, isError, error }] =
    useAddCustomerSupportMutation();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !email || !phone || !message) {
      toast.error(" All fields must be provided ");
      return;
    }

    try {
      const response = await addCustomerSupport({
        name,
        email,
        phone,
        message,
      }).unwrap();

      toast.success(" Your message has been sent successfully! ");
      //    clear all fields
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      toast.error(" An error occurred while submitting your support request ");
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="mx-auto 2xl:w-[68%]   rounded-b-lg  shadow-xl w-[90%]   mt-[2rem] gap-5 flex justify-center flex-col items-center cursor-pointer">
      <div
        className={`w-full justify-between items-center businesslable dark:border-none flex h-auto p-8 rounded-xl  ${isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
          }`}
        onClick={toggleAccordion}
      >
        <div className="flex gap-4 items-center">
          <Image
            className={`w-[2rem] h-[2rem] object-contain   ${isDarkMode ? " invert" : ""
              }`}
            src={questionImage}
            alt="question"
          />
          <h5 className="text-lg font-medium font-poppins">Customer Support</h5>
        </div>
        <div className="flex gap-2">
          <Image
            className={`w-[1.5rem] h-[1.5rem] object-contain transition-transform ${isOpen ? "rotate-180" : ""
              }     ${isDarkMode ? " invert" : ""}`}
            src={dropdownImage}
            alt="dropdown"
          />
        </div>
      </div>

      {isOpen && (
        <div
          className={`w-full flex flex-col p-4 md:p-6 justify-start items-start gap-6    ${isDarkMode
            ? "bg-[#2F2F2F]  text-white  rounded-lg"
            : "bg-white text-black"
            }`}
        >
          <div className="mx-auto w-[90%] grid  grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
              <label className="text-sm font-medium " htmlFor="name">
                Name
                <span className="text-[#F21818] pl-[1px]">*</span>
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-[#226FE41A]`}
                  placeholder="Enter First Name"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-sm font-medium " htmlFor="email">
                Email
                <span className="text-[#F21818] pl-[1px]">*</span>
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  border-[#226FE41A] placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  `}
                  placeholder="Enter Email Address"
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="font-poppins text-sm font-medium "
                htmlFor="mobile"
              >
                Mobile Number
                <span className="text-[#F21818] pl-[1px]">*</span>
              </label>
              <div className="relative mt-2 w-full">
                <PhoneInput
                  placeholder="Enter phone number"
                  enableSearch
                  country={"in"}
                  value={phone}
                  onChange={setPhone}
                  inputClass="!w-full  !rounded-lg  !text-black dark:!text-dark-darkcolor !bg-white dark:!bg-dark-secondarybg border border-gray-300 "
                />
              </div>
            </div>

            <div className="h-fit w-full">
              <label
                className="font-poppins text-sm font-medium "
                htmlFor="Message"
              >
                Message
                <span className="text-[#F21818] pl-[1px]">*</span>
              </label>
              <div className="relative mt-1">
                <textarea
                  id="feedback_review"
                  name="feedback_review"
                  className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  resize-none placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-[#226FE41A]`}
                  placeholder="Write Your Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                ></textarea>
              </div>

            </div>
          </div>

          <div className="w-full justify-center items-center flex">

            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className={`w-fit rounded-lg px-[5.5rem] py-3 font-poppins text-white 
                    ${isLoading ? "bg-light-button-base cursor-not-allowed" : "bg-light-button-base"}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                <>
                  Save
                </>
              )}
            </button>

          </div>

          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default CustomreSupportFomr;
