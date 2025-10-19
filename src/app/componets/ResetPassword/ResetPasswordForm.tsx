"use client";

import React, { useState } from "react";
import pwdicon from "../../../../public/assets/Image/lockicon.png";
import eyeOpenIcon from "../../../../public/assets/Image/unlock.png"; // Make sure to have this icon
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useResetpasswordMutation } from "@/app/storeApp/api/auth/Resetpassword";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";

const ResetPasswordForm = () => {
  const [resetPassword, { isLoading }] = useResetpasswordMutation();
  const email = useAppSelector((state) => state.forgotpwd.email);

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const [passwordCriteria, setPasswordCriteria] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    minLength: false,
  });

  // Password change handler
  const handlePasswordChange = (value: string) => {
    setPassword(value);

    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);
    const hasMinLength = value.length >= 8;

    setPasswordCriteria({
      lowercase: hasLowercase,
      uppercase: hasUppercase,
      number: hasNumber,
      specialChar: hasSpecialChar,
      minLength: hasMinLength,
    });

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (value === "") {
      setPasswordValid(null);
    } else {
      setPasswordValid(passwordRegex.test(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);
    if (!allCriteriaMet) {
      toast.error("Password must be strong and secure");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const payload = { email, password, confirm_password: confirmPassword };
      await resetPassword(payload).unwrap();
      dispatch(showModal("loginModal"));
      dispatch(hideModal("ResetPasswordModal"));
      toast.success("Password reset successfully.");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Password Field */}
        <div className="mb-5">
          <label
            className="text-sm font-poppins font-medium dark:text-dark-darkcolor text-[#000000]"
            htmlFor="password"
          >
            New Password<span className="text-[#FF0000]"> *</span>
          </label>
          <div className="relative mt-[6px] flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className={`font-poppins w-full rounded-[10px] py-[14px] pl-4
                ${passwordValid === null
                  ? "border-gray-300"
                  : passwordValid
                    ? "border-green-500 focus:ring-green-500"
                    : "border-red-500 focus:ring-red-500"
                }
                dark:text-dark-darkcolor placeholder-[#B4B4B4] placeholder:text-sm placeholder:font-normal
                dark:bg-dark-bginput focus:border-light-bordercolo-focusbordercolo
                focus:outline-none focus:ring-[#226FE480]
                border dark:border-dark-bordercolorinput border-light-bordercolo-maincolor`}
              placeholder="Enter your password"
            />
            <span
              className="absolute right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#B4B4B414]"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                src={showPassword ? eyeOpenIcon : pwdicon}
                alt="Toggle Password Visibility"
                className="h-[46%] w-[46%] object-cover"
              />
            </span>
          </div>

          {/* Password Criteria */}
          <div className="mt-2 text-sm font-normal">
            <p
              className={`font-poppins ${passwordCriteria.lowercase ? "text-green-500" : "text-gray-500"
                }`}
            >
              {passwordCriteria.lowercase ? "✅" : "❌"} Contains a lowercase letter
            </p>
            <p
              className={`font-poppins ${passwordCriteria.uppercase ? "text-green-500" : "text-gray-500"
                }`}
            >
              {passwordCriteria.uppercase ? "✅" : "❌"} Contains an uppercase letter
            </p>
            <p
              className={`font-poppins ${passwordCriteria.number ? "text-green-500" : "text-gray-500"
                }`}
            >
              {passwordCriteria.number ? "✅" : "❌"} Contains a number
            </p>
            <p
              className={`font-poppins ${passwordCriteria.specialChar ? "text-green-500" : "text-gray-500"
                }`}
            >
              {passwordCriteria.specialChar ? "✅" : "❌"} Contains a special character (@$!%*?&)
            </p>
            <p
              className={`font-poppins ${passwordCriteria.minLength ? "text-green-500" : "text-gray-500"
                }`}
            >
              {passwordCriteria.minLength ? "✅" : "❌"} At least 8 characters long
            </p>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-5">
          <label
            className="text-sm font-poppins font-medium dark:text-dark-darkcolor text-[#000000]"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="font-poppins w-full rounded-[10px] py-[14px] pl-4 placeholder:text-sm placeholder:font-normal
                dark:text-dark-darkcolor placeholder-[#B4B4B4] dark:bg-dark-bginput
                focus:border-light-bordercolo-focusbordercolo focus:outline-none
                focus:ring-[#226FE480] border dark:border-dark-bordercolorinput border-light-bordercolo-maincolor"
              placeholder="Confirm your password"
            />
            <span
              className="absolute right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#B4B4B414]"
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            >
              <Image
                src={pwdicon}
                alt="Toggle Confirm Password Visibility"
                className="h-[46%] w-[46%] object-cover"
              />
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="w-fit rounded-xl signinbox px-[5.5rem] py-3 text-white transition font-poppins duration-200 hover:bg-[#4481db] focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
