import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { RWebShare } from "react-web-share";
import "./style.css";
function ShareAppModal() {
  const dispatch = useDispatch();
  const modalData = useAppSelector((state) => state.modals.ShareAppModal);
  const close = () => {
    dispatch(hideModal("ShareAppModal"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-[12rem] w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%] 2xl:w-[20%]  ${
              isDarkMode ? "bg-[#2F2F2F]" : "bg-[#FFFFFF]"
            } `}
          >
            {/* Top Heading */}
            <div
              className={` flex h-auto w-full items-center justify-center rounded-xl p-4  ${
                isDarkMode
                  ? "text-[#FFFFFF] shadow-lg  bg-[#FFFFFF0A] "
                  : "text-[#000000] deleteac"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium text-black">
                Share
              </h3>
            </div>
            <RWebShare
              data={{
                text: "Meg Market Africa",
                url: "http://192.168.0.28:3000/",
                title: "Meg Market Africa",
              }}
              // onClick={() => console.log("shared successfully!")}
            >
              <button
                className={`font-poppins flex h-full w-full items-center justify-center pb-10   ${
                  isDarkMode ? "text-[#FFFFFF]  " : "text-[#226FE4] "
                }`}
              >
                Share 🔗
              </button>
            </RWebShare>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ShareAppModal;
