import Image from "next/image";
import React, { useRef, useState } from "react";
import crossicon from "../../../../../../../public/assets/Image/add-circle.png";
import uploadicon from "../../../../../../../public/assets/Image/file.png";
import { useDispatch } from "react-redux";
import { updateCoverImage } from "@/app/storeApp/Slice/AddPostSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { toast } from "react-hot-toast";
import useTranslation from "@/app/hooks/useTranslation";

function AddStoreAttachments() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFilesState] = useState<File[]>([]);

  const { getTranslation } = useTranslation();

  const storesliceImage = useAppSelector((state) => state.AddPost.cover_image);

  console.log(" my cover image 12121212121212#", storesliceImage);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // If multiple files are selected, show an alert
    if (files && files.length > 1) {
      toast.error("You can only upload one image at a time.");
      setUploadedFilesState([]); // Clear the state when multiple files are selected
      return; // Prevent any file from being uploaded if multiple are selected
    }

    // Proceed with uploading if only one file is selected
    if (files && files.length === 1) {
      const fileArray: File[] = Array.from(files);

      // Update state and dispatch the new file
      setUploadedFilesState((prevFiles) => {
        const newFiles = [...fileArray]; // Only add the first file
        dispatch(updateCoverImage(newFiles)); // Update Redux store with the single file
        return newFiles;
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFilesState((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      dispatch(updateCoverImage(updatedFiles)); // Update Redux state when a file is removed
      return updatedFiles;
    });
  };

  const getFileType = (file: File) => {
    if (file.type.startsWith("image")) return "image";
    if (file.type.startsWith("video")) return "video";
    if (file.type === "application/pdf") return "pdf";
    return "other";
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className=" w-full   overflow-hidden">
      <div>
        <label
          className={`font-poppins text-sm font-medium   ${isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
            }`}
          htmlFor="cover_image"
        >
          {getTranslation("Attach Files", "Attach Files")}
        </label>

        <div
          className={` font-poppins mt-1 flex h-[6rem] w-full  !border-[#226FE41A] border-[1px] cursor-pointer items-center justify-center rounded-lg   p-3 focus:border-light-button-base focus:outline-none  ${isDarkMode
              ? "text-[#FFFFFF]  borde-2  border-[#373737]  bg-[#FFFFFF0A]"
              : " borderinputbox"
            }`}
          onClick={handleFileClick}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.odt"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex w-full gap-1 flex-col items-center justify-center">
            <Image
              src={uploadicon}
              alt="upload icon"
              className="h-6 w-6 object-cover"
            />
            <p className="font-poppins text-sm text-[#B4B4B4]">
              {" "}
              {getTranslation("Add Files", "Add Files")}
            </p>
          </div>
        </div>

        {/* Display uploaded files from Redux */}
        <div className=" w-full  h-fit">
          {storesliceImage.length > 0 && (
            <div
              className={`uploadimageslide mt-2 flex flex-wrap items-start justify-start gap-4 pt-4  `}
            >
              {storesliceImage.map((file, index) => {
                const fileType = getFileType(file); // No need to find file since we have it in the array

                return (
                  <div
                    key={index}
                    className="relative mt-[-1rem] flex items-center justify-center gap-3"
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
                          {getTranslation(
                            "Your browser does not support the video tag.",
                            "Your browser does not support the video tag."
                          )}
                        </video>
                      )}

                      {fileType === "pdf" && file && (
                        <embed
                          src={URL.createObjectURL(file)}
                          type="application/pdf"
                          width={80}
                          height={80}
                          className="uploadimageborder rounded-md"
                        />
                      )}

                      {fileType === "other" && (
                        <div className="flex flex-col items-center justify-center p-2 border border-gray-300 rounded-md">
                          <p className="text-xs text-gray-500">{file.name}</p>
                        </div>
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

export default AddStoreAttachments;
