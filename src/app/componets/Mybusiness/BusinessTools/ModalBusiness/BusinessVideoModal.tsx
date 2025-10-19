"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import BusinessVideoForm from "./BusinessVideoForm";
import useTranslation from "@/app/hooks/useTranslation";
import { ToastContainer } from "react-toastify";

function BusinessVideoModal() {
  const modalOpen = useAppSelector((state) => state.modals.BusinessVideoModal);

  const dispatch = useAppDispatch();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("BusinessVideoModal"));

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
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                {getTranslation("Business Video Url", "Business Video Url")}
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8 ${isDarkMode ? " invert" : ""}`}
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
              <BusinessVideoForm />
            </div>
          </DialogPanel>
        </div>

        <ToastContainer />
      </div>
    </Dialog>
  );
}

export default BusinessVideoModal;
