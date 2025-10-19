"use client";
import Image from "next/image";
import { useState, FormEvent } from "react";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import "./style.css";
import callicon from "../../../../public/assets/Image/callSinup.png";
import { useRegisterAccountMutation } from "../../storeApp/api/auth/newuser-registeraccount";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { toast } from "react-toastify";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { setUserRegistration } from "@/app/storeApp/Slice/RegistrationSlice";
import Cookies from "js-cookie";
import useTranslation from "@/app/hooks/useTranslation";

interface PhoneNumberState {
  mobile: string;
  country_code: string;
  country: string;
}

interface RegisterAccountResponse {
  success: boolean;
  data: any;
  login_type: string;
  is_store?: boolean;
}

function RegisterWithMobilenumber() {
  const [PhonenumberInputBox, setPhonenumberInputBox] = useState<PhoneNumberState>({
    mobile: "",
    country_code: "",
    country: "in",
  });

  const [phoneInputKey, setPhoneInputKey] = useState(0); // to force re-render PhoneInput

  const dispatch = useAppDispatch();
  const [registerAccount, { isLoading }] = useRegisterAccountMutation();
  const demoCredentials = {
    mobile: "14673974998",
    country_code: "1",
    country: "us",
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!PhonenumberInputBox.mobile || !PhonenumberInputBox.country_code) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    const PhoneNumber = `+${PhonenumberInputBox.mobile}`;
    const code = `+${PhonenumberInputBox.country_code}`;

    try {
      const response: RegisterAccountResponse = await registerAccount({
        mobile: PhoneNumber,
        country_code: code,
        role: "user",
      }).unwrap();

      Cookies.set("login_type", response.login_type);
      dispatch(setUserRegistration(response));
      toast.success("OTP sent successfully!");
      dispatch(showModal("RegisterWithMobilenumberVerifyOtpModal"));
      dispatch(hideModal("RegisterModal"));
      dispatch(hideModal("RegisterWithMobilenumber"));
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error("Registration Error:", err);
    }
  };

  const { getTranslation } = useTranslation();

  return (
    <div className="h-auto w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="text-sm font-medium text-[#000000]  dark:text-dark-darkcolor" htmlFor="mobile">
            {getTranslation("Mobile Number", "Mobile Number")}
          </label>
          <div className="relative mt-2">
            <PhoneInput
              key={phoneInputKey}
              placeholder="Enter phone number"
              value={PhonenumberInputBox.mobile}
              country={PhonenumberInputBox.country || "in"}
              enableSearch
              onChange={(value: string, data: any) => {
                const updatedPhoneNumber: PhoneNumberState = {
                  mobile: value,
                  country_code: data.dialCode,
                  country: data.countryCode,
                };
                setPhonenumberInputBox(updatedPhoneNumber);
              }}
              inputClass="!w-full !rounded-lg  !text-black dark:!text-dark-darkcolor !bg-white dark:!bg-dark-secondarybg border border-gray-300 "
            />
            <span className="absolute right-2 top-1/2 flex     h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={callicon}
                alt="Phone Icon"
                className="  h-[46%]  w-[46%] object-cover"
              />
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="signinbox font-poppins w-fit rounded-xl px-[5.5rem] py-3 text-white transition duration-200 hover:bg-[#4481db] focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Get OTP..." : "Get OTP"}
          </button>
        </div>

        {/* Demo Detail Section */}
        {/* Demo Detail Section */}
        <div className="w-full rounded-lg flex-col flex mt-6 gap-[2px]">
          <div className="w-full rounded-t-lg p-4 bg-[#226FE438]">
            <h5 className="text-[15px] font-semibold   dark:text-dark-darkcolor text-black font-poppins">For Demo</h5>
          </div>
          <div className="flex justify-between p-4 rounded-b-lg bg-[#226FE438] items-start gap-4">
            <div className="flex flex-col gap-2 w-full font-poppins text-sm dark:text-dark-darkcolor text-black">
              <div className="flex items-center gap-2">
                <span className="font-medium">Mobile Number :</span> +1 4673974998
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Otp:</span> 1234
              </div>
            </div>

            <div
              className="text-[#000] dark:text-dark-darkcolor cursor-pointer mt-1"
              onClick={() => {
                const fullDemoNumber = demoCredentials.mobile;
                const demoText = `Mobile: +${demoCredentials.country_code}${fullDemoNumber}\nOTP: 1234`;

                navigator.clipboard.writeText(demoText);

                setPhonenumberInputBox({
                  mobile: fullDemoNumber,
                  country_code: demoCredentials.country_code,
                  country: demoCredentials.country,
                });

                setPhoneInputKey((prev) => prev + 1);
              }}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-xl"
                height="1.2em"
                width="1.2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path>
                <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path>
              </svg>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}

export default RegisterWithMobilenumber;
