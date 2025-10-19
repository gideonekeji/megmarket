"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useEffect, useState } from "react";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice"; // Import the action
import useTranslation from "@/app/hooks/useTranslation";

function BusinessAddressToolsModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.BusinessAddressToolsModal
  );
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  // Form state for business address
  const [address, setAddress] = useState("");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (vendor_id && service_id) {
      const fetchData = async () => {
        try {
          const response = await updateService({
            vendor_id,
            service_id,
          }).unwrap();
          if (response?.status) {
            setAddress(response?.service?.address || "");
          }
        } catch (err) {
          console.error("API Error:", err);
        }
      };

      fetchData();
    }
  }, [vendor_id, service_id, updateService]);

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("BusinessAddressToolsModal"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent for updating
    const updatedData = {
      vendor_id,
      service_id,
      address: address,
    };

    try {
      // Send update request to the API
      const response = await updateService(updatedData).unwrap();

      if (response?.status) {
        // Dispatch the updateServiceField action to update Redux store
        dispatch(updateServiceField({ address: address }));
        console.log("Service updated successfully:", response);
        dispatch(hideModal("BusinessAddressToolsModal"));
      } else {
        console.log("Failed to update service:", response?.message);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };


  const { getTranslation } = useTranslation();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${
              isDarkMode ? " bg-[#2F2F2F] text-white" : "bg-white  text-black"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg  ${
                isDarkMode ? " bg-[#FFFFFF0A]" : " modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                  {getTranslation("Business Address", "Business Address")}
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="h-auto flex justify-center items-center mx-auto py-6 w-[80%]">
              <div className="flex items-center relative -top-[0.7rem] justify-center h-12 w-12">
                <Image
                  src={infocircle}
                  className="h-4 w-4"
                  alt="Information icon"
                />
              </div>
              <p className="text-[15px] font-normal text-[#226FE4] text-center font-poppins">
                 {getTranslation("Enter the address details that would be used by customers to locate your workplace", "Enter the address details that would be used by customers to locate your workplace")}
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto">
              <form
                onSubmit={handleSubmit}
                className="w-full grid grid-cols-1 gap-4"
              >
                <div className="mb-4 w-full">
                  <label className="text-sm font-medium " htmlFor="address">
                   {getTranslation("Address", "Address")}
                    <span className="text-[#F21818] pl-[1px]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <TextField
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={address} // Bind the value to the state
                      onChange={(e) => setAddress(e.target.value)} // Update the state on change
                      className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
                      fullWidth
                      required
                      style={{ minHeight: "3rem" }}
                    />
                  </div>
                </div>

                <div className="w-full justify-center items-center flex">
                  <button
                    type="submit"
                    className="w-fit px-[5rem] py-3 bg-[#226FE4] rounded-lg font-poppins text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BusinessAddressToolsModal;
