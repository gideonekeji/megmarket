import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useDeleteStoreApi } from "@/app/storeApp/api/useDeleteStoreApi";
import Cookies from "js-cookie";
import { useStoreListApi } from "@/app/storeApp/api/usestorelist";
import { setStoreList } from "@/app/storeApp/Slice/AddStore";
import { ToastContainer, toast } from "react-toastify";
import useTranslation from "@/app/hooks/useTranslation";
function DeleteStoreModal() {
  const modalData = useAppSelector((state) => state.modals.DeleteStoreModal);
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(hideModal("DeleteStoreModal"));
  };

  const { getTranslation } = useTranslation();

  const service_id = Cookies.get("service_id");

  const { data, error, refetch } = useStoreListApi(service_id);

  const store_id = useAppSelector((state) => state.UpdateStore.store?.id);

  const { mutate, isLoading } = useDeleteStoreApi();

  const Demo = Cookies.get("demoUser") === "true";


  const handleDelete = async () => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    if (store_id) {
      try {
        // Trigger the mutation to delete the store
        await mutate(store_id);

        // Show success message
        toast.success("Store deleted successfully");

        if (service_id) {
          const refetchedData = await refetch(); // Refetch the store list to update the data
          if (refetchedData?.data?.StoreList) {
            dispatch(setStoreList(refetchedData.data.StoreList)); // Dispatch to Redux store once data is fetched
          }
        }
        refetch();

        // Close the modal after successful deletion
        close();
      } catch (err) {
        // Show error message in case of failure
        toast.error("Failed to delete store. Please try again.");
      }
    } else {
      toast.error("Store ID is missing.");
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-[15rem] w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%]  xl:w-[30%] 2xl:w-[25%]  ${isDarkMode ? " bg-[#2F2F2F]  text-white" : "bg-white text-black"
              }`}
          >
            {/* Top Heading */}
            <div
              className={` flex w-full items-center justify-center rounded-xl p-4  ${isDarkMode ? " bg-[#FFFFFF0A]" : " deleteac"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium ">
                {getTranslation("Services Delete", "Services Delete")}
              </h3>
            </div>

            {/* Content */}
            <div className="h-auto w-full">
              <p className="font-poppins mx-auto w-[70%] p-5 text-lg text-center">
                {getTranslation(
                  "Are you sure you want to delete this store?",
                  "Are you sure you want to delete this store?"
                )}
              </p>
            </div>


            {/* Cancel and Delete Buttons */}
            <div className="mx-auto flex h-auto w-[80%] items-center justify-between gap-6">
              {/* Cancel Button */}
              <button
                onClick={close} // Close the modal on cancel
                className={`font-poppins cancelbordercolor w-full rounded-md py-2   ${isDarkMode ? " text-white" : " text-[#3A3333]"
                  }`}
              >
                {getTranslation("Cancel", "Cancel")}
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="font-poppins w-full rounded-md bg-light-button-base py-2 text-white"
                disabled={isLoading} // Disable the button while the mutation is loading
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </Dialog>
  );
}

export default DeleteStoreModal;
