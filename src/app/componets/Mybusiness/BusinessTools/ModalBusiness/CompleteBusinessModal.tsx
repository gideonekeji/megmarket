import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import GooglemapInput from "@/app/AddPost/BusinessDetail/BusinessDetailForm/GoogleMapInput";
import CompleteBusinessAddressForm from "./CompleteBusinessAddressForm";
import useTranslation from "@/app/hooks/useTranslation";

function CompleteBusinessModal() {
  const modalData = useAppSelector(
    (state) => state.modals.CompleteBusinessModal
  );

  const dispatch = useDispatch();

  const close = () => {
    dispatch(hideModal("CompleteBusinessModal"));
  };


  const isDarkMode =  useAppSelector((state) => state.darkMode.isDarkMode)


  const { getTranslation } = useTranslation();
  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="mx-auto h-auto  w-[90%]   xl:w-[70%]    2xl:w-[55%] rounded-2xl bg-white  dark:bg-[#2F2F2F] shadow-lg backdrop-blur-2xl duration-300 ease-out">
            {/* Modal Header */}
            <div className="deleteac flex h-auto w-full items-center rounded-xl p-4">
             <div className="flex w-full items-center justify-center">
                <h3 className="font-poppins text-lg font-medium text-black dark:text-dark-darkcolor">
                  {getTranslation("Complete Address ", "Complete Address ")}
                </h3>
              </div>

              {/* close modal btn  */}
              <div className="cursor-pointer" onClick={close}>
                <Image src={crossicon} className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`} alt="crossicon" />
              </div>
            </div>

            <div className="mx-auto grid w-full h-[70rem]    md:h-full  grid-cols-1  dark:bg-[#1D1D1D] gap-1 md:gap-6 bg-white p-4 md:p-10 xl:grid-cols-2">
              <GooglemapInput />
              <CompleteBusinessAddressForm />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default CompleteBusinessModal;
