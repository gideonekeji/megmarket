"use client";

import React, { useState } from "react";
import emailicon from "../../../../public/assets/Image/loginemailicon.png";
import Image from "next/image";
import { useResendotpandForgetpwdMutation } from "@/app/storeApp/api/auth/ResendotpandForgetpwd";
import { toast } from "react-toastify";
import { setForgotpwd } from "@/app/storeApp/Slice/ForgotpwdSlice";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import useTranslation from "@/app/hooks/useTranslation";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [SendOtpForForgotPassword, { isLoading, error }] =
    useResendotpandForgetpwdMutation();


  const { getTranslation } = useTranslation();

  const dispatch = useDispatch();

  // Button click handler
  const handleSendOtpForgetPwd = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Email validation
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      // Call the API with the email
      const response = await SendOtpForForgotPassword({ email });

      if (response?.data) {
        dispatch(setForgotpwd(response.data));
        dispatch(showModal("ForgotPasswordOtpVerfiyModal"));
        dispatch(hideModal("ForgotPasswordModal"));
        toast.success("OTP Sent Successfully");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("An error occurred while sending OTP");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSendOtpForgetPwd}>
          <div className="mb-5">
            <label
              className="text-sm font-medium   dark:text-dark-darkcolor text-[#000000]"
              htmlFor="email"
            >
              {getTranslation("Email", "Email")}
            </label>
            <div className="relative mt-1 flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`font-poppins w-full rounded-[10px] py-[14px] pl-4 placeholder:text-sm placeholder:font-normal  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
                placeholder="Enter your email"
              />
              <span className="absolute right-2 flex   h-10 w-10 items-center justify-center rounded-full bg-[#B4B4B414]">
                <Image
                  src={emailicon}
                  alt="Email Icon"
                  className="  h-[46%]  w-[46%] object-cover"
                />
              </span>
            </div>
          </div>
          <div className=" py-4 flex items-center justify-center">
            <button
              type="submit"
              className="w-fit rounded-xl signinbox px-[5.5rem] py-3 text-white transition font-poppins duration-200 hover:bg-[#4481db] focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
