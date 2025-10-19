"use client";

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../../public/assets/Image/crossicon.png";
import "../../../businesscss.css";
import UpdateStoreImage from "./UpdateStoreImage";
import UpdateStoreName from "./UpdateStoreName";
import UpdateStoreDescription from "./UpdateStoreDescription";
import UpdateStorePrice from "./UpdateStorePrice";
import UpdateStoreCoverImage from "./UpdateStoreCoverImage";
import { useUpdateStoreMutation } from "@/app/storeApp/api/UpdateStoreApi";
import { useStoreListApi } from "@/app/storeApp/api/usestorelist";
import { setStoreList } from "@/app/storeApp/Slice/AddStore";
import Cookies from "js-cookie";
import UpdateSubCategoriy from "./UpdateSubCategoriy";
import useTranslation from "@/app/hooks/useTranslation";
import { updateServiceImages } from "@/app/storeApp/Slice/AddPostSlice";
import { toast, ToastContainer } from "react-toastify";

function UpdateAddStoreModal() {
  const modalOpen = useAppSelector((state) => state.modals.UpdateAddStoreModal);
  const dispatch = useAppDispatch();
  const close = () => dispatch(hideModal("UpdateAddStoreModal"));
  const service_id = Cookies.get("service_id");

  const { getTranslation } = useTranslation();

  const setSelectedSubCategoryupdatestore = useAppSelector(
    (state) => state.UpdateStoreSubCategoriySlice
  );

  console.log(
    "  my slice values  from store   slice ",
    setSelectedSubCategoryupdatestore.selectedSubCategoryId
  );
  const id = setSelectedSubCategoryupdatestore.selectedSubCategoryId;

  // Select data from the Redux store
  const store_description = useAppSelector(
    (state) => state.UpdateStore.store?.store_description
  );
  const store_name = useAppSelector(
    (state) => state.UpdateStore.store?.store_name
  );
  const store_id = useAppSelector((state) => state.UpdateStore.store?.id);
  const price = useAppSelector((state) => state.UpdateStore.store?.price);
  const store_images = useAppSelector((state) => state.AddPost.service_image);
  const store_attachments = useAppSelector(
    (state) => state.AddPost.cover_image
  );

  // Initialize the API mutation hook
  const [updateStore, { isLoading, isError }] = useUpdateStoreMutation();
  const { data, error, refetch } = useStoreListApi(service_id);


  const Demo = Cookies.get("demoUser") === "true";


  const handleSave = async () => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    if (!store_id) return; // Check if store_id is valid

    // Create a new FormData object
    const formData = new FormData();

    // Append basic data
    formData.append("store_id", store_id.toString());
    formData.append("store_name", store_name || "");
    formData.append("store_description", store_description || "");
    formData.append("price", price?.toString() || "0");
    if (id !== null && id !== undefined) {
      formData.append("subcategory_id", id.toString());
    }

    // Append images if available (assuming `store_images` is an array of file objects)
    if (store_images && store_images.length > 0) {
      store_images.forEach((image, index) => {
        formData.append(`store_images[${index}]`, image); // Append each image
      });
    }

    // Append attachments if available (assuming `store_attachments` is an array of file objects)
    if (store_attachments && store_attachments.length > 0) {
      store_attachments.forEach((attachment, index) => {
        formData.append(`store_attachments[${index}]`, attachment); // Append each attachment
      });
    }

    // Call the updateStore mutation with FormData
    try {
      await updateStore(formData).unwrap();
      // 2. Once the store is added, refetch the store list
      if (service_id) {
        const refetchedData = await refetch(); // Refetch the store list to update the data
        if (refetchedData?.data?.StoreList) {
          dispatch(setStoreList(refetchedData.data.StoreList)); // Dispatch to Redux store once data is fetched
        }
      }
      toast.success("Store updated successfully");
      dispatch(updateServiceImages(""))
      refetch();
      close(); // Close the modal after successful save
    } catch (error) {
      console.error("Failed to save store:", error);
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto  w-full my-5 max-w-[600px] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out      ${isDarkMode
              ? " bg-[#2F2F2F]  text-white"
              : " bg-white   text-black"
              } `}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg   ${isDarkMode ? "  bg-[#FFFFFF0A]" : " modalbordercolor"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                {getTranslation("Update store", "Update store")}
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="mx-auto w-[80%]  grid mt-[3rem] grid-cols-1 gap-6 h-auto">
              <UpdateStoreImage />
              <UpdateStoreName />
              {/* <UpdateSubCategoriy /> */}
              <UpdateStoreDescription />
              <UpdateStorePrice />
              <UpdateStoreCoverImage />

              <div className="w-full justify-center items-center flex">
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

export default UpdateAddStoreModal;
