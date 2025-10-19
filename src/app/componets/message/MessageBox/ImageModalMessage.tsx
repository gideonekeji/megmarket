import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../public/assets/Image/crossicon.png";

function ImageModalMessage({ selectedImage }) {
  const modalOpen = useAppSelector((state) => state.modals.ImageModalMessage);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const close = () => dispatch(hideModal("ImageModalMessage"));

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black/50 backdrop-blur-0">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[40%]  ${
              isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4 font-poppins rounded-b-lg ${
                isDarkMode ? "bg-[#FFFFFF0A]" : "modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium text-center w-full">
                Chat Image
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8 ${isDarkMode ? "invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="mx-auto w-[80%] mt-6 flex justify-center items-center  ">
              {selectedImage && (
                <div
                  className="w-full h-auto rounded-lg "
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "500px", // Set a height for the image
                  }}
                  aria-label="Selected image"
                />
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ImageModalMessage;
