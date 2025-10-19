"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../public/assets/Image/loginbgimage.png";
import logo from "../../../public/assets/Image/logo.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { ToastContainer } from "react-toastify";
import SocialLOginForm from "./SocialLOginForm";
import crossicon  from  "../../../public/assets/Image/crossicon.png"
import useTranslation from "../hooks/useTranslation";

export default function CheackUserNameSocailLOgin() {
  const modalData = useAppSelector(
    (state) => state.modals.CheackUserNameSocailLOgin
  );
    const { getTranslation } = useTranslation();

    const isDarkMode =  useAppSelector((state) => state.darkMode.isDarkMode)
  

  return (
    <Dialog open={modalData} onClose={() => { }}>
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
            {/* <div
              className="  w-full   relative    flex   items-center  justify-end    cursor-pointer"
            >
              <div className=" w-8 h-8   absolute right-[-1rem] xl:right-[-3rem]  top-[0.2rem] rounded-full  bg-light-button-base flex justify-center items-center">
                <Image
                  src={crossicon}
                  className={` w-full h-full  ${isDarkMode ? " invert" : ""}`}
                  alt="crossicon"
                />
              </div>
            </div> */}
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

            <div className="">
              <SocialLOginForm />
            </div>
          </DialogPanel>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </Dialog>
  );
}
