"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../../public/assets/Image/loginbgimage.png";
import logo from "../../../../public/assets/Image/logo.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import RegisterWithMobilenumberVerifyOtpForm from "@/app/componets/Registration/RegisterWithMobilenumberVerifyOtpFomr";
import useTranslation from "@/app/hooks/useTranslation";

export default function RegisterWithMobilenumberVerifyOtpModal() {
  const modalData = useAppSelector(
    (state) => state.modals.RegisterWithMobilenumberVerifyOtpModal
  );
  const dispatch = useDispatch();

  const RegisterUserMobileNumber = useAppSelector(
    (state) => state.registration.mobile
  );

  const RegisterUserEmail = useAppSelector((state) => state.registration.email);

  console.log(" my slice values are", RegisterUserEmail);

  // Close modal
  const handleModalClose = () => {
    dispatch(hideModal("RegisterWithMobilenumberVerifyOtpModal"));
  };

  const { getTranslation } = useTranslation();

  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6  bg">
          <DialogPanel
            style={{
              backgroundImage: `url(${loginbgimage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-[490px] rounded-xl bg-white  px-[20px]   xl:px-[50px]   dark:bg-dark-secondarybg  shadow-[rgba(17,_17,_26,_0.3)_0px_0px_16px] backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={logo}
                alt="Logo"
                className="h-20 w-[11rem] object-contain"
              />
              <p className="font-poppins mx-auto mt-1 text-T5 px-4 text-center       dark:text-[#B4B4B4] text-[#717171] sm:px-6">
                {getTranslation(
                  "Discover more about our app by registering or logging in.",
                  "Discover more about our app by registering or logging in."
                )}
              </p>

              <h2 className="font-poppins   text-B1 dark:text-dark-darkcolor text-black">
                {getTranslation("Verification Code", " Verification Code")}
              </h2>
              <p className="text-center  px-8   dark:text-dark-darkcolor  text-T5 text-[#212121]  font-poppins">

                {RegisterUserMobileNumber
                  ? getTranslation(
                    "We have sent the verification code to your mobile number.",
                    "We have sent the verification code to your mobile number."
                  )
                  : getTranslation(
                    "We have sent the verification code to your email address.",
                    "We have sent the verification code to your email address."
                  )}
              </p>

              {(RegisterUserMobileNumber || RegisterUserEmail) && (
                <h3 className="text-center dark:text-dark-darkcolor  text-T7 text-black  font-poppins">
                  {RegisterUserMobileNumber || RegisterUserEmail}
                </h3>
              )}
            </div>

            <div className="mt-6">
              <RegisterWithMobilenumberVerifyOtpForm />
              <div className="flex items-center justify-center  py-5">
                <p className="text-sm text-gray-500 font-poppins">
                  {" "}
                  {getTranslation(
                    "Don't have an account?",
                    "Don't have an account?"
                  )}
                  <span
                    className="font-medium   text-light-button-base pl-1 cursor-pointer font-poppins"
                    onClick={() => {
                      dispatch(
                        hideModal("RegisterWithMobilenumberVerifyOtpModal")
                      );
                      dispatch(showModal("RegisterModal"));
                    }}
                  >
                    {getTranslation("Sign Up", "Sign Up")}
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
