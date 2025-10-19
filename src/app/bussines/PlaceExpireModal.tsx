"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../public/assets/Image/crossicon.png";
import video from "../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import { useRouter } from "next/navigation";

function PlaceExpireModal() {
  const modalOpen = useAppSelector((state) => state.modals.PlaceExpireModal);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Inside your PlaceExpireModal component:
  const dispatch = useAppDispatch();

  const router = useRouter();

  const hnadalclic = () => {
    dispatch(hideModal("PlaceExpireModal"));
    router.push("/Subscribe");
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={() => dispatch(hideModal("PlaceExpireModal"))}
      as="div"
      className="z-50"
    >
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
              <h3 className="font-poppins text-lg font-medium  text-center w-full"></h3>

              <div
                className="cursor-pointer"
                onClick={() => dispatch(hideModal("PlaceExpireModal"))}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-6 space-y-4">
              <Image
                src={video}
                alt="Loading animation"
                width={100}
                height={100}
              />
              <h3 className="text-lg  font-medium text-center font-poppins ">
                Your Subscription Has Expired
              </h3>
              <p className="text-sm text-[#565656]  mx-auto w-[80%]  font-normal text-center font-poppins ">
                Renew your subscription to continue enjoying uninterrupted
                access to all features.
              </p>
              <button
                className="px-10 py-2 border-[2px] border-light-button-base text-[#226FE4]  font-poppins  rounded-lg hover:bg-blue-100 transition"
                onClick={hnadalclic}
              >
                Renew Subscription
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default PlaceExpireModal;
