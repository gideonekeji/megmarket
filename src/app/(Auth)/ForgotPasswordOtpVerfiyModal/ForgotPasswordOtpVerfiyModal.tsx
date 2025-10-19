"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../../public/assets/Image/loginbgimage.png";
import logo from "../../../../public/assets/Image/logo.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import ForgotPasswordVerifyOtpForm from "@/app/componets/ForgotPassword/ForgotPasswordVerifyOtpForm";
import useTranslation from "@/app/hooks/useTranslation";

export default function ForgotPasswordOtpVerfiyModal() {
  const modalData = useAppSelector(
    (state) => state.modals.ForgotPasswordOtpVerfiyModal
  );
  const dispatch = useDispatch();

  const ForgotPwdEmail = useAppSelector((state) => state.forgotpwd.email);

  // Close modal
  const handleModalClose = () => {
    dispatch(hideModal("ForgotPasswordOtpVerfiyModal"));
  };



  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode)

  const { getTranslation } = useTranslation();


  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
        <div className="flex min-h-full items-center justify-center   bg">
          <DialogPanel
            style={{
              backgroundImage: `url(${loginbgimage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-[490px] rounded-xl bg-white  px-[20px]   xl:px-[50px]    dark:bg-dark-secondarybg  shadow-[rgba(17,_17,_26,_0.3)_0px_0px_16px] backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center   gap-y-4">
              <div className="flex w-full flex-col items-center justify-center">
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

              <h2 className="font-poppins   text-B1 dark:text-dark-darkcolor text-black">
                Verification Code
              </h2>
              <p className="text-center  px-8   dark:text-dark-darkcolor  text-T5 text-[#212121]  font-poppins">
                We have sent the verification code to your email address.
              </p>

              <h3 className="text-center dark:text-dark-darkcolor  text-T7 text-black  font-poppins">
                {ForgotPwdEmail}
              </h3>
            </div>

            <div className="mt-6">
              <ForgotPasswordVerifyOtpForm />
              <div className="flex items-center justify-center py-6">
                <p className="text-sm text-gray-500 font-poppins">
                  Don&apos;t have an account?{" "}
                  <span
                    className="font-medium   text-light-button-base cursor-pointer font-poppins"
                    onClick={() => {
                      dispatch(hideModal("ForgotPasswordOtpVerfiyModal"));
                      dispatch(showModal("RegisterModal"));
                    }}
                  >
                    Sign Up
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
