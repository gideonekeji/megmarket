import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Image from "next/image";
import uploadicon from "../../../../../../public/assets/Image/uploadicon.png";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import Cookies from "js-cookie";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import useRemoveServiceImage from "@/app/storeApp/api/useremoveservceimage";
import crossicon from "../../../../../../public/assets/Image/add-circle.png";
import useTranslation from "@/app/hooks/useTranslation";
import { toast, ToastContainer } from "react-toastify";

function ImageInput() {
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useAppDispatch();


  const Demo = Cookies.get("demoUser") === "true";

  const allFilesRef = useRef<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; file: File; url: string }[]
  >([]);
  const [allImages, setAllImages] = useState<{ id: number; url: string }[]>([]);

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  // Load stored image count from localStorage on mount
  useEffect(() => {
    const storedImageCount = localStorage.getItem("service_image_length");
    if (storedImageCount) {
      console.log(`Stored service image count: ${storedImageCount}`);
    }
    updateService({ vendor_id, service_id });
  }, []);

  useEffect(() => {
    if (data?.service_images) {
      const formattedImages = data.service_images.map((img: any) => ({
        id: img.id,
        url: img.service_images,
      }));
      setAllImages(formattedImages);

      // Store image count in localStorage
      localStorage.setItem(
        "service_image_length",
        formattedImages.length.toString()
      );
    }
  }, [data]);



  const handleSave = async () => {


    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    if (!vendor_id || !service_id) {
      console.error("Missing vendor_id or service_id");
      return;
    }

    const formData = new FormData();
    formData.append("vendor_id", vendor_id);
    formData.append("service_id", service_id);

    allFilesRef.current.forEach((file) => {
      formData.append("service_images[]", file);
    });

    try {
      const response = await updateService(formData).unwrap();
      console.log("Update Success:", response);
      dispatch(hideModal("BusinessImagesModal"));

      // Update local storage image count
      const newCount = allImages.length + uploadedFiles.length;
      localStorage.setItem("service_image_length", newCount.toString());
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    allFilesRef.current = [...allFilesRef.current, ...Array.from(files)];

    setUploadedFiles((prevFiles) => {
      const updatedFiles = [
        ...prevFiles,
        ...Array.from(files).map((file) => ({
          name: file.name,
          file,
          url: URL.createObjectURL(file),
        })),
      ];

      // Update image count in localStorage
      const newImageCount = allImages.length + updatedFiles.length;
      localStorage.setItem("service_image_length", newImageCount.toString());

      return updatedFiles;
    });
  };

  // Handle Image Removal (API + Local)
  const { mutate: removeImage } = useRemoveServiceImage();

  const handleRemoveImage = (id: number) => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    removeImage(
      { vendor_id, service_id, service_image_id: id.toString() },
      {
        onSuccess: () => {
          const updatedImages = allImages.filter((img) => img.id !== id);
          setAllImages(updatedImages);
          localStorage.setItem(
            "service_image_length",
            updatedImages.length.toString()
          );
        },
      }
    );
  };

  const handleRemoveUploadedFile = (index: number) => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      // Update image count in localStorage
      const newImageCount = allImages.length + updatedFiles.length;
      localStorage.setItem("service_image_length", newImageCount.toString());

      return updatedFiles;
    });
  };


  const { getTranslation } = useTranslation();



  return (
    <div className="w-full">
      <div className="w-full">
        <label
          className={`font-poppins text-sm font-medium ${isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
            }`}
          htmlFor="service_image"
        >
          {getTranslation("Service Image/Video", "Service Image/Video")}
        </label>

        {/* File Input Container */}
        <div
          className="w-full rounded-xl  mt-1  placeholder:font-normal  cursor-pointer   border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor     dark:focus:border-dark-inputFocuscolor   text-textcolor bg-light-inputbgcolor  dark:bg-dark-inputbgcolor px-4 py-[28px]  placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
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
          <div className="flex w-full flex-col items-center justify-center">
            <Image
              src={uploadicon}
              alt="upload icon"
              className={`h-6 w-6 object-cover ${isDarkMode ? "bg-circle-icon" : ""}`}
            />
            <p
              className={`font-poppins ${isDarkMode ? "text-[#ffffff]" : "text-[#B4B4B4]"
                }`}
            >
              {getTranslation("Click to upload", "Click to upload")}
            </p>
          </div>
        </div>

        {/* Display All Images (API + Selected) */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {/* API Images */}
          {allImages.map((image) => (
            <div
              key={image.id}
              className="relative w-full h-24 rounded-lg overflow-hidden border"
            >
              <Image
                src={image.url}
                alt={`Service Image ${image.id}`}
                layout="fill"
                objectFit="cover"
              />
              {/* Remove Button */}
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                onClick={() => handleRemoveImage(image.id)}
              >
                <Image src={crossicon} alt="Remove" width={16} height={16} />
              </button>
            </div>
          ))}

          {/* Selected Images */}
          {uploadedFiles.map((file, index) => (
            <div
              key={`uploaded-${index}`}
              className="relative w-full h-24 rounded-lg overflow-hidden border"
            >
              <Image
                src={file.url}
                alt={file.name}
                layout="fill"
                objectFit="cover"
              />
              {/* Remove Button */}
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                onClick={() => handleRemoveUploadedFile(index)}
              >
                <Image src={crossicon} alt="Remove" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-center items-center pt-6">


          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSave}
            className={`w-fit px-[5rem] py-3 rounded-lg font-poppins text-white 
      ${isLoading ? "bg-light-button-base cursor-not-allowed" : "bg-light-button-base"}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                  ></path>
                </svg>
                {getTranslation("Loading...", "Loading...")}
              </span>
            ) : (
              getTranslation("Save", "Save")
            )}
          </button>
        </div>
      </div>


    </div>
  );
}

export default ImageInput;
