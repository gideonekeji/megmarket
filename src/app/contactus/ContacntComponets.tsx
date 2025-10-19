"use client";
import React, { useEffect, useState } from "react";
import "./contactstyle.css";
import Googlemap from "../componets/Googlemap/Googlemap";
import Contactpage from "./Contactpage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  addCustomerSupportRequest,
  addCustomerSupportSuccess,
  addCustomerSupportFailure,
} from "@/app/storeApp/Slice/AddCustomerSupportSlice";
import { useAddCustomerSupportMutation } from "@/app/storeApp/api/add-customersupport";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import Phonenumber from "./Phonenumber";
import { ToastContainer, toast } from 'react-toastify';
import useTranslation from "../hooks/useTranslation";
import imagerounded from "../../../public/assets/Image/linecontact.png";
import Image from "next/image";


function ContacntComponets() {
  const code = sessionStorage.getItem("countryCode");
  const phone = sessionStorage.getItem("countryNumber");

  const Phonenumber12 = `+${code}${phone}`;
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: Phonenumber12,
    message: "",
  });

  const dispatch = useAppDispatch();

  // Mutation hook
  const [trigger, { isLoading, error }] = useAddCustomerSupportMutation();

  // Handle form data change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    try {
      dispatch(addCustomerSupportRequest());

      // Call the API and await the response
      const apiResponse = await trigger(formData);

      // Check if API call was successful
      if (apiResponse?.data) {
        dispatch(addCustomerSupportSuccess(formData));

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Show success alert
        toast.success(apiResponse.data?.message);

        // Clear session storage (Only if API call was successful)
        sessionStorage.removeItem("countryCode");
        sessionStorage.removeItem("countryNumber");
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      dispatch(addCustomerSupportFailure("Failed to submit support request"));

      // Show error alert
      toast.error(error?.data || "Failed to submit support request");
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  console.log("My business is:!!!!!!!!!!!!!!!!!!!!!!!!!!!!", isDarkMode);

  const { getTranslation } = useTranslation();


  return (
    <div
      className={`w-full h-auto mt-[3rem]    ${isDarkMode ? "bg-[#181818]" : "bg-[#ffffff]"
        }`}
    >
      {/* Contact Page */}
      <div
        className={` mx-auto  w-[90%] 2xl:w-[60%] 2xl:ml-[307px] py-4  h-auto rounded-xl grid xl:grid-cols-2 gap-5 items-center p-4  xl:px-6   ${isDarkMode ? " bg-[#2F2F2F]  " : "contactshadow "
          }`}
      >


        {/* Contact Form */}
        <div className="w-full flex flex-col gap-6 py-5 ">
          {/* Heading */}
          <div className=" mx-auto  w-[80%] items-center flex flex-col gap-6 justify-center text-center">
            <h2
              className={`AmericanSign  2xl:text-H2 text-light-button-base  font-medium text-4xl `}
            >
              {getTranslation("Contact Us", "Contact Us")}
            </h2>
            <p
              className={`font-poppins  font-normal text-xl  xl:text-[16px]  ${isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                }`}
            >
              {getTranslation(" Reach out to us with your questions or requests. We are here to assist you!", " Reach out to us with your questions or requests. We are here to assist you!")}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4 xl:gap-5 justify-start"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className={`font-poppins  xl:text-B4 items-center font-normal text-lg  ${isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                  }`}
              >
                {getTranslation("Name", "Name")}
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className={` border-[1px]  w-full p-3 rounded-lg dark:border-none focus:outline-none  font-poppins  ${isDarkMode
                  ? "text-[#000000]  border-[#FFFFFF5C] focus:border-[#FFFFFF] border-[1px]    bg-[#FFFFFF1A]"
                  : "text-[#000000] borderinputbox   focus:border-light-button-base bg-transparent "
                  }`}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className={`font-poppins  xl:text-B4 items-center font-normal text-lg  ${isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                  }`}
              >
                {getTranslation("Email", "Email")}
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={` border-[1px]  w-full p-3 rounded-lg dark:border-none focus:outline-none  font-poppins  ${isDarkMode
                  ? "text-[#000000]  border-[#FFFFFF5C] focus:border-[#FFFFFF] border-[1px]    bg-[#FFFFFF1A]"
                  : "text-[#000000] borderinputbox   focus:border-light-button-base bg-transparent "
                  }`}
                required
              />
            </div>

            <div className=" w-full">
              <Phonenumber />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className={`font-poppins xl:text-B4  items-center font-normal text-lg  ${isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                  }`}
              >
                {getTranslation("Message", "Message")}
              </label>
              <textarea
                id="message"
                placeholder="Write message"
                value={formData.message}
                onChange={handleInputChange}
                className={`border-[1px]  w-full p-3 rounded-lg  dark:border-none focus:outline-none  font-poppins  ${isDarkMode
                  ? "text-[#000000]  border-[#FFFFFF5C] focus:border-[#FFFFFF] border-[1px]    bg-[#FFFFFF1A]"
                  : "text-[#000000] borderinputbox   focus:border-light-button-base bg-transparent "
                  }`}
                rows={1}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className={`px-[5rem] py-[10px] rounded-lg  font-poppins text-lg  focus:outline-none   bg-light-button-base text-dark-darkcolor `}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>



        {/* Google Map */}
        <div className="w-full xl:w-[40.8rem] h-[400px] xl:h-[460px]   mt-[-0.2rem] rounded-lg bg-transparent border-[3px] border-light-button-base relative xl:right-[-70px]">
          <Googlemap />
        </div>
      </div>

      {/* Contact Media */}
      <div className="mx-auto 2xl:w-[71%]     w-[90%] mt-[4rem] relative ">
        <Contactpage />
        <div className="absolute top-[13rem]   left-[-18rem] hidden 2xl:block">
          <Image
            src={imagerounded}
            alt="Rounded Image"
            className="w-[200px] h-[400px] object-cover"
          />
        </div>
      </div>



    </div>
  );
}

export default ContacntComponets;
