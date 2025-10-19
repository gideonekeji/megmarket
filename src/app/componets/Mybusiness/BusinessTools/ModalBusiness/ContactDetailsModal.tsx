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
import "react-phone-input-2/lib/high-res.css";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { useDispatch } from "react-redux";
import PhoneNumberBusiness from "./PhoneNumberBusiness";
import { useUpdateService } from "@/app/storeApp/api/useUpdateService";
import useTranslation from "@/app/hooks/useTranslation";
import { toast, ToastContainer } from "react-toastify";
import { setTrue } from "@/app/storeApp/Slice/toggleSlice";

function ContactDetailsModal() {
  const modalOpen = useAppSelector((state) => state.modals.ContactDetailsModal);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const dispatch = useDispatch();
  const servicedetail = useAppSelector((state) => state.service.service);

  const [updateService, { isLoading, error }] = useUpdateServiceMutation();

  console.log(
    " my phone number and country code ~~~~ ",
    servicedetail.service_phone,
    servicedetail.service_country_code
  );

  // Initialize form data
  const [formData, setFormData] = useState({
    service_phone: servicedetail.service_phone,
    service_country_code: servicedetail.service_country_code,
    email: servicedetail.service_email,
  });

  useEffect(() => {
    setFormData({
      service_phone: servicedetail.service_phone || "",
      service_country_code: servicedetail.service_country_code || "",
      email: servicedetail.service_email || "",
    });
  }, [servicedetail]);

  // Close modal logic
  const close = () => {
    dispatch(hideModal("ContactDetailsModal"));
  };

  console.log(" my phone number and country code ~~~~ !!!!!!", formData);
  const { refetch } = useUpdateService();



  const Demo = Cookies.get("demoUser") === "true";

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior if inside a form


    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    if (!vendor_id || !service_id) {
      console.error("Missing vendor_id or service_id");
      return;
    }

    // Prepare the data to update
    const payload = {
      vendor_id,
      service_id,
      service_phone: formData.service_phone,
      service_country_code: formData.service_country_code,
      service_email: formData.email,
    };

    console.log(" my   payload values ", payload);

    try {
      const response = await updateService(payload).unwrap();
      if (response?.status) {
        // Dispatch to update the Redux store with the new values
        dispatch(
          updateServiceField({
            service_phone: formData.service_phone,
            service_email: formData.email,
            service_country_code: formData.service_country_code,
          })
        );
        refetch();
        dispatch(hideModal("ContactDetailsModal"));
        toast.success("  Contact Details  updated successfully:");
        dispatch(setTrue())

      } else {
        console.error("Failed to update service:", response?.message);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { getTranslation } = useTranslation();

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
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
                {getTranslation("Contact Details", "Contact Details")}
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
                {getTranslation(
                  "Update your contact details to stay in touch with your customers in real time",
                  "Update your contact details to stay in touch with your customers in real time"
                )}{" "}
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto">
              <div className="w-full grid grid-cols-1 gap-4">
                <div className="relative mt-2 w-full">
                  <PhoneNumberBusiness />
                </div>
                <div className="mb-4 w-full">
                  <label className="text-sm font-medium " htmlFor="email">
                    Email
                    <span className="text-[#F21818] pl-[1px]">*</span>
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
                      placeholder="Enter Business Name"
                    />
                  </div>
                </div>
                <div className="w-full justify-center items-center flex">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit} // Trigger handleSubmit when button is clicked

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
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ContactDetailsModal;
