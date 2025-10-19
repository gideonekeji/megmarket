"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import uploadicon from "../../../../../../../public/assets/Image/file.png";
import { useDispatch } from "react-redux";
import { updateCoverImage } from "@/app/storeApp/Slice/AddPostSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { toast } from "react-toastify";
import useTranslation from "@/app/hooks/useTranslation";
import { useRemoveStoreAttactment } from "@/app/storeApp/api/useRemoveStoreAttactment";
import crossicon from "../../../../../../../public/assets/Image/add-circle.png";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import pdficon from "../../../../../../../public/assets/Image/pdf_icons.png";

function UpdateStoreCoverImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { mutate: removeAttachment } = useRemoveStoreAttactment();
  const { getTranslation } = useTranslation();

  const storeid = useAppSelector((state) => state.UpdateStore.store?.id);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const storesliceImage = useAppSelector(
    (state) => state.UpdateStore.store?.storeAttachments || []
  );

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const storedFileUrl =
    storesliceImage.length > 0 ? storesliceImage[0]?.store_attachments : null;
  const currentFileUrl = uploadedFile
    ? URL.createObjectURL(uploadedFile)
    : storedFileUrl;

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".odt",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      toast.error("You can only upload one file at a time.");
      return;
    }

    const file = files[0];
    const extension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      toast.error("Invalid file type. Only documents are allowed.");
      return;
    }

    setUploadedFile(file);
    dispatch(updateCoverImage([file]));
  };

  const handleRemoveFile = () => {
    if (uploadedFile) {
      setUploadedFile(null);
      dispatch(updateCoverImage([]));
    } else if (storedFileUrl && storeid) {
      removeAttachment(
        { store_id: storeid, store_attach_id: storesliceImage[0]?.id },
        {
          onSuccess: () => {
            toast.success("Attachment removed successfully!");
            dispatch(updateCoverImage([]));
            // dispatch(hideModal("UpdateAddStoreModal"));
          },
          onError: () => {
            toast.error("Failed to remove attachment.");
          },
        }
      );
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith(".pdf")) return pdficon;
    return uploadicon; // Default icon for now
  };

  return (
    <div className="w-full overflow-hidden">
      <label
        className={`font-poppins text-sm font-medium ${isDarkMode ? "text-white" : "text-black"
          }`}
      >
        {getTranslation("Attach Files", "Attach Files")}
      </label>

      <div
        className={`mt-1 flex h-[6rem] w-full border cursor-pointer items-center justify-center rounded-lg p-3 ${isDarkMode
          ? "text-white border-[#373737] bg-[#FFFFFF0A]"
          : "borderinputbox"
          }`}
        onClick={handleFileClick}
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.odt"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <Image src={uploadicon} alt="upload" className="h-6 w-6 object-cover" />
          <p className="text-sm text-[#B4B4B4]">
            {getTranslation("Add Files", "Add Files")}
          </p>
        </div>
      </div>

      {currentFileUrl && (
        <div className="mt-2 relative flex items-center gap-3">
          <div className="relative">
            <Image
              src={getFileIcon(
                uploadedFile ? uploadedFile.name : storedFileUrl || ""
              )}
              alt="File"
              width={50}
              height={40}
              className="rounded-md object-cover"
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-600 rounded-full p-1"
              onClick={handleRemoveFile}
            >
              <Image src={crossicon} alt="Remove" width={16} height={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateStoreCoverImage;
