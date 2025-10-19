"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";

import docicon from "../../../../../public/assets/Image/document_light.png";
import imageicon from "../../../../../public/assets/Image/gallery.png";
import Image from "next/image";
import photo from "../../../../../public/assets/Image/document.png";

import {
  setDocument,
  setImage,
} from "@/app/storeApp/Slice/MessageSliceFileAndDoc";
import pdficon from "../../../../../public/assets/Image/pdf_icons.png";
import toast from "react-hot-toast";
export default function MessageSendModal() {
  const modalData = useAppSelector((state) => state.modals.MessageSendModal);
  const document = useAppSelector(
    (state) => state.MessageSliceFileAndDoc.document
  );
  const image = useAppSelector((state) => state.MessageSliceFileAndDoc.image);
  const dispatch = useAppDispatch();

  // Log document and image state when they change
  console.log("Selected Document:", document);
  console.log("Selected Image:", image);

  // Handle file selection for document
  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      // Check if the selected file is a PDF
      if (file.type === "application/pdf") {
        // Dispatch the setDocument action if it's a PDF
        dispatch(setDocument(file));
      } else {
        // Show an alert if the file is not a PDF
        toast.error("Please select a PDF document.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setImage(file));
    }
    dispatch(hideModal("MessageSendModal"));
  };

  // Close modal
  const handleModalClose = () => {
    dispatch(hideModal("MessageSendModal"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 w-full overflow-y-auto">
        <div className="flex items-center absolute justify-center p-6 bg bottom-[2.5rem] right-[20rem]">
          <DialogPanel
            className={`w-[13rem] rounded-xl  py-4 gap-6   flex justify-center  items-center shadow-lg transition-all duration-300 ease-in-out  ${
              isDarkMode ? " bg-[#181818]" : " bg-white"
            }`}
          >
            <label className="flex flex-col items-center gap-2">
              <input
                accept="application/pdf" // Restrict file selection to PDFs
                className="hidden"
                type="file"
                id="documentInput"
                onChange={handleDocumentChange}
              />
              <div className="grid h-14 w-14 cursor-pointer place-content-center bg-[#226FE4] rounded-full bg-attachIconBg transition-all duration-300 hover:opacity-80">
                <Image src={photo} className=" h-7 w-7 " alt="doc" />
              </div>
              <div
                className={`
              ${
                isDarkMode
                  ? " text-white"
                  : "text-gray-500 transition-all duration-300"
              }
                
                `}
              >
                Document
              </div>
            </label>

            <label
              htmlFor="photoInput"
              className="flex flex-col items-center gap-2"
            >
              <input
                accept="image/*"
                className="hidden"
                type="file"
                id="photoInput"
                onChange={handleImageChange}
              />
              <div className="grid h-14 w-14 cursor-pointer bg-[#226FE4] place-content-center rounded-full bg-attachIconBg transition-all duration-300 hover:bg-opacity-55 hover:opacity-80">
                <Image src={imageicon} className=" h-7 w-7 " alt="doc" />
              </div>
              <div
                className={`
              ${
                isDarkMode
                  ? " text-white"
                  : "text-gray-500 transition-all duration-300"
              }  
                `}
              >
                Photo
              </div>
            </label>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
