import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Image from "next/image";
import uploadicon from "../../../../../../../public/assets/Image/uploadicon.png";
import crossicon from "../../../../../../../public/assets/Image/add-circle.png";
import useTranslation from "@/app/hooks/useTranslation";
import { useRemoveStoreimages } from "@/app/storeApp/api/useRemoveStoreimages";
import { updateServiceImages } from "@/app/storeApp/Slice/AddPostSlice";

function ImageInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useAppDispatch();

  const storeImage = useAppSelector(
    (state) => state.UpdateStore.store?.storeImages
  );




  const sliceimage = useAppSelector(
    (state) => state.AddPost.service_image
  );



  console.log(" my selected and slice image ", sliceimage)




  const storeid = useAppSelector((state) => state.UpdateStore.store);

  console.log(
    " my store storeImagestoreImagestoreImagestoreImage",
    storeid?.id
  );

  const allFilesRef = useRef<File[]>([]);

  const [allImages, setAllImages] = useState<{ id: number; url: string }[]>([]);

  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; file: File; url: string }[]
  >([]);


  useEffect(() => {
    if (uploadedFiles.length > 0) {
      dispatch(updateServiceImages(uploadedFiles.map((item) => item.file))); // Only dispatch files
    }
  }, [uploadedFiles]);

  useEffect(() => {
    if (storeImage.length > 0) {
      const formattedImages = storeImage.map((img: any) => ({
        id: img.id,
        url: img.store_images,
      }));

      setAllImages(formattedImages);

      // Store image count in localStorage
      localStorage.setItem(
        "service_image_length",
        formattedImages.length.toString()
      );
    }
  }, [storeImage]); // <-- Updated dependency

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

      return updatedFiles;
    });
  };

  // Handle Image Removal (API + Local)
  const { mutate: removeImage } = useRemoveStoreimages();

  const handleRemoveImage = (id: number) => {
    const store_id = storeid?.id;
    removeImage(
      { store_id, store_image_id: id.toString() },
      {
        onSuccess: () => {
          const updatedImages = allImages.filter((img) => img.id !== id);
          setAllImages(updatedImages);
        },
        onError: (error) => {
          console.error("Failed to remove image:", error);
        },
      }
    );
  };

  const handleRemoveUploadedFile = (index: number) => {
    console.log("@@@@@@@@@@@@@@@", index);

    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      // Update image count in localStorage
      const newImageCount = allImages.length + updatedFiles.length;

      console.log(
        "newImageCountnewImageCountnewImageCountnewImageCountnewImageCount",
        newImageCount
      );

      return updatedFiles;
    });
  };

  const { getTranslation } = useTranslation();

  return (
    <div className="w-full">
      <div className="w-full">
        <label
            className={`font-poppins   text-B4   ${
            isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
          }`}
          htmlFor="service_image"
        >
          {getTranslation("Service Image/Video", "Service Image/Video")}
        </label>

        <div
          className={` font-poppins mt-2 flex h-[6rem] w-full  !border-[#226FE41A] border-[1px] cursor-pointer items-center justify-center rounded-lg   p-3 focus:border-light-button-base focus:outline-none  ${isDarkMode
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
              className={`h-6 w-6 object-cover ${isDarkMode ? "invert" : ""}`}
            />
           <p className="font-poppins   text-sm text-[#B4B4B4]"> 
              {getTranslation("Click to upload", "Click to upload")}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
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
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                onClick={() => handleRemoveImage(image.id)}
              >
                <Image src={crossicon} alt="Remove" width={16} height={16} />
              </button>
            </div>
          ))}

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
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                onClick={() => handleRemoveUploadedFile(index)}
              >
                <Image src={crossicon} alt="Remove" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
