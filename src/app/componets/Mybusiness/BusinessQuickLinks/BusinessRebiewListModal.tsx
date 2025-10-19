"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import BusinessReview from "./BusinessReview";
import crossicon from "../../../../../public/assets/Image/crossicon.png";
import Image from "next/image";


function BusinessRebiewListModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.BusinessRebiewListModal
  );

  const dispatch = useAppDispatch();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("BusinessRebiewListModal"));

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%]  xl:w-[30%]   ${isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
              }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg  ${isDarkMode ? " bg-[#FFFFFF0A]" : " modalbordercolor"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                My Store Reviews
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

            <div className=" w-full p-5 ">
              <BusinessReview />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BusinessRebiewListModal;
