import { useAppSelector } from "@/app/hooks/hooks";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import { useDispatch } from "react-redux";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import TimeModalFormValues from "./TimeModalFormValues";
import CloseDay from "./CloseDay";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useTotalPercentage } from "@/app/storeApp/api/useTotalPercentage";
import useTranslation from "@/app/hooks/useTranslation";
import { toast,  } from "react-toastify";

function BusinessTimingsModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.BusinessTimingsModal
  );

  const dispatch = useDispatch();
  const close = () => {
    dispatch(hideModal("BusinessTimingsModal"));
  };

  //  Close day and time data from Redux store
  const openday = useAppSelector((state) => state.service.service.open_days);
  const startTime = useAppSelector((state) => state.service.service.open_time);
  const endTime = useAppSelector((state) => state.service.service.close_time);

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const allDaysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const closedDays = allDaysOfWeek.filter((day) => !openday.includes(day));
  console.log("Closed days:", closedDays.join(", "));

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  console.log(" my opne days", openday);
  const { refetch } = useTotalPercentage(vendor_id);

  const Demo = Cookies.get("demoUser") === "true";


  // Handle Save button click
  const handleSave = async () => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    const businessData = {
      vendor_id,
      service_id,
      open_time: startTime,
      close_time: endTime,
      open_days: openday,
      closed_days: closedDays.join(", "),
    };

    try {
      const response = await updateService(businessData).unwrap();

      if (response) {
        // If response is successful, you might want to show a success message.
        toast.success("Business hours updated successfully!");
        close(); // Close the modal after saving
        refetch();
      }
    } catch (err) {
      // Handle error from the API call
      console.error("Error updating business hours:", err);
      toast.error("Failed to update business hours.");
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  const { getTranslation } = useTranslation();

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[55%]   ${isDarkMode ? "bg-dark-authbgcolor text-white" : "bg-white text-black"
              }`}
          >


            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-lg  ${isDarkMode ? "  bg-dark-Modalbgcolortop" : " modalbordercolor"
                }`}
            >
              <h3 className="font-poppins text-lg 2xl:text-T4 font-medium  text-center w-full">
                {getTranslation("Business Timings", "Business Timings")}
              </h3>

              <div
                className="cursor-pointer"
                onClick={() => dispatch(hideModal("BusinessTimingsModal"))}
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
              <div className="flex items-center relative  justify-center">
                <Image
                  src={infocircle}
                  className="h-4 w-4"
                  alt="Information icon"
                />
              </div>

              <p
                className={`text-[15px]   2xl:text-T8 font-normal text-center font-poppins   text-light-button-base`}
              >
                {getTranslation("Let your customers know when to reach you. You can also configure dual timing slots in a single day.", "Let your customers know when to reach you. You can also configure dual timing slots in a single day.")}
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto flex-col gap-6">
              <TimeModalFormValues />
              <CloseDay />
              {/* Save Button */}
              <div className="flex justify-center mt-8">
              
                <button
                  type="submit"
                  onClick={handleSave}
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
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BusinessTimingsModal;
