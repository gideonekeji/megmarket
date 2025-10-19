"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import success from "../../../../../public/assets/succces.gif"; // Import the gif
import Image from "next/image";
import cheak from "../../../../../public/assets/Image/succc12.png";
import { useRouter } from "next/navigation";

function Paymentsuccessful() {
  const modalOpen = useAppSelector((state) => state.modals.Paymentsuccessful);

  const dispatch = useAppDispatch();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("Paymentsuccessful"));

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const navigation = () => {
    window.location.href = "/"
    close();
  };

  return (
    <Dialog open={modalOpen} as="div" className="z-50" onClose={() => { }}>
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`relative mx-auto h-auto w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] rounded-2xl shadow-lg flex flex-col backdrop-blur-2xl duration-300 ease-out ${isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
              }`}
          >
            {/* Image section */}
            <div
              className="flex justify-center  items-center w-full bg-black mt-4"
              style={{
                backgroundImage: `url(${success.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "30vh",
                width: "100%",
                borderRadius: "2x",
                objectFit: "cover",
              }}
            >
              <Image
                src={cheak}
                alt="Payment Successful"
                className="rounded-2xl  w-[6rem] h-[6rem]  "
              />
            </div>

            {/* Text section */}
            <div className="flex flex-col items-center p-4">
              <h3 className="text-2xl  font-poppins font-semibold mb-2">
                Payment Successful!
              </h3>
              <p className="text-lg mb-4  font-poppins dark:text-dark-darkcolor  text-[#1A1A1A]">
                Thank you for your transaction.
              </p>
            </div>

            {/* Button section */}
            <div className="w-full flex justify-center mb-4">
              <button
                className="  bg-light-button-base text-white px-[4rem] py-3    font-poppins   rounded-lg shadow-lg transition-all duration-300 hover:bg-light-button-base focus:outline-none"
                onClick={navigation}
              >
                Go to Home
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Paymentsuccessful;
