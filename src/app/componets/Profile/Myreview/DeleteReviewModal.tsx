import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { useDeleteUserReview } from "@/app/storeApp/api/useDeleteUserReview";
import { useGetReview } from "@/app/storeApp/api/useGetReview";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function DeleteReviewModal() {
  const modalOpen = useAppSelector((state) => state.modals.DeleteReviewModal);
  const dispatch = useAppDispatch();

  const { mutateAsync: deleteReview, isLoading } = useDeleteUserReview();
  const { refetch } = useGetReview();

  const id = Cookies.get("reviewid");
  const Demo = Cookies.get("demoUser") === "true";

  // Close modal
  const close = () => dispatch(hideModal("DeleteReviewModal"));

  // Handle delete click
  const handleDeleteClick = async () => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    try {
      await deleteReview(id);
      toast.success("Review deleted successfully!");
      await refetch();
      close();
    } catch (error) {
      toast.error("Failed to delete review. Please try again later.");
      console.error("Error deleting review", error);
    }
  };

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel className="mx-auto h-[15rem] w-[90%] rounded-2xl dark:bg-dark-secondarybg bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] md:w-[45%] lg:w-[25%]">
            
            {/* Top Heading */}
            <div className="deleteac flex w-full items-center justify-center rounded-xl p-4">
              <h3 className="font-poppins text-lg font-medium dark:text-dark-darkcolor text-black">
                Delete Review
              </h3>
            </div>

            {/* Content */}
            <div className="h-auto w-full flex items-center justify-center">
              <p className="font-poppins w-[70%] p-5 text-center dark:text-dark-darkcolor text-lg text-[#000000]">
                Are you sure you want to delete your Review?
              </p>
            </div>

            {/* Cancel and Delete Buttons */}
            <div className="mx-auto flex h-auto w-[80%] items-center justify-between gap-6">
              {/* Delete Button */}
              <button
                onClick={handleDeleteClick}
                disabled={isLoading}
                className={`font-poppins w-full rounded-lg bg-light-button-base py-3 text-white transition-all ${
                  isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#003B89]"
                }`}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>

              {/* Cancel Button */}
              <button
                onClick={close}
                disabled={isLoading}
                className="font-poppins cancelbordercolor w-full rounded-lg py-3 text-light-button-base"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteReviewModal;
