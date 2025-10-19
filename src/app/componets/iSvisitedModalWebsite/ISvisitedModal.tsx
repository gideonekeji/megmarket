"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../bussinescss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import { useDispatch } from "react-redux";

function ISvisitedModal() {
  const modalOpen = useAppSelector((state) => state.modals.iSvisitedModal);

  const dispatch = useDispatch();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("iSvisitedModal"));

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel className="mx-auto pb-6 h-auto w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]">
            <div className="flex w-full items-center justify-between p-4 modalbordercolor font-poppins rounded-b-lg">
              <h3 className="font-poppins text-lg font-medium text-black text-center w-full">
                Business Address
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image src={crossicon} className="h-8 w-8" alt="Close icon" />
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
                Enter the address details that would be used by customers to
                locate your workplace
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto"></div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ISvisitedModal;
