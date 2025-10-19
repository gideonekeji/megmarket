import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useUpdateService } from "@/app/storeApp/api/useUpdateService";
import useTranslation from "@/app/hooks/useTranslation";

function PhoneNumberBusiness() {
  const dispatch = useDispatch();
  const { data: detaildata, refetch, isSuccess } = useUpdateService();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  const [phone, setPhone] = useState("");

  // Refetch data on mount
  useEffect(() => {
    refetch();
  }, []);

  // Once data is fetched, update the phone state
  useEffect(() => {
    if (detaildata?.service) {
      const countryCode = detaildata.service.service_country_code?.replace("+", "") || "";
      const servicePhone = detaildata.service.service_phone || "";
      setPhone(`${countryCode}${servicePhone}`);
    }
  }, [detaildata]);

  const handlePhoneChange = (value, countryData) => {
    setPhone(value);

    const countryCode = countryData.dialCode;
    const countryNumber = value.replace(countryCode, "").trim();

    dispatch(
      updateServiceField({
        service_phone: countryNumber,
        service_country_code: `+${countryCode}`,
      })
    );
  };

  return (
    <div>
      <label
        className={`text-sm font-medium ${isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"}`}
        htmlFor="mobile"
      >
        {getTranslation("Mobile Number", "Mobile Number")}
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2 w-full">
        <PhoneInput
          placeholder="Enter phone number"
          value={phone}
          onChange={handlePhoneChange}
          enableSearch
          inputStyle={{
            backgroundColor: isDarkMode ? "#212121" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
}

export default PhoneNumberBusiness;
