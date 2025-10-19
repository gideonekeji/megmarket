"use client";

import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./style.css";
import Image from "next/image";
import profileImage from "../../../../public/assets/Image/profileicon.png";

function PhonenumberInputbox() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className="w-full mx-auto relative">
      <label
        htmlFor="phone"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        Phone Number
      </label>
      <div className="relative">
        <PhoneInput
          id="phone"
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
          defaultCountry="US"
          international
          className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
          <Image
            src={profileImage}
            alt="Profile Icon"
            className="h-[1.3rem] w-[1.3rem] object-cover"
          />
        </span>
      </div>
    </div>
  );
}

export default PhonenumberInputbox;
