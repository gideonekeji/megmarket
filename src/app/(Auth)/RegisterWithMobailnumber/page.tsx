"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../../public/assets/Image/loginbgimage.png";
import logo from "../../../../public/assets/Image/logo.png";
import RegistrationForm from "@/app/componets/Registration/RegistrationForm";
import RegisterWithMobilenumber from "@/app/componets/Registration/RegisterWithMobilenumber";
import useTranslation from "@/app/hooks/useTranslation";
import crossicon from "../../../../public/assets/Image/crossicon.png"

export default function RegisterWithMobailnumberModal() {
  const modalData = useAppSelector(
    (state) => state.modals.RegisterWithMobilenumber
  );
  const dispatch = useAppDispatch();
  // modal close
  const handleModalClose = () => {
    dispatch(hideModal("RegisterWithMobilenumber"));
  };

  const { getTranslation } = useTranslation();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode)

  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            style={{
              backgroundImage: `url(${loginbgimage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-[490px] rounded-xl bg-white  px-[20px]   xl:px-[50px]   dark:bg-dark-secondarybg  shadow-[rgba(17,_17,_26,_0.3)_0px_0px_16px] backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            <div
              className="  w-full   relative    flex   items-center  justify-end    cursor-pointer"
              onClick={handleModalClose}
            >
              <div className=" w-8 h-8   absolute right-[-1rem] xl:right-[-3rem]  top-[0.2rem] rounded-full  bg-light-button-base flex justify-center items-center">
                <Image
                  src={crossicon}
                  className={` w-full h-full  ${isDarkMode ? " invert" : ""}`}
                  alt="crossicon"
                />
              </div>
            </div>
            <div className="mb-6 flex w-full flex-col items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                className="h-24 w-[11rem] object-contain"
              />
              <p className="font-poppins mx-auto mt-1 text-T5 px-4 text-center       dark:text-[#B4B4B4] text-[#717171] sm:px-6">
                {getTranslation(
                  "Discover more about our app by registering or logging in.",
                  "Discover more about our app by registering or logging in."
                )}
              </p>
            </div>

            <div className="w-full ">
              <RegisterWithMobilenumber />

              {/* Sign In Link */}
              <div
                className=" py-6 flex items-center justify-center"
                onClick={() => {
                  dispatch(showModal("loginModal"));
                  dispatch(hideModal("RegisterModal"));
                  handleModalClose();
                }}
              >
                <p className="text-sm text-[#717171]">
                  {getTranslation("Do have an account?", "Do have an account?")}
                  <span className="cursor-pointer font-medium pl-1  text-light-button-base">
                    {getTranslation("Sign In", "Sign In")}
                  </span>
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
