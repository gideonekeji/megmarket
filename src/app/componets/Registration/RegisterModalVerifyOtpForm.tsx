"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRegisterModalVerifyOtpMutation } from "../../storeApp/api/auth/RegisterModalVerifyOtp";
import { useResendotpandForgetpwdMutation } from "@/app/storeApp/api/auth/ResendotpandForgetpwd";
import { toast } from "react-toastify";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
function RegisterModalVerifyOtpForm() {
  const [otp, setOtp] = useState(Array(4).fill("")); // Stores OTP as an array of strings
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Get email from global state (assuming it's stored in `state.registration`)
  const email = useAppSelector((state) => state.registration.email);

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

  // Function to handle OTP submission
  const handleSubmit = async () => {
    const otpString = otp.join(""); // Convert OTP array to a string
    try {
      // Call the API mutation with the OTP and email
      const response = await verifyOtp({ email, otp: otpString }).unwrap();

      // Check response status
      if (!response.status) {
        toast.error(
          response.message || "OTP verification failed. Please try again."
        );
        alert("1222");
      } else {
        toast.success("OTP Verified Successfully");
        hideModal("RegisterModalVerifyOtpModal");
        Cookies.set("user_id", response.user_id);
      }
    } catch (err) {
      toast.error("OTP verification failed");
    }
  };

  // Handal Resend the otp request

  const [resendOtp] = useResendotpandForgetpwdMutation();

  // Button click handler
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      // Call the API with the email
      await resendOtp({ email });
      toast.success("OTP Send Successfully ");
      hideModal("RegisterModalVerifyOtpModal");
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  const [timeLeft, setTimeLeft] = useState(60); // Initialize time to 60 seconds

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
            className="w-16 h-16 text-2xl text-center border rounded-lg border-gray-300 focus:ring-2 font-poppins focus:ring-blue-500 focus:border-transparent outline-none"
          />
        ))}
      </div>

      {/* Timing and Resend OTP Section */}
      <div className="flex flex-col items-center justify-center mt-6 gap-2">
        <button
          onClick={handleResendOtp}
          className="font-poppins text-sm text-blue-600"
          disabled={timeLeft > 0}
        >
          Resend OTP
        </button>
        <p className="text-sm text-[#717171] font-poppins">
          Resend OTP in {formattedTime}
        </p>
      </div>

      <div className="flex items-center justify-center mt-6">
        <button
          type="button"
          className="px-[5.5rem] py-3 font-poppins text-white bg-[#226FE4] rounded-xl focus:outline-none hover:bg-[#4184e7] transition duration-200 w-fit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}

export default RegisterModalVerifyOtpForm;
