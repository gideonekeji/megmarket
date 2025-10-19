import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import React, { useState } from "react";
import "./style.css";
import { useDeleteAccountMutation } from "@/app/storeApp/api/auth/deleteuseraccount";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

function DeleteAccountModal() {
  const modalData = useAppSelector((state) => state.modals.DeleteAccount);
  const user_id = Cookies.get("user_id");
  const dispatch = useAppDispatch();

  // Use the mutation hook for deleting the account
  const [deleteAccount, { isLoading, isSuccess, isError, error }] =
    useDeleteAccountMutation();

  const [isDeleting, setIsDeleting] = useState(false);

  const close = () => {
    dispatch(hideModal("DeleteAccount"));
  };

  const Demo = Cookies.get("demoUser") === "true";


  const handleDeleteAccount = async () => {

    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    if (isDeleting) return; // Prevent multiple clicks while deleting

    setIsDeleting(true);

    try {
      // Call the mutation to delete the account
      const response = await deleteAccount({ user_id: user_id || "" }).unwrap();

      if (response.status) {
        toast.success(response.message); // Show success toast

        // Clear the cookies after account deletion
        Cookies.remove("user_id");

        // Close the modal after successful deletion
        close();
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
        Cookies.remove("detail_id");
        Cookies.remove("from_user_id");
        Cookies.remove("plane_name");
        Cookies.remove("reviewid");
        Cookies.remove("sponcer_id");
        Cookies.remove("subscriber_user");
        Cookies.remove("FormSubmited");
        Cookies.remove("login_token");
        Cookies.remove("nlyticalwebtoken")
        Cookies.remove("businesspaymentsuccess");
        window.location.href = "/";
        dispatch(showModal("loginModal"));
      } else {
        toast.error(response.message || "User account not found");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      close();
    } finally {
      setIsDeleting(false); // Reset isDeleting state after the operation completes
    }
  };

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm  z-50">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="mx-auto h-[15rem] w-[90%] rounded-2xl bg-white  dark:bg-dark-secondarybg shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] md:w-[45%] lg:w-[25%]">
            {/* Top Heading */}
            <div className="deleteac flex w-full items-center justify-center rounded-xl p-4">
              <h3 className="font-poppins text-lg font-medium dark:text-dark-darkcolor text-black">
                Delete Account
              </h3>
            </div>

            {/* Content */}
            <div className="h-auto w-full flex justify-center">
              <p className="font-poppins text-center w-[70%] p-5 text-lg dark:text-dark-darkcolor text-[#000000]">
                Are you sure you want to delete your account?
              </p>
            </div>


            {/* Cancel and Delete Buttons */}
            <div className="mx-auto flex h-auto w-[80%] items-center justify-between gap-6">
              {/* Cancel Button */}
              <button
                onClick={close} // Close the modal on cancel (no API call here)
                className="font-poppins   border   border-light-button-base w-full rounded-md py-3   dark:text-dark-darkcolor text-[#3A3333]"
              >
                Cancel
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDeleteAccount} // Trigger delete account logic only when clicked
                className="font-poppins w-full rounded-md  bg-light-button-base py-3 text-white"
                disabled={isDeleting || isLoading} // Disable button if deleting or loading
              >
                {isDeleting || isLoading ? "Deleting..." : "Delete"}{" "}
                {/* Show loading text */}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
      <ToastContainer />
    </Dialog>
  );
}

export default DeleteAccountModal;
