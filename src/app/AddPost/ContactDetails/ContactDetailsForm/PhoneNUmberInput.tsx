import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import "../../style.css";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice"; // Action to update Redux slice
import Cookies from "js-cookie";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function PhoneNumberInput() {
  const { getTranslation } = useTranslation();

  const dispatch = useDispatch();
  const user_id = Cookies.get("user_id");

  const [triggerUpdateProfile, data] = useUpdateProfileMutation();

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id }).then((response) => {
        if (response?.data) {
          console.log(" my responce api ", response.data.is_store);
          Cookies.set("is_store", response.data?.is_store);
          Cookies.set("store_approval", response.data?.store_approval);
          Cookies.set("service_id", response.data?.service_id);
          Cookies.set("subscriber_user", response.data?.subscriber_user);
          Cookies.set("sponcer_id", response.data.campaign);
          Cookies.set("email", response.data.userdetails.email);
          Cookies.set("mobile", response.data.userdetails.mobile);
          Cookies.set("ispaymentsuccess", response.data.sponser);
          Cookies.set("start_date", response.data.start_date);
          Cookies.set("end_date", response.data.end_date);
          Cookies.set(
            "fullname",
            `${response.data.userdetails.first_name} ${response.data.userdetails.last_name}`
          );
          console.log(
            " my plane  name ",
            response.data.subscriptionDetails.plan_name
          );
          const name =
            response.data?.subscriptionDetails.plan_name.split(" ")[0];
          Cookies.set(
            "plane_name",
            response.data?.subscriptionDetails.plan_name.split(" ")[0]
          );
           Cookies.set("subscription_id", response.data.subscriptionDetails.subscription_id)
        }
      });
    }
  }, [user_id, triggerUpdateProfile]);
  const country_code = data.data?.userdetails.country_code;
  const mobilenumber = data.data?.userdetails.mobile;

  // Check if the mobilenumber contains the country_code, and filter it out if it does
  const filteredMobilenumber =
    mobilenumber && mobilenumber.startsWith(country_code)
      ? mobilenumber.slice(country_code.length)
      : mobilenumber;

  useEffect(() => {
    dispatch(
      updateAddPostData({
        service_phone: filteredMobilenumber,
        service_country_code: country_code,
      })
    );
  }, [filteredMobilenumber, country_code, dispatch]);

  const addPostData = useAppSelector((state) => state.AddPost);

  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");

  // Retrieve service_phone and country_code from Redux state (useSelector)
  const servicePhone = useSelector((state) => state.AddPost.service_phone);
  const countryCodeFromSice = useSelector(
    (state) => state.AddPost.service_country_code
  );

  console.log(" my phone number countryCodeFromSice", phone);

  useEffect(() => {
    if (servicePhone && countryCodeFromSice) {
      // Concatenate the country code with the phone number
      setPhone(`${countryCodeFromSice}${servicePhone}`);
      setCountryCode(countryCodeFromSice);
    }
  }, [servicePhone, countryCodeFromSice]);

  const handlePhoneChange = (value, countryData) => {
    setPhone(value);
    const dialCode = countryData.dialCode;
    const countryNumber = value.replace(dialCode, "").trim();

    dispatch(
      updateAddPostData({
        service_phone: countryNumber,
        service_country_code: `+${dialCode}`,
      })
    );
  };

  return (
    <div>
      <label
        className="font-poppins text-B4    dark:text-dark-darkcolor text-[#000000]"
        htmlFor="mobile"
      >
        {getTranslation("Mobile Number", "Mobile Number")}
        <span className="text-[#F21818] pl-[1px]"> *</span>
      </label>
      <div className="relative mt-1 w-full">
        <PhoneInput
          country={"in"}
          placeholder="Enter phone number"
          value={phone} // Ensuring the value passed is the combined country code and phone number
          onChange={handlePhoneChange}
          enableSearch
        />
      </div>
    </div>
  );
}

export default PhoneNumberInput;
