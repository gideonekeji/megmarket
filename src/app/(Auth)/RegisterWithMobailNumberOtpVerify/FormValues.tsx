"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import profileImage from "../../../../public/assets/Image/profileicon.png";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import { FiPlus } from "react-icons/fi";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import { toast } from "react-toastify";
import avatar from "../../../../public/assets/Image/Avatar_img_2.jpg";
import emailicon from "../../../../public/assets/Image/emailiconformailsendfooter.png";
import { useDispatch } from "react-redux";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import verifyCheckIcon from "../../../../public/assets/Image/verfiy.png";
import { useCheackUserNameExit } from "@/app/storeApp/api/auth/useCheackUserNameExit";

function FormValues() {
  const slicevalues = useAppSelector((state) => state.registration);
  const login_type = Cookies.get("login_type");
  const user_id = Cookies.get("user_id");
  const [triggerUpdateProfile, { data, isLoading }] =
    useUpdateProfileMutation();
  const id = sessionStorage.getItem("serviceId");


  const authtoken = useAppSelector((state) => state.auth.token)


  const { refetch } = useServiceDetailApi(id);

  const disptach = useDispatch();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Form states for input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (data?.status) {
      const { image } = data.userdetails;

      setImagePreview(image);
    }
  }, [data]);

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

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id });
    }
  }, [user_id, triggerUpdateProfile]);

  console.log(
    "  my updated profile  api returned@@@@@@@@@@@@@@@@@@@@@@@@@",
    data?.status
  );

  const statusCode = sessionStorage.getItem("statusCode");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // All required fields must be filled, including the image
    if (!firstName || !lastName || !email || !username) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("mobile", slicevalues.mobile);
    formData.append("username", username);
    formData.append("user_id", user_id);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // Assuming triggerUpdateProfile returns a Promise
      const response = await triggerUpdateProfile(formData);
      Cookies.set("loginuser", "user_login");
      refetch();

      // If there’s a status or any specific field to check, you can access it here
      if (response.data?.status === true) {
        disptach(hideModal("RegisterWithMobailNumberOtpVerify"));
        // Log the response values
        Cookies.set("is_store", response.data?.is_store);
        Cookies.set("store_approval", response.data?.store_approval);
        Cookies.set("user_id", response.data?.userdetails.id)
        Cookies.set("nlyticalwebtoken", authtoken || "")
        disptach(hideModal("RegisterWithMobilenumberVerifyOtpModal"))
        disptach(hideModal("RegisterWithMobailNumberOtpVerify"))
        window.location.reload()

        if (response.data?.status) {
          toast.success("Profile updated successfully");
          Cookies.set("nlyticalwebtoken", authtoken || "")


        }
      } else {
        toast.error("Email already exists");
      }

      refetch();
    } catch (error) { }
  };

  const [status, setStatus] = useState(null); // null (default), true (exists), false (available)
  const [message, setMessage] = useState("");
  const checkUsernameMutation = useCheackUserNameExit();

  sessionStorage.setItem("statusCode", status || "");

  console.log(" my status values ", status);

  const handleChangeusername = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    if (newUsername.trim() === "") {
      setStatus(null);
      setMessage("");
      return;
    }

    try {
      const response = await checkUsernameMutation.mutateAsync(newUsername);

      sessionStorage.setItem("username", response?.username);

      setStatus(response.status);
      setMessage(
        response.status ? "Username is available." : " Username already exists."
      );
    } catch (error) {
      console.error("Error checking username:", error);
      setStatus(null);
      setMessage("Something went wrong. Try again.");
    }
  };


  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode)

  return (
    <div className="flex flex-col gap-4 w-full h-auto">
      {/* Profile Image */}
      <div className="relative justify-center items-center w-full flex ">
        <div
          className="profileimageborderocolor h-[8rem] w-[8rem] cursor-pointer rounded-full "
          onClick={() => document.getElementById("image")?.click()}
        >
          <Image
            src={imagePreview || avatar}
            alt={"Profile Image"}
            className="profileimageborderocolor h-full w-full rounded-full object-cover"
            width={128}
            height={128}
          />
        </div>

        {/* File upload button */}
        <div
          className="absolute left-[57%] top-[5.5rem] h-9 w-9 cursor-pointer rounded-full bg-white p-[3px] "
          onClick={() => document.getElementById("image")?.click()}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full  bg-light-button-base">
            <FiPlus className="font-poppins text-xl text-white" />
          </div>
        </div>

        {/* File input */}
        <input
          type="file"
          id="image"
          name="image"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <form onSubmit={handleSubmit} className=" flex  flex-col  gap-6">
        <div className="">
          <label
            className="text-sm font-medium dark:text-dark-darkcolor text-[#000000]"
            htmlFor="username"
          >
            Username
          </label>
          <span className="text-[#F21818] pl-[2px]">*</span>
          <div className="relative mt-1 flex items-center">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChangeusername}
              autoComplete="new-password"
              className={`font-poppins w-full rounded-[10px] py-[14px] pl-4 placeholder:text-sm placeholder:font-normal  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   ${status === false
                ? "border-red-500 " // Username exists → Red border
                : status === true
                  ? "border-green-500 " // Username available → Green border
                  : "border-gray-300 " // Default (no input)
                }  focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
              placeholder="Enter Username"
            />

            {/* Profile/Verification Icon */}
            <span className="absolute   font-poppins  right-2 flex   w-10 h-10 items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={status === true ? verifyCheckIcon : profileImage}
                alt="Status Icon"
                className="  h-[46%]  w-[46%] object-cover"
              />
            </span>
          </div>

          {/* Show message below input */}
          {message && (
            <p
              className={`mt-1 text-sm  font-poppin ${status === false ? "text-red-500" : "text-green-500"
                }`}
            >
              {message}
            </p>
          )}
        </div>
        <div>
          <label
            className="text-sm font-medium dark:text-dark-darkcolor text-[#000000]"

            htmlFor="first_name"
          >
            First Name
            <span className="text-[#F21818] pl-[2px]">*</span>
          </label>
          <div className="relative mt-1 flex items-center">
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-primary"
              placeholder="Enter First Name"
            />
            <span className="absolute right-2 flex    h-10 w-10 items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={profileImage}
                alt="Email Icon"
                className="  h-[46%]  w-[46%] object-cover"
              />
            </span>
          </div>
        </div>

        <div>
          <label
            className="text-sm font-medium dark:text-dark-darkcolor text-[#000000]"

            htmlFor="last_name"
          >
            Last Name
            <span className="text-[#F21818] pl-[2px]">*</span>
          </label>
          <div className="relative mt-1 flex items-center">
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-primary"

              placeholder="Enter Last Name"
            />
            <span className="absolute right-2 flex    h-10 w-10 items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={profileImage}
                alt="Email Icon"
                className="  h-[46%]  w-[46%] object-cover"
              />
            </span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium dark:text-dark-darkcolor text-[#000000]"
            htmlFor="email">
            Email
            <span className="text-[#F21818] pl-[2px]">*</span>
          </label>
          <div className="relative mt-1 flex items-center">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-primary"

              placeholder="Enter Email Address"
            />


            <span className="absolute right-2 flex    h-10 w-10 items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={emailicon}
                alt="Email Icon"
                className={`  h-[46%]  w-[46%] object-cover    ${isDarkMode ? " invert" : ""}`}
              />
            </span>
          </div>
        </div>

        <div className="relative">
          <div className=" flex gap-[2px]">
            <label
              className="text-sm font-medium mb-1  dark:text-dark-darkcolor text-[#000000]"
              htmlFor="username"
            >
              Mobile Number
            </label>
            <span className="text-[#F21818] pl-[2px]">*</span>
          </div>

          <PhoneInput
            placeholder="Enter phone number"
            value={slicevalues.mobile}
            enableSearch
            disabled={login_type === "mobile"}
            inputClass="!w-full !rounded-lg  !text-black dark:!text-dark-darkcolor !bg-white dark:!bg-dark-secondarybg border border-gray-300 "


          />
          {/* <span className="absolute right-2 top-[65%] transform -translate-y-1/2 flex h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full bg-[#B4B4B414]">
            <Image
              src={verifyCheckIcon}
              alt="Phone Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
          </span> */}

          <span className="absolute right-2 flex    top-[40%]  h-10 w-10 items-center justify-center rounded-full bg-[#B4B4B414]">
            <Image
              src={verifyCheckIcon}
              alt="Email Icon"
              className="  h-[46%]  w-[46%] object-cover"
            />
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="w-fit rounded-xl signinbox px-[5.5rem] py-3 text-white transition font-poppins duration-200 hover:bg-[#4481db] focus:outline-none"
          >
            {isLoading ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormValues;
