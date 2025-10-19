"use client";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import Cookies from "js-cookie";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import HeadingText from "./HeadingText";
import imagesponcer from "../../../../public/assets/Image/image 2499.png";
import otherImage from "../../../../public/assets/Image/emailicon.png";
import phoneicon from "../../../../public/assets/Image/callSinup.png";
import verify from "../../../../public/assets/Image/verfiy.png";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import { useDispatch } from "react-redux";
import useTranslation from "@/app/hooks/useTranslation";

const ProfileForm: React.FC = () => {
  const user_id = Cookies.get("user_id");
  const [triggerUpdateProfile, { data, isLoading }] =
    useUpdateProfileMutation();
  const login_type = Cookies.get("login_type");

   console.log("login_typelogin_typelogin_type" ,login_type)

  const [profileData, setProfileData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    image: "",
    country_code: "",
  });


  Cookies.set("email", data?.userdetails.email);
  Cookies.set("mobile", data?.userdetails.mobile);
  Cookies.set("service_id", data?.service_id);
  Cookies.set("store_approval", data?.store_approval);
  Cookies.set("is_store", data?.is_store);
  Cookies.set("sponcer_id", data?.campaign);
  Cookies.set("subscriber_user", data?.subscriber_user);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [PhonenumberInputBox, setPhonenumberInputBox] = useState({
    mobile: "",
    country_code: "",
    country: "",
  });

  // dispatch(updateUserDetails(data));

  console.log("phone number121212!!!!!!", imageFile);

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id });
    }
  }, [user_id, triggerUpdateProfile]);

  useEffect(() => {
    if (data?.status) {
      const {
        first_name,
        username,
        last_name,
        email,
        mobile,
        image,
        country_code,
      } = data.userdetails;

      setProfileData({
        username,
        first_name,
        last_name,
        email,
        mobile,
        image,
        country_code,
      });

      // Split the country code for the PhoneInput (without the '+')
      const countryCode = country_code.replace("+", ""); // Removing '+' from the country code

      setPhonenumberInputBox({
        mobile: mobile || "",
        country_code: countryCode || "",
        country: countryCode || "", // Use the country code without '+'
      });

      setImagePreview(image);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const Demo = Cookies.get("demoUser") === "true";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    // Prepare the form data for submission
    const formData = new FormData();
    formData.append("user_id", user_id || "");
    formData.append("first_name", profileData.first_name);
    formData.append("username", profileData.username);
    formData.append("last_name", profileData.last_name);
    formData.append("email", profileData.email);
    formData.append("mobile", PhonenumberInputBox.mobile || "");
    formData.append("country_code", `+${PhonenumberInputBox.country_code}`);

    // Append the image file if it's provided
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Send the form data to the API
    const response = await triggerUpdateProfile(formData);

    console.log(" my api responce values ", response.data?.message);

    if (response.data?.status !== true) {
      toast.error("something went wrong");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return;
    }

    if (response?.data?.status) {
      setProfileData((prevData) => ({
        ...prevData,
        image: response.data.userdetails.image,
      }));
    }

    toast.success(response.data?.message);
    triggerUpdateProfile({ user_id });
    window.location.reload();
  };

  const router = useRouter();

  // console.log("file upload" ,imageFile)

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const sponcer_id = Cookies.get("subscriber_user");

  const { getTranslation } = useTranslation();

  const expire_status = Cookies.get("expire_status");

  const demo = Cookies.get("demo");

  return (
    <div className="flex h-auto w-full flex-col   py-[2rem] md:py-[1rem] gap-6 ">
      {/* heading */}

      <div className="flex w-full items-center pb-4 justify-center gap-4">
        <h3
          className={`AmericanSign   text-H2   text-light-button-base`}
        >
          {getTranslation("Profile", "Profile")}
        </h3>
      </div>

      {/* form */}
      <div className="h-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="flex h-auto w-full flex-col   items-center justify-center"
        >
          {/* profile Image */}
          <div className="relative    right-[-1rem]">
            {/* Profile image section */}
            <div
              className={`profileimageborderocolor hidden h-[8rem] w-[8rem] cursor-pointer rounded-full overflow-hidden ${sponcer_id === "1" ? "ml-1" : ""}`}
              onClick={() => document.getElementById("image").click()} // Trigger input on click
            >
              {imagePreview ? (
                <Image
                  className="h-full w-full object-cover profileimageborderocolor rounded-full"
                  src={imagePreview}
                  alt="Profile Pic"
                  width={128}
                  height={128}
                />
              ) : (
                <div className="h-full w-full flex items-center  justify-center bg-[#226FE475]   text-black text-6xl font-semibold rounded-full">
                  {profileData.username?.[0]?.toUpperCase() || ""}
                </div>
              )}
            </div>
            {/*  image show  */}
            <div className="flex">
              {imagePreview ? (
                <div
                  className={`profileimageborderocolor h-[8rem] w-[8rem] cursor-pointer rounded-full overflow-hidden ${sponcer_id === "1" ? "ml-1" : ""
                    }`}
                  onClick={() => document.getElementById("image").click()}
                >
                  <Image
                    className="h-full w-full object-cover profileimageborderocolor rounded-full"
                    src={imagePreview}
                    alt="Profile Pic"
                    width={128}
                    height={128}
                  />
                </div>
              ) : (
                <div
                  className="h-[8rem] w-[8rem] flex items-center justify-center rounded-full p-[3px]"
                  style={{
                    background: 'linear-gradient(327.99deg, #005AAE 17.81%, #FFFFFF 64.02%)',
                  }}
                >
                  <div
                    className={`h-full w-full flex items-center justify-center bg-[#8AAADA] text-black text-6xl font-semibold rounded-full cursor-pointer ${sponcer_id === "1" ? "ml-1" : ""
                      }`}
                    onClick={() => document.getElementById("image").click()}
                  >
                    {profileData.username?.[0]?.toUpperCase() || ""}
                  </div>
                </div>

              )}
            </div>


            <div
              className="absolute right-0 top-[5rem] h-10 w-10 cursor-pointer rounded-full  p-[3px]"
              onClick={() => document.getElementById("image").click()}
            >
              {/*  if  sponce id 1 then bg black  */}
              <div
                className={`flex h-full w-full items-center justify-center border-white border-2 rounded-full bg-[#226FE4]   ${sponcer_id === "1" ? "   absolute  left-[-4rem] " : ""
                  } 

                ${expire_status === "1" ? "  absolute  left-[-1rem]" : ""
                  }
                
                
                `}
              >
                <FiPlus className="font-poppins text-xl text-white" />
              </div>
            </div>

            {/* <div className="mt-2 cursor-pointer">
              <label
                htmlFor="image"
                className={`font-poppins text-lg font-medium      ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Change Profile
              </label>
            </div> */}

            {/* File input */}
            <input
              type="file"
              id="image"
              name="image"
              className="hidden"
              onChange={handleImageChange} // Handle file change
            />

            {demo && (
              sponcer_id === "1" ? (
                <div
                  className="w-full p-2 left-[-1.5rem] relative md:left-[-1rem] cursor-pointer flex flex-col rounded-lg mt-3 bg-[#226FE417]"
                  onClick={() => {
                    if (expire_status === "1") {
                      router.push("/Subscribe");
                    }
                  }}
                >
                  <div className="w-full justify-center items-center flex gap-2">
                    <Image
                      src={imagesponcer}
                      alt="imagesponcer"
                      className="w-6 h-6"
                    />
                    <h6 className="font-poppins font-medium text-[#226FE4] text-[16px]">
                      {expire_status === "1"
                        ? "Plan Expired"
                        : data?.subscriptionDetails?.plan_name}
                    </h6>
                  </div>
                  {expire_status !== "1" && (
                    <p className="font-poppins text-[16px] text-[#626262]">
                      Expires on {data?.subscriptionDetails?.expire_date}
                    </p>
                  )}
                </div>
              ) : (
                <div
                  className={`font-poppins mt-3 px-2 flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#226FE417] py-2 text-sm font-medium ${isDarkMode ? "text-white" : "text-[#226FE4]"
                    }`}
                  onClick={() => {
                    router.push("/Subscribe");
                  }}
                >
                  Subscription Plan
                </div>
              )
            )}
          </div>

          <div className="mx-auto flex h-auto w-[90%] flex-col gap-6 xl:w-[80%]">
            {/*  username  */}
            <div className="w-full">
              <label
                className={`text-sm font-medium   font-poppins   ${isDarkMode ? "text-white" : "text-[#000000]"
                  }`}
                htmlFor="first_name"
              >
                {getTranslation("Username", "Username")}
              </label>
              <div className="relative mt-1 flex items-center">
                <input
                  type="text"
                  id="username"
                  name="username"
                  // className={`font-poppins  w-full    cursor-not-allowed rounded-md py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]   ${isDarkMode
                  //   ? "text-white  bg-[#373737]  inputboxborder"
                  //   : "text-[#000000] bg-[#226FE421] inputboxborder"
                  //   }`}
                  className={`font-poppins w-full rounded-[10px] py-[14px] pl-4 cursor-not-allowed   bg-[#226FE421]   placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]     focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-none  border-light-bordercolo-maincolor`}

                  placeholder="Enter username"
                  value={profileData.username}
                  onChange={handleChange}
                  disabled
                />
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center text-gray-500">
                  <Image
                    src={verify}
                    className="h-[36%] w-[36%]"
                    alt={"verify"}
                  />
                </div>
              </div>
            </div>
            {/* first name */}
            <div className="w-full">
              <label
                className={`text-sm font-medium     ${isDarkMode ? "text-white" : "text-[#000000]"
                  }`}
                htmlFor="first_name"
              >
                {getTranslation("First Name", "First Name")}
              </label>
              <div className="relative mt-2 flex items-center">
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="input-primary"
                  placeholder="Enter First Name"
                  value={profileData.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* last name */}
            <div className="w-full">
              <label
                className={`text-sm font-medium     ${isDarkMode ? "text-white" : "text-[#000000]"
                  }`}
                htmlFor="last_name"
              >
                {getTranslation("Last Name ", "Last Name")}
              </label>
              <div className="relative mt-2 flex items-center">
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="input-primary"
                  placeholder="Enter Last Name"
                  value={profileData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* email */}
            <div className="w-full">
              <label
                className={`text-sm font-medium     ${isDarkMode ? "text-white" : "text-[#000000]"
                  }`}
                htmlFor="email"
              >
                {getTranslation("Email Address", "Email Address")}
              </label>
              <div className="relative mt-2 flex items-center">
                <input
                  type="email"
                  id="email"
                  name="email"
                  // className={`font-poppins w-full rounded-md py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66] inputboxborder
                  //   ${isDarkMode ? "text-white bg-[#373737]" : "text-[#000000]"}
                  //   ${login_type === "email"
                  //     ? "cursor-not-allowed bg-[#226FE421] "
                  //     : ""
                  //   }`}
                  className={`    ${login_type === "email"
                    ? "cursor-not-allowed bg-[#226FE421] "
                    : "  dark:bg-dark-secondarybg "
                    } font-poppins w-full rounded-[10px] py-[14px] pl-4      placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]     focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-none  border-light-bordercolo-maincolor`}

                  placeholder="Enter Email Address"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={login_type === "email"}
                />
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center text-gray-500">
                  <Image
                    src={login_type === "email" ? verify : otherImage}
                    className="h-[36%] w-[36%]"
                    alt={login_type === "email" ? "verify" : "other"}
                  />
                </div>
              </div>
            </div>

            {/* phone number */}
            <div className="">
              <label
                className={`text-sm font-medium     ${isDarkMode ? "text-white" : "text-[#000000]"
                  }`}
                htmlFor="mobile"
              >
                {getTranslation("Mobile Number", "Mobile Number")}
              </label>
              <div className="bg relative mt-2 w-full">
                <PhoneInput
                  placeholder="Enter phone number"
                  inputStyle={{
                    fontFamily: "Poppins",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    backgroundColor:
                      login_type === "mobile" ?  "#226FE421" : "#FFFFFF",
                  }}
                  value={data?.userdetails.mobile}
                  onChange={(value, data) => {
                    setPhonenumberInputBox({
                      ...PhonenumberInputBox,
                      country_code: data.dialCode,
                      mobile: value,
                      country: data.countryCode,
                    });
                  }}
                  country={PhonenumberInputBox.country || "in"}
                  enableSearch
                  disabled={login_type === "mobile"}
                />

                {/* icon in input box  */}
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center text-gray-500">
                  <Image
                    src={login_type === "mobile" ? verify : phoneicon}
                    className="h-[36%] w-[36%]"
                    alt={login_type === "mobile" ? "verify" : "phoneicon"}
                  />
                </div>
              </div>
            </div>

            {/* submit btn */}
            <div className="flex h-auto w-full items-center justify-center">
              <button
                type="submit"
                className="font-poppins w-fit rounded-lg border-solid border-light-button-base     bg-light-button-base px-[3.5rem] py-2 text-lg font-medium text-white"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Submit "}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileForm;
