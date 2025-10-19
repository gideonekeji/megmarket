"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../../public/assets/Image/crossicon.png";
import "../../../businesscss.css";
import UploadStoreImage from "./UploadStoreImage";
import AddStoreName from "./AddStoreName";
import AddStoreDescrition from "./AddStoreDescrition";
import AddStorePrice from "./AddStorePrice";
import AddStoreAttachments from "./AddStoreAttachments";
import { useAddStoreApi } from "@/app/storeApp/api/useStoreAdd";
import Cookies from "js-cookie";
import { useStoreListApi } from "@/app/storeApp/api/usestorelist";
import { setStoreList } from "@/app/storeApp/Slice/AddStore";
import { ToastContainer, toast } from "react-toastify";
import useTranslation from "@/app/hooks/useTranslation";
import { setTrue } from "@/app/storeApp/Slice/toggleSlice";

function AddStoreModal() {
  const modalOpen = useAppSelector((state) => state.modals.AddStoreModal);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const vendor_id = Cookies.get("user_id") || "";
  const service_id = Cookies.get("service_id") || "";
  const Demo = Cookies.get("demoUser") === "true";

  const { getTranslation } = useTranslation();
  const dispatch = useAppDispatch();

  const { mutate, isLoading } = useAddStoreApi();
  const { refetch } = useStoreListApi(service_id);

  // Redux form values
  const store_name = useAppSelector((state) => state.AddStore.currentStoreName);
  const store_description = useAppSelector((state) => state.AddStore.currentStoreDescription);
  const price = useAppSelector((state) => state.AddStore.currentStorePrice);
  const store_images = useAppSelector((state) => state.AddPost.service_image);
  const store_attachments = useAppSelector((state) => state.AddPost.cover_image);
  const storedCategoryId = sessionStorage.getItem("selectedSubCategoryId") || "";

  const close = () => dispatch(hideModal("AddStoreModal"));

  const handleSave = async () => {
    try {
      if (Demo) {
        toast.error("This action is disabled in the demo version.");
        return;
      }

      if (!store_name || !store_description || !price || !store_images?.length) {
        toast.error("All Fields are required");
        return;
      }

      // Normalize attachments to array
      const safeAttachments = Array.isArray(store_attachments)
        ? store_attachments
        : store_attachments
        ? [store_attachments]
        : [];

      // Normalize images to array
      const safeImages = Array.isArray(store_images)
        ? store_images
        : store_images
        ? [store_images]
        : [];

      // Prepare FormData
      const formData = new FormData();
      formData.append("service_id", service_id);
      formData.append("vendor_id", vendor_id);
      formData.append("store_name", store_name);
      formData.append("store_description", store_description);
      formData.append("price", price);
      formData.append("subcategory_id", storedCategoryId);

      safeImages.forEach((file) => formData.append("store_images[]", file));
      safeAttachments.forEach((file) => formData.append("store_attachments[]", file));

      // Call API
      await mutate({
        service_id,
        vendor_id,
        store_name,
        store_description,
        price,
        store_images: safeImages,
        store_attachments: safeAttachments,
        subcategory_id: storedCategoryId,
      });

      toast.success("Store added successfully!", { position: "top-right" });
      dispatch(setTrue());

      // Refresh list after short delay
      setTimeout(async () => {
        if (service_id) {
          const refetchedData = await refetch();
          if (refetchedData?.data?.StoreList) {
            dispatch(setStoreList(refetchedData.data.StoreList));
          }
        }
        close();
      }, 1000);
    } catch (error) {
      console.error("Error saving store or fetching store list:", error);
      toast.error("Failed to add store. Please try again.", { position: "top-right" });
    }
  };

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto my-4 w-full max-w-[600px] rounded-2xl pb-6 shadow-lg backdrop-blur-2xl duration-300 ease-out 
              ${isDarkMode ? "bg-dark-authbgcolor text-white" : "bg-white text-black"}`}
          >
            {/* Modal Header */}
            <div
              className={`flex w-full items-center justify-between p-4 font-poppins rounded-lg 
                ${isDarkMode ? "bg-dark-Modalbgcolortop" : "modalbordercolor"}`}
            >
              <h3 className="font-poppins text-lg 2xl:text-T4 font-medium text-center w-full">
                {getTranslation("Add Service", "Add Service")}
              </h3>
              <div className="cursor-pointer" onClick={close} aria-label="Close modal">
                <Image
                  src={crossicon}
                  className={`h-8 w-8 ${isDarkMode ? "invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            {/* Modal Content */}
            <div className="mx-auto mt-12 flex w-[80%] flex-col items-center gap-6 overflow-hidden">
              <UploadStoreImage />
              <AddStoreName />
              <AddStoreDescrition />
              <AddStorePrice />
              <AddStoreAttachments />

              {/* Save Button */}
              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSave}
                  className={`w-fit rounded-lg px-[5.5rem] py-3 font-poppins text-white 
                    ${isLoading ? "bg-light-button-base cursor-not-allowed" : "bg-light-button-base"}`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin text-white"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                        />
                      </svg>
                      {getTranslation("Loading...", "Loading...")}
                    </span>
                  ) : (
                    getTranslation("Save", "Save")
                  )}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
        <ToastContainer />
      </div>
    </Dialog>
  );
}

export default AddStoreModal;
