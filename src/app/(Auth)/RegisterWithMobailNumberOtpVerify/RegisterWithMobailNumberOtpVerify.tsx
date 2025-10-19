"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../../public/assets/Image/loginbgimage.png";
import logo from "../../../../public/assets/Image/logo.png";
import { useAppSelector } from "@/app/hooks/hooks";
import FormValues from "./FormValues";
import { ToastContainer } from "react-toastify";
import useTranslation from "@/app/hooks/useTranslation";

export default function RegisterWithMobailNumberOtpVerify() {
  const modalData = useAppSelector(
    (state) => state.modals.RegisterWithMobailNumberOtpVerify
  );


  const { getTranslation } = useTranslation();

  return (
    <Dialog open={modalData} onClose={() => { }}>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
        <div className="flex min-h-full items-center justify-center  bg">
          <DialogPanel
            style={{
              backgroundImage: `url(${loginbgimage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-[490px] rounded-xl  py-6 dark:bg-dark-secondarybg bg-white   px-[20px]   xl:px-[50px]  shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={logo}
                alt="Logo"
                className=" w-[11rem] object-contain"
              />
              <p className="font-poppins mx-auto  text-T5 px-4  pb-5 text-center       dark:text-[#B4B4B4] text-[#717171] sm:px-6">
                {getTranslation(
                  "Discover more about our app by registering or logging in.",
                  "Discover more about our app by registering or logging in."
                )}
              </p>
            </div>

            <div className="">
              <FormValues />
            </div>
          </DialogPanel>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Dialog>
  );
}
