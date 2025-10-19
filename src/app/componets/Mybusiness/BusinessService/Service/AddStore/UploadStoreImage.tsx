"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import crossicon from "../../../../../../../public/assets/Image/add-circle.png";
import uploadicon from "../../../../../../../public/assets/Image/uploadicon.png";
import { useDispatch } from "react-redux";
import { updateServiceImages } from "@/app/storeApp/Slice/AddPostSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function UploadStoreImage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { storeList, loading, error } = useAppSelector(
    (state) => state.AddStore
  );

  console.log(" my store list values", storeList);
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFilesState] = useState<File[]>([]);

  const storesliceImage = useAppSelector(
    (state) => state.AddPost.service_image
  );

  console.log("##################", storesliceImage);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const { getTranslation } = useTranslation();

  console.log("uploadedFiles: ", storesliceImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("my file upload: ", files);

    if (files && files.length > 0) {
      const fileArray: File[] = Array.from(files);

      setUploadedFilesState((prevFiles) => {
        const newFiles = [...prevFiles, ...fileArray];
        console.log("newFiles: ", newFiles);

        // Dispatch the entire FileList (File objects) to Redux
        dispatch(updateServiceImages(newFiles));

        return newFiles;
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFilesState((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      // Update Redux state when a file is removed
      dispatch(updateServiceImages(updatedFiles));

      return updatedFiles;
    });
  };

  const getFileType = (file: File) => {
    if (file.type.startsWith("image")) return "image";
    if (file.type.startsWith("video")) return "video";
    return "other";
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className=" w-full">
      <div>
        <label
          className={`font-poppins   text-B4   ${
            isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
          }`}
          htmlFor="service_image"
        >
             {getTranslation("Add Service Images", "Add Service Images")}
        </label>

        <div
          className={` font-poppins mt-2 flex h-[6rem] w-full  !border-[#226FE41A] border-[1px] cursor-pointer items-center justify-center rounded-lg   p-3 focus:border-light-button-base focus:outline-none  ${
            isDarkMode
              ? "text-[#FFFFFF]  borde-2  border-[#373737]  bg-[#FFFFFF0A]"
              : " borderinputbox"
          }`}
          onClick={handleFileClick}
        >
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex w-full flex-col  gap-1 items-center justify-center">
            <Image
              src={uploadicon}
              alt="upload icon"
              className={`h-6 w-6 object-cover  ${isDarkMode ? " invert" : ""}`}
            />
            <p className="font-poppins   text-sm text-[#B4B4B4]">   {getTranslation("Service Image/Video ", "Service Image/Video ")}</p>
          </div>
        </div>

        {/* Display uploaded files from Redux */}
        <div className=" w-full  h-fit  overflow-y-auto">
          {storesliceImage.length > 0 && (
            <div
              className={`uploadimageslide mt-2 flex flex-wrap items-start justify-start gap-4 overflow-x-auto pt-4  overflow-y-auto   `}
            >
              {storesliceImage.map((file, index) => {
                const fileType = getFileType(file); // No need to find file since we have it in the array

                return (
                  <div
                    key={index}
                    className="relative mt-[-1rem]  pt-3 flex items-center justify-center"
                  >
                    <div className="relative">
                      {fileType === "image" && file && (
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Uploaded image ${index}`}
                          width={80}
                          height={80}
                          className="uploadimageborder rounded-md object-cover"
                        />
                      )}

                      {fileType === "video" && file && (
                        <video
                          width={80}
                          height={80}
                          className="uploadimageborder rounded-md object-cover"
                          controls
                        >
                          <source
                            src={URL.createObjectURL(file)}
                            type={file.type}
                          />
                           {getTranslation(" Your browser does not support the video tag.", " Your browser does not support the video tag.")}
                        </video>
                      )}

                      <button
                        className="absolute right-[-0.2rem] top-0 flex items-center justify-center text-sm text-gray-600"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#BABABA] text-sm text-gray-600">
                          <Image
                            src={crossicon}
                            alt="cross icon"
                            className="h-4 w-4 object-cover"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadStoreImage;
