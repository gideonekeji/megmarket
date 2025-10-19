"use client";

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import pdficon from "../../../../../../public/assets/Image/pdfdetail.png";
import ServiceDetailScreenFiltterModalDetailAnimationSlide from "./ServiceDetailScreenFiltterModalDetailAnimationSlide";
import { useState } from "react";

function ServiceDetailScreenFiltterModalDetail() {
  const modalData = useAppSelector(
    (state) => state.modals.ServiceDetailScreenFiltterModalDetail
  );
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const cardData = useAppSelector((state) => state.cards.cards);

  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(hideModal("ServiceDetailScreenFiltterModalDetail"));
  };

  const { store_images, store_description, store_attachments, store_name, price } =
    cardData[0] || {};

  const cleanedDescription = store_description?.replace(/<br\s*\/?>/g, "") || "";

  const isImage = (url: string) => /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
  const isPdf = (url: string) => /\.pdf$/i.test(url);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center py-4 px-2">
          <DialogPanel
            className={`relative mx-auto w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out ${
              isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
            }`}
          >
            {/* Header */}
            <div
              className={`w-full p-4 rounded-xl ${
                isDarkMode ? "bg-[#FFFFFF0A]" : "border-b border-gray-200"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium text-center">
                {store_name}
              </h3>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 text-2xl  text-light-button-base"
              onClick={close}
              aria-label="Close"
            >
              <IoClose />
            </button>

            {/* Content */}
            <div className="w-[90%] mx-auto flex flex-col py-6 gap-6">
              {/* Image Slider */}
              <ServiceDetailScreenFiltterModalDetailAnimationSlide />

              {/* Store Info */}
              <div
                className="w-full flex p-2 rounded-xl border  dark:border-none   border-[#0000001F]"
              >
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="w-full py-2 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <p className="font-poppins  dark:text-dark-darkcolor text-lg text-black">
                        {store_name}
                      </p>
                      <p className="font-poppins text-xl   dark:text-dark-darkcolor font-medium text-black">
                        {price}
                      </p>
                    </div>

                    <div>
                      <p
                        className={`font-poppins text-sm text-[#535353] dark:text-[#B4B4B4] [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_li]:ml-4 ${
                          expanded ? "" : "line-clamp-3"
                        }`}
                        dangerouslySetInnerHTML={{ __html: cleanedDescription }}
                      ></p>

                      {cleanedDescription.length > 300 && (
                        <button
                          onClick={() => setExpanded(!expanded)}
                          className="text-light-button-base mt-1 underline"
                        >
                          {expanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              {store_attachments?.length > 0 && (
                <div className="w-full flex flex-col gap-6">
                  <h4 className="font-medium font-poppins text-lg">
                    {store_attachments.some(isImage) ? "Images" : "Documents"}
                  </h4>

                  <div className="flex items-center gap-4 flex-wrap">
                    {store_attachments.map((attachment, index) => {
                      if (isImage(attachment)) {
                        return (
                          <a
                            key={index}
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2"
                          >
                            <Image
                              src={attachment}
                              alt={`attachment-${index}`}
                              width={48}
                              height={48}
                              className="w-[3rem] h-[3rem] object-cover"
                            />
                          </a>
                        );
                      } else if (isPdf(attachment)) {
                        return (
                          <a
                            key={index}
                            href={attachment}
                            target="_blank"
                            download
                            className="flex flex-col items-center gap-2"
                          >
                            <Image
                              src={pdficon}
                              alt="PDF"
                              width={48}
                              height={48}
                              className="w-[3rem] h-[3rem]"
                            />
                          </a>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ServiceDetailScreenFiltterModalDetail;
