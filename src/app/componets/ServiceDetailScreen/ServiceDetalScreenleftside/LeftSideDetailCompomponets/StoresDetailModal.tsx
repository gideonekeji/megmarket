"use client"; // This is important for Next.js to handle client-side rendering

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import hospital from "../../../../../../public/assets/Image/hospital.png";
import pdficon from "../../../../../../public/assets/Image/pdfdetail.png";
import Image from "next/image";
import ServiceDetailScreenFiltterModalDetailAnimationSlide from "./ServiceDetailScreenFiltterModalDetailAnimationSlide";
import { useState } from "react";

function StoresDetailModal() {
  const modalData = useAppSelector((state) => state.modals.StoresDetailModal);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  const close = () => {
    dispatch(hideModal("StoresDetailModal"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const cardData = useAppSelector((state) => state.cards.cards);

  console.log(" my   store image", cardData[0].store_attachments);

  const cleanedDescription = cardData[0].store_description;

  const store_attachments = cardData[0].store_attachments;

  // Check if URL is an image
  const isImage = (url: string) => {
    return /\.(jpeg|jpg|gif|png|webp)$/i.test(url);
  };

  // Check if URL is a PDF
  const isPdf =  (url: string) => /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/i.test(url);

  console.log("store_attachments details:", store_attachments);

  // Example: Checking attachments
  store_attachments.forEach((attachment: string) => {
    if (isImage(attachment)) {
      console.log("This is an image:", attachment);
    } else if (isPdf(attachment)) {
      console.log("This is a PDF:", attachment);
    } else {
      console.log("Unknown file type:", attachment);
    }
  });


  console.log("descriptiondescriptiondescriptiondescription", cleanedDescription);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center py-4 px-2">
          <DialogPanel
            className={`mx-auto w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out ${isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"
              }`}
          >
            {/* Modal Header */}
            <div
              className={`w-full p-4 rounded-xl ${isDarkMode ? "bg-[#FFFFFF0A]" : "border-b border-gray-200"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium text-center">
                {cardData[0].store_name}
              </h3>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4]"
              onClick={close}
              aria-label="Close"
            >
              <IoClose />
            </button>

            {/*  doucment  */}

            <div className=" w-[90%] mx-auto flex flex-col py-6 gap-6">
              <ServiceDetailScreenFiltterModalDetailAnimationSlide />

              <div
                className="w-full flex  p-2 rounded-xl"
                style={{
                  border: "1px solid #0000001F",
                }}
              >
                <div className="flex flex-col md:flex-row gap-6 w-full   ">
                  <div className="w-full py-2 flex flex-col min-w-full justify-between gap-3">
                    <div className="flex  gap-2 w-full justify-between  items-center">
                      <div>
                        <p className="font-poppins text-lg dark:text-dark-darkcolor text-black">
                          {cardData[0].store_name}
                        </p>
                      </div>
                      <p className="font-poppins text-xl dark:text-dark-darkcolor font-medium text-black">
                        {cardData[0].price}
                      </p>
                    </div>

                    <div>
                      <div
                        className={`font-poppins text-sm text-[#535353] dark:text-white prose prose-sm max-w-none ${expanded ? "" : "line-clamp-3 overflow-hidden"}`}
                      >
                        <div
                          className="list-disc list-inside [&_ol]:list-decimal [&_li]:ml-4"
                          dangerouslySetInnerHTML={{ __html: cleanedDescription }}
                        ></div>
                      </div>


                      {cleanedDescription.length > 300 && (
                        <button
                          onClick={() => setExpanded(!expanded)}
                          className="text-light-button-base mt-2 underline text-sm"
                        >
                          {expanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {store_attachments.length > 0 && (
                <div className="w-full flex flex-col gap-6">
                  <h4 className="w-full flex justify-start items-start font-medium font-poppins text-lg">
                    {store_attachments.some(isImage) ? "Images" : "Documents"}
                  </h4>

                  <div className="w-full flex justify-start items-start cursor-pointer">
                    <div className="flex items-center gap-4 flex-wrap">
                      {store_attachments.map((attachment, index) => {
                        if (isImage(attachment)) {
                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center gap-2"
                            >
                              <a
                                href={attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Image
                                  src={attachment}
                                  alt={`attachment-${index}`}
                                  width={48}
                                  height={48}
                                  className="w-[3rem] h-[3rem] object-cover"
                                />
                              </a>
                            </div>
                          );
                        } else if (isPdf(attachment)) {
                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center gap-2"
                            >
                              <a href={attachment} target="_blank" download>
                                <Image
                                  src={pdficon}
                                  alt="pdficon"
                                  width={48}
                                  height={48}
                                  className="w-[3rem] h-[3rem]"
                                />
                              </a>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
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

export default StoresDetailModal;
