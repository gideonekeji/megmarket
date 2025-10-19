"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import ProfileForm from "../../Profile/ProfileForm";

function BusinessPorfileUpdateModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.BusinessPorfileUpdateModal
  );

  const dispatch = useAppDispatch();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("BusinessPorfileUpdateModal"));

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]   ${
              isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
            }`}
          >
            <ProfileForm />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BusinessPorfileUpdateModal;
