"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import locationicon from "../../../../../../public/assets/Image/locationmarkericon.png";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { toast, ToastContainer } from "react-toastify";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import Currentlocation from "@/app/AddPost/BusinessDetail/BusinessDetailForm/Currentlocation";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import Cookies from "js-cookie";
import useTranslation from "@/app/hooks/useTranslation";

function CompleteBusinessAddressForm() {
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Make sure both vendor_id and service_id are available before calling the mutation
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  console.log(
    " my api responce  values from add ress modal ",
    data?.service.address
  );

  useEffect(() => {
    localStorage.setItem("locationupdate", data?.service.address || "");
  }, [data]);

  const Addressfromapiresponce = data?.service;

  console.log("Addressfromapiresponce", Addressfromapiresponce);

  const currentlocationvalues = useAppSelector((state) => state.location);

  const defaultCurrentlocation = useAppSelector(
    (state) => state.currentLocation
  );

  const latmycurrentlocationAndSelectedLocationIs = currentlocationvalues.lat
    ? currentlocationvalues.lat
    : Addressfromapiresponce?.lat;

  const lonmycurrentlocationAndSelectedLocationIs = currentlocationvalues.lng
    ? currentlocationvalues.lng
    : Addressfromapiresponce?.lon;

  console.log(
    " my  current location and are is @!@!@@",
    defaultCurrentlocation
  );

  const lastFourWords = Addressfromapiresponce?.address
    .split(" ")
    .slice(-4)
    .join(" ");

  //  in my setAdress slice and counry name and city and state and area
  const locationParts = Addressfromapiresponce?.address
    .split(" ")
    .slice(-5)
    .filter((word) => !/\d/.test(word)); // Remove any word containing numbers

  const country = locationParts
    ? locationParts[locationParts.length - 1] || ""
    : "";

  console.log(" my  state values", country);

  const dispatch = useAppDispatch();

  console.log("my api responce values area", Addressfromapiresponce?.area);

  const [area, setArea] = useState("");
  const [cityName, setCityName] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    setArea(data?.service?.area || "");
    setCityName(data?.service?.city || "");
    setAddress(data?.service.address || "");
    setState(data?.service.state || "");
  }, [data]);

  console.log("  my  input values", area);

  const Demo = Cookies.get("demoUser") === "true";


  // Update Redux store when form changes
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    //  Dispatch redux actions to save address data in the store
    dispatch(
      updateAddPostData({
        state: state,
        country: country,
        address: address,
        lon: (lonmycurrentlocationAndSelectedLocationIs ?? "").toString(),
        lat: (latmycurrentlocationAndSelectedLocationIs ?? "").toString(),
      })
    );

    // Creating a FormData object and appending the necessary fields
    const formData = new FormData();
    formData.append("vendor_id", vendor_id); // Make sure `vendor_id` exists
    formData.append("service_id", service_id); // Make sure `service_id` exists
    formData.append("area", area); // Pass the area value (make sure `area` exists)
    formData.append("city", cityName);
    formData.append("state", state);
    // You can add other fields to `formData` as needed
    formData.append("address", address);
    formData.append(
      "lat",
      (latmycurrentlocationAndSelectedLocationIs ?? "").toString()
    );
    formData.append(
      "lon",
      (lonmycurrentlocationAndSelectedLocationIs ?? "").toString()
    );

    try {
      // Trigger the API mutation with the FormData
      const response = await updateService(formData).unwrap();

      // Handle success (if the mutation is successful)
      if (response) {
        toast.success("Address saved successfully!");
        dispatch(hideModal("CompleteBusinessModal"));

        console.log(
          " my api responce from update business address",
          response.service.address
        );
        localStorage.setItem("locationupdate", response.service.address || "");
      }
    } catch (err) {
      // Handle error (if the mutation fails)
      console.error("Error saving address:", err);
      toast.error("Failed to save address.");
    }
  };


  const { getTranslation } = useTranslation();

  return (
    <div className="grid h-auto w-full grid-cols-1 gap-6    ">
      {/* address detail box  */}
      <div className="step-container1   border dark:border-dark-border  flex flex-col gap-4 rounded-lg p-5">

        <div className="hidden">
          <Currentlocation />
        </div>
        <div className="flex w-full items-center justify-start">
          <h4 className="font-poppins text-lg font-medium text-black   dark:text-dark-darkcolor">
            {currentlocationvalues.selectedLocation
              ? currentlocationvalues.selectedLocation
              : lastFourWords}
          </h4>
        </div>
        {/* image location marker */}
        <div className="flex w-full items-center gap-4">
          <Image
            src={locationicon}
            alt="Location Icon"
            width={30}
            height={30}
          />
          <h4 className="font-poppins text-[#8E8E93]">
            {currentlocationvalues.selectedLocation
              ? currentlocationvalues.selectedLocation
              : Addressfromapiresponce?.address}
          </h4>
        </div>
      </div>

      {/* form values */}
      <form className="flex w-full flex-col gap-6" onSubmit={handleSaveAddress}>
        {/* Address */}
        <div>
          <label
            className="flex gap-[2px] text-sm font-medium  dark:text-dark-darkcolor text-[#000000]"

            htmlFor="address"
          >
            <span> {getTranslation("Address (House No, Building, Street)", "Address (House No, Building, Street)")}</span>
            <span className="h-1 w-1 rounded-full text-red-600">*</span>
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl   placeholder:font-normal dark:text-dark-darkcolor   mt-2  border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"

            placeholder="Enter Full Address"
            required
          />
        </div>

        {/* Area */}
        <div>
          <label
            className="flex gap-[2px] text-sm font-medium  dark:text-dark-darkcolor text-[#000000]"

            htmlFor="area"
          >
            <span>  {getTranslation("Area", "Area")}</span>
            <span className="h-1 w-1 rounded-full text-red-600">*</span>
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-xl   placeholder:font-normal dark:text-dark-darkcolor   mt-2  border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
            placeholder="Enter Area Name"
            required
          />
        </div>

        {/* City & State */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* City */}
          <div>
            <label
              className="flex gap-[2px] text-sm font-medium  dark:text-dark-darkcolor text-[#000000]"

              htmlFor="city"
            >
              <span>  {getTranslation("City", "City")}</span>
              <span className="h-1 w-1 rounded-full text-red-600">*</span>
            </label>
            <input
              type="text"
              id="city"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="w-full rounded-xl   placeholder:font-normal dark:text-dark-darkcolor   mt-2  border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
              placeholder="City"
              required
            />
          </div>

          {/* State */}
          <div>
            <label
              className="flex gap-[2px] text-sm font-medium  dark:text-dark-darkcolor text-[#000000]"

              htmlFor="state"
            >
              <span>  {getTranslation("State", "State")}</span>
              <span className="h-1 w-1 rounded-full text-red-600">*</span>
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-xl   placeholder:font-normal dark:text-dark-darkcolor   mt-2  border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[14px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
              placeholder="State"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mx-auto flex w-[70%] items-center justify-center">



          <button
            type="submit"
            disabled={isLoading}
            className={`w-fit px-[5rem] py-3 rounded-lg font-poppins text-white 
      ${isLoading ? "bg-light-button-base cursor-not-allowed" : "bg-light-button-base"}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                  ></path>
                </svg>
                {getTranslation("Loading...", "Loading...")}
              </span>
            ) : (
              getTranslation("Save Address", "Save Address")
            )}
          </button>
        </div>
      </form>

    </div>
  );
}

export default CompleteBusinessAddressForm;
