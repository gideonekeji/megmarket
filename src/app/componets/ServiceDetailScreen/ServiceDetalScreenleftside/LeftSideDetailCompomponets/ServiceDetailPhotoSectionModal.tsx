"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

// TypeScript interface for props
interface ServiceDetailPhotoSectionModalProps {
  selectedImage: string | null;
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
}

const ServiceDetailPhotoSectionModal: React.FC<
  ServiceDetailPhotoSectionModalProps
> = ({ selectedImage, setSelectedImage }) => {
  const serviceDetailData = useAppSelector((state) => state.serviceDetail);
  const serviceImages = serviceDetailData?.serviceDetail?.service_images || [];
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  if (!selectedImage || serviceImages.length === 0) return null;

  // Get the current index of the selected image
  const currentIndex = serviceImages.indexOf(selectedImage);

  // Function to close the modal
  const close = () => setSelectedImage(null);

  // Function to go to the previous image
  const prevImage = () => {
    if (serviceImages.length <= 1) return; // Prevent navigation if only one image
    const prevIndex =
      (currentIndex - 1 + serviceImages.length) % serviceImages.length;
    setSelectedImage(serviceImages[prevIndex]);
  };

  // Function to go to the next image
  const nextImage = () => {
    if (serviceImages.length <= 1) return; // Prevent navigation if only one image
    const nextIndex = (currentIndex + 1) % serviceImages.length;
    setSelectedImage(serviceImages[nextIndex]);
  };

  return (
    <Dialog
      open={true}
      onClose={close}
      className="relative z-50 focus:outline-none"
    >
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10" />

      {/* Modal content */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <DialogPanel
          className={`relative mx-auto   w-fit h-[44.5rem] rounded-xl overflow-hidden shadow-lg 
            ${isDarkMode ? "bg-gray-800 text-white" : "bg-white"}`}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4] hover:bg-gray-400"
            onClick={close}
            aria-label="Close"
          >
            <IoClose />
          </button>

          {/* Left Arrow (Only show if more than one image) */}
          {serviceImages.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4] hover:bg-gray-400"
              aria-label="Previous Image"
            >
              <IoChevronBack />
            </button>
          )}

          {/* Right Arrow (Only show if more than one image) */}
          {serviceImages.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4] hover:bg-gray-400"
              aria-label="Next Image"
            >
              <IoChevronForward />
            </button>
          )}

          {/* Image display */}
          <div className="w-full h-full flex items-center justify-center   bg-white">
            <img
              src={selectedImage}
              alt="Selected Service"
              className="max-h-full max-w-full object-contain rounded-xl"
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ServiceDetailPhotoSectionModal;
