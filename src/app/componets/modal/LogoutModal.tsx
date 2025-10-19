import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import "./style.css";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

function LogoutModal() {
  const modalData = useAppSelector((state) => state.modals.LogoutModal);

  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(hideModal("LogoutModal"));
  };

  const Demo = Cookies.get("demoUser") === "true";


  const handalLogout = () => {

    // if (Demo) {
    //   toast.error("This action is disabled in the demo version.");
    //   return;
    // }
    // Add your logout logic here
    toast.success("Logged out successfully!");
    Cookies.remove("user_id");
    Cookies.remove("is_store");
    Cookies.remove("store_approval");
    Cookies.remove("loginuser");
    Cookies.remove("service_id");
    Cookies.remove("country_code");
    Cookies.remove("email");
    Cookies.remove("mobile");
    Cookies.remove("login_type");
    Cookies.remove("first_name");
    Cookies.remove("campaign_id");
    Cookies.remove("detail_id");
    Cookies.remove("from_user_id");
    Cookies.remove("lat");
    Cookies.remove("lng");
    Cookies.remove("plane_name");
    Cookies.remove("sponcer_id");
    Cookies.remove("subscriber_user");
    Cookies.remove("login_token");
    Cookies.remove("businesspaymentsuccess");
    Cookies.remove("nlyticalwebtoken")
    dispatch(hideModal("LogoutModal"));
    window.location.href = "/";
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-[14rem] w-[90%] rounded-2xl bg-white   dark:bg-dark-secondarybg shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%]  xl:w-[30%] 2xl:w-[25%]   ${isDarkMode ? "bg-[#2F2F2F]" : "bg-[#FFFFFF]"
              }`}
          >
            {/* Top Heading */}
            <div
              className={` flex h-auto w-full items-center justify-center rounded-xl p-4  ${isDarkMode
                ? "text-[#FFFFFF] shadow-lg  bg-[#FFFFFF0A] "
                : "text-[#000000] deleteac"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium text-black    dark:text-dark-darkcolor ">
                Logout
              </h3>
            </div>

            {/* Content */}
            <div className="h-auto w-full flex justify-center items-center p-5">
              <p
                className={`font-poppins text-lg text-center ${isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
                  }`}
              >
                Are you sure you want to Logout?
              </p>
            </div>


            {/* Cancel and Delete Buttons */}
            <div className="mx-auto flex h-auto w-[80%] items-center justify-between gap-6">
              {/* Cancel Button */}
              <button
                onClick={close} // Close the modal on cancel
                className={` font-poppins w-full rounded-xl py-3   ${isDarkMode
                  ? "text-[#FFFFFF]   applanguagebordercolor11  "
                  : "text-[#000000] applanguagebordercolor "
                  }`}
              >
                Cancel
              </button>

              {/* Delete Button */}
              <button
                className="font-poppins w-full rounded-md bg-[#226FE4] py-3 text-white"
                onClick={handalLogout}
              >
                Logout
              </button>
            </div>
          </DialogPanel>
        </div>
        <ToastContainer />
      </div>
    </Dialog>
  );
}

export default LogoutModal;
