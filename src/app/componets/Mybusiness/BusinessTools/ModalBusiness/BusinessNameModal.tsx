"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useEffect, useState } from "react";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice"; // Import updateServiceField from slice
import useTranslation from "@/app/hooks/useTranslation";
import { toast } from "react-toastify"
import BusinessDescriptionUpdateNewVersion from "./BusinessDescriptionUpdateNewVersion";
function BusinessNameModal() {
  const modalOpen = useAppSelector((state) => state.modals.BusinessNameModal);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  // Form state for business name and description
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();


  useEffect(() => {
    if (vendor_id && service_id) {
      const fetchData = async () => {
        try {
          const response = await updateService({
            vendor_id,
            service_id,
          }).unwrap();
          if (response?.status) {
            setServiceName(response?.service?.service_name || "");
            setServiceDescription(response?.service?.service_description || "");
          }
        } catch (err) {
          console.error("API Error:", err);
        }
      };

      fetchData();
    }
  }, [vendor_id, service_id, updateService]);

  // Inside your BusinessNameModal component:
  const dispatch = useAppDispatch();
  const Demo = Cookies.get("demoUser") === "true";
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    const updatedData = {
      vendor_id,
      service_id,
      service_name: serviceName,
      service_description: serviceDescription,
    };

    try {
      const response = await updateService(updatedData).unwrap();

      if (response?.status) {
        console.log("Service updated successfully:", response);
        toast.success("  Business Name  updated successfully:");

        // Dispatch action to update the Redux store with the updated service name and description
        dispatch(
          updateServiceField({
            service_name: serviceName,
            service_description: serviceDescription,
          })
        );
        // Dispatch action to hide the modal
        dispatch(hideModal("BusinessNameModal"));
      } else {
        console.log("Failed to update service:", response?.message);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };


  const { getTranslation } = useTranslation();

  return (
    <Dialog
      open={modalOpen}
      onClose={() => dispatch(hideModal("BusinessNameModal"))}
      as="div"
      className="z-50"
    >
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto     w-full max-w-[490px]  rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out   ${isDarkMode ? "   bg-dark-authbgcolor text-white" : "bg-white  text-black"
              }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-lg  ${isDarkMode ? "  bg-dark-Modalbgcolortop" : " modalbordercolor"
                }`}
            >
              <h3 className="font-poppins text-lg 2xl:text-T4 font-medium  text-center w-full">
                {getTranslation("Business Name", "Business Name")}
              </h3>

              <div
                className="cursor-pointer"
                onClick={() => dispatch(hideModal("BusinessNameModal"))}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="h-auto   flex justify-center gap-1 items-center mx-auto py-6 w-[75%]">
              <div className="flex items-center relative   -top-[0.7rem] justify-center">
                <Image
                  src={infocircle}
                  className="h-4 w-6"
                  alt="Information icon"
                />
              </div>

              <p
                className={`text-[15px]   2xl:text-T8 font-normal text-center font-poppins   text-light-button-base`}
              >
                {getTranslation("Enter your business name exactly how you would like it to look to all users.", "Enter your business name exactly how you would like it to look to all users.")}
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto">
              <form
                onSubmit={handleSubmit}
                className="w-full grid grid-cols-1 gap-4"
              >
                <div className="mb-4 w-full">
                  <label
                    className="text-sm font-medium "
                    htmlFor="service_name"
                  >
                    {getTranslation("Business Name", "Business Name")}
                    <span className="text-[#F21818] pl-[1px]">*</span>
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
                      placeholder="Enter Business Name"
                    />
                  </div>
                </div>

                <div className="h-fit mb-4 w-full">
                  <BusinessDescriptionUpdateNewVersion
                    value={serviceDescription}
                    onChange={(val) => setServiceDescription(val)}
                  />
                </div>

                <div className="w-full justify-center items-center flex">
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
                      getTranslation("Save", "Save")
                    )}
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

export default BusinessNameModal;
