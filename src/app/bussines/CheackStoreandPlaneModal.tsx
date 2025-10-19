"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../public/assets/Image/crossicon.png";
import video from "../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function CheackStoreandPlaneModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.CheackStoreandPlaneModal
  );

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Inside your CheackStoreandPlaneModal component:
  const dispatch = useAppDispatch();

  const router = useRouter();

  const subscriber_user = Cookies.get("subscriber_user");

  const hnadalclic = () => {
    if (Number(subscriber_user) === 1) {
      dispatch(showModal("AddPostModal"));
      dispatch(hideModal("CheackStoreandPlaneModal"));
    } else {
      router.push("/Subscribe");
      dispatch(hideModal("CheackStoreandPlaneModal"));
    }
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={() => dispatch(hideModal("CheackStoreandPlaneModal"))}
      as="div"
      className="z-50"
    >
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${isDarkMode ? " bg-[#2F2F2F] text-white" : "bg-white  text-black"
              }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg  ${isDarkMode ? " bg-[#FFFFFF0A]" : " modalbordercolor"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full"></h3>

              <div
                className="cursor-pointer"
                onClick={() => dispatch(hideModal("CheackStoreandPlaneModal"))}
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
              <h3 className="text-lg  font-medium text-center  2xl:text-H6 font-poppins ">
                You Don’t have data to show{" "}
              </h3>
              <p className="text-sm text-[#565656]   px-[2rem] 2xl:px-[4rem] leading-5 2xl:text-T6 font-normal text-center font-poppins ">
                Complete the profile to get listed in the stores and increase your percentage
              </p>
              <button
                className="px-[3.3rem]  rounded-xl py-[13px]  bg-light-button-base   text-dark-darkcolor  font-poppins   transition"
                onClick={hnadalclic}
              >
                Create Store
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default CheackStoreandPlaneModal;
