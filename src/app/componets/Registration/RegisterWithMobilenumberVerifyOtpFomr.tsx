import { useAppSelector } from "@/app/hooks/hooks";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { useRegisterAccountMutation } from "@/app/storeApp/api/auth/newuser-registeraccount";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import useTranslation from "@/app/hooks/useTranslation";
import { setToken } from "@/app/storeApp/Slice/authSlice";

function RegisterWithMobilenumberVerifyOtpForm() {
  const id = sessionStorage.getItem("serviceId");
  const { getTranslation } = useTranslation();
  const { refetch } = useServiceDetailApi(id);

  const [otp, setOtp] = useState(Array(4).fill("")); // Stores OTP as an array of strings
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  const mobile = useAppSelector((state) => state.registration.mobile);

  const email = useAppSelector((state) => state.registration.email);

  console.log(" my email id ");

  // Handal Resend the otp request
  const [resendOtp] = useRegisterAccountMutation();

  // Button click handler
  // Button click handler for Resend OTP
  const handleResendOtp = async () => {
    if (!mobile && !email) {
      toast.error("Mobile or Email is required");
      return;
    }

    try {
      // Call the API with email if it exists, otherwise send mobile
      const requestData = email ? { email } : { mobile };

      await resendOtp(requestData);
      toast.success("OTP Sent Successfully");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const [timeLeft, setTimeLeft] = useState(60);

  const startCountdown = useCallback(() => {
    // Start countdown if timeLeft is greater than 0
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return timer;
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = startCountdown();

      // Cleanup the timer on component unmount
      return () => clearInterval(timer);
    }
  }, [timeLeft, startCountdown]);

  // Format the time into MM:SS format
  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  const dispatch = useDispatch();

  // Handle OTP input change
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle keydown (Backspace, Delete, and input validation)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target as HTMLInputElement);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };


  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


  // Handle focus on OTP input
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  // Verify OTP function
  // Verify OTP function
  const verifyOtp = async () => {
    // Check if OTP fields are filled
    if (otp.some((digit) => digit.trim() === "")) {
      toast.error("Please fill in all OTP fields.");
      return;
    }

    setIsLoading(true);

    try {
      const requestData = email
        ? { email, otp: otp.join("") }
        : { mobile, otp: otp.join("") };

      const response = await axios.post(`${baseURL}/verify-user`, requestData);

      console.log("My API response values:", response?.data);

      const firstName = (response?.data?.first_name || "").trim();

      console.log("firstNamefirstNamefirstNamefirstName", firstName)

      if (firstName) {
        // ✅ first_name is empty or missing → save data and reload
        Cookies.set("user_id", response?.data?.id);
        Cookies.set("nlyticalwebtoken", response?.data?.token);
        Cookies.set("loginuser", "user_login");
        Cookies.set("login_token", "email_with_phone");
        dispatch(hideModal("RegisterWithMobilenumber"));
        refetch();
        window.location.reload();
      } else {
        // ✅ first_name exists → store token & show modal
        dispatch(setToken(response?.data?.token));
        dispatch(showModal("RegisterWithMobailNumberOtpVerify"));
        dispatch(hideModal("RegisterWithMobilenumber"));
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  // Trigger OTP verification automatically once all OTP fields are filled
  useEffect(() => {
    if (otp.join("").length === otp.length && !isLoading) {
      verifyOtp();
    }
  }, [otp]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-3 md:gap-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onPaste={handlePaste}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="font-poppins h-16 w-16 rounded-lg border  dark:bg-dark-bginput dark:border-none    dark:text-dark-darkcolor border-gray-300 text-center text-2xl outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-2">
        <button
          onClick={handleResendOtp}
          className={`font-poppins text-sm ${timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
            }`}
          disabled={timeLeft > 0}
        >
          {getTranslation("Resend OTP", "Resend OTP")}
        </button>
        <p className="font-poppins text-sm text-[#717171]">
          {getTranslation("Resend OTP in", "Resend OTP in")} {timeLeft}s
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={verifyOtp}
          disabled={isLoading}
          className="font-poppins w-fit rounded-xl bg-[#226FE4] px-[5.5rem] py-3 text-white transition duration-200 hover:bg-[#4184e7] focus:outline-none"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 12a8 8 0 1116 0A8 8 0 014 12z"
              />
            </svg>
          ) : (
            "Verify OTP"
          )}
        </button>
      </div>
    </div>
  );
}

export default RegisterWithMobilenumberVerifyOtpForm;
