import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useAppSelector } from "../hooks/hooks";
import useTranslation from "../hooks/useTranslation";

function Phonenumber() {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value, countryData) => {
    setPhone(value);
    // The country code is available from the countryData object
    const countryCode = countryData.dialCode; // The dialing code (e.g. +1 for US)
    const countryNumber = value.replace(countryCode, "").trim(); // Removing the country code from the phone number

    console.log("Country Code:", countryCode);
    console.log("Country Number:", countryNumber);
    sessionStorage.setItem("countryCode", countryCode);
    sessionStorage.setItem("countryNumber", countryNumber);
  };
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  return (
    <div className=" bg-transparent">
      <label
        htmlFor="Phone Number"
        className={`font-poppins  xl:text-B4  items-center font-normal text-lg  ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        }`}
      >
        {getTranslation("Phone Number", "Phone Number")}
      </label>
      <PhoneInput
        country={"in"}
        value={phone}
        onChange={handlePhoneChange}
        enableSearch
        className={`border-[1px]  dark:border-none  w-full mt-1 rounded-lg focus:outline-none  font-poppins  ${
          isDarkMode
            ? "text-[#000000]   border-[#FFFFFF5C] focus:border-[#FFFFFF]  border-[1px]    bg-[#FFFFFF1A]"
            : "text-[#000000] borderinputbox   focus:border-light-button-base bg-transparent "
        }`}
        placeholder="Enter your phone number"
        inputStyle={{ fontSize: "16px" }}
        inputExtraProps={{
          autoComplete: "off",
        }}
        inputStyle={{
          fontSize: "16px",
          color: isDarkMode ? "#FFFFFF" : "#000000",
          transition: "all 200ms ease-in-out",
          borderRadius: "8px",
          boxShadow: "0px 0px 4px rgba(0, 70, 174, 0.2)",

          borderColor: isDarkMode ? "#FFFFFF5C" : "#226FE4",
          backgroundColor: "transparent",
          fontFamily: "Poppins, sans-serif",
        }}
      />
    </div>
  );
}

export default Phonenumber;
