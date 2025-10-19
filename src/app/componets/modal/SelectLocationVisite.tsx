"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import ListingLocation from "../Listing/LeftSide/ListingLocation";

function SelectLocationVisite({data}) {

 const dta =  data
 console.log(" my slected data ", dta);

  const modalOpen = useAppSelector(
    (state) => state.modals.SelectLocationVisite
  );

  const dispatch = useAppDispatch();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("SelectLocationVisite"));

  

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel className="mx-auto pb-6 h-auto w-[90%] rounded-2xl bg-white shadow-lg p-6 backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]">
            {/*  heading */}
            <div className=" w-full justify-between flex items-center ">
              {/*  */}

              <h5 className=" text-black font-poppins text-lg">
                Your Location
              </h5>

              {/* close icon */}

              <div onClick={close} className=" cursor-pointer">
                <RxCross2 className=" font-poppins text-xl text-black" />
              </div>
            </div>

            <div className="relative py-6 flex items-center">
              <ListingLocation />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default SelectLocationVisite;
