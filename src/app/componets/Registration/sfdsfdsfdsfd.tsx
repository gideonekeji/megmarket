"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRegisterModalVerifyOtpMutation } from "../../storeApp/api/auth/RegisterModalVerifyOtp";
import { toast } from "react-hot-toast";
import { useRegisterAccountMutation } from "@/app/storeApp/api/auth/newuser-registeraccount";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

function RegisterWithMobilenumberVerifyOtpForm() {
  const [otp, setOtp] = useState(Array(4).fill("")); // Stores OTP as an array of strings
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const mobile = useAppSelector((state) => state.registration.mobile);

  const dispatch = useDispatch();

  // Get the mutation hook for verifying OTP
  const [verifyOtp, { isLoading, error }] = useRegisterModalVerifyOtpMutation();

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

  // Function to handle OTP submission automatically
  const handleSubmit = async () => {
    const otpString = otp.join(""); // Convert OTP array to a string
    try {
      // Call the API mutation with the OTP and mobile
      const response = await verifyOtp({ mobile, otp: otpString });

      // Log the full API response to check the values
      console.log("API response: otp verify", response);

      // If there is no status or an error in the response, show error
      if (!response.status) {
        toast.error(
          response.message || "OTP verification failed. Please try again."
        );
      } else {
        toast.success("OTP Verified Successfully");

        dispatch(hideModal("RegisterWithMobilenumberVerifyOtpModal"));
        dispatch(hideModal("RegisterWithMobilenumber"));
        Cookies.set("user_id", response.user_id);
        dispatch(showModal("RegisterWithMobailNumberOtpVerify"));
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      toast.error("OTP verification failed");
    }
  };

  // Handal Resend the otp request
  const [resendOtp] = useRegisterAccountMutation();

  // Button click handler
  const handleResendOtp = async () => {
    if (!mobile) {
      toast.error("Mobile is required");
      return;
    }

    try {
      // Call the API with the mobile
      await resendOtp({ mobile });
      toast.success("OTP Sent Successfully");
    } catch (error) {
      console.error("Error resending OTP:", error);
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

  // Check if OTP is completely entered
  const isOtpComplete = otp.every((digit) => digit !== "");

  useEffect(() => {
    if (isOtpComplete && !isLoading) {
      console.log(isOtpComplete,"isOtpComplete");
      
      handleSubmit(); // Automatically call the API when OTP is fully entered
    }
  }, [isOtpComplete, otp, isLoading]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-6">
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
            className="font-poppins h-16 w-16 rounded-lg border border-gray-300 text-center text-2xl outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-2">
        <button
          onClick={handleResendOtp}
          className="font-poppins text-sm text-blue-600"
          disabled={timeLeft > 0}
        >
          Resend OTP
        </button>
        <p className="font-poppins text-sm text-[#717171]">
          Resend OTP in {formattedTime}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <button
          type="button"
          className="font-poppins w-fit rounded-xl bg-[#226FE4] px-[5.5rem] py-3 text-white transition duration-200 hover:bg-[#4184e7] focus:outline-none"
          onClick={handleSubmit}
          disabled={isLoading || !isOtpComplete} // Disable if OTP is not complete
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

export default RegisterWithMobilenumberVerifyOtpForm;
