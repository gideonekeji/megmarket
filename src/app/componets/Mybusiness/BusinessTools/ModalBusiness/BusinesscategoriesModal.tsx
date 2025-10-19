"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useEffect, useState } from "react";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice"; // Import the action
import BusinessCategory from "./BusinessCategory";
import BusinessSubCategory from "./BusinessSubCategory";
import useTranslation from "@/app/hooks/useTranslation";

function BusinesscategoriesModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.BusinesscategoriesModal
  );


  const { getTranslation } = useTranslation();
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const category_id = useAppSelector(
    (state) => state.service.service.category_id
  );
  const subcategory_id = useAppSelector(
    (state) => state.service.service.subcategory_id
  );

  // For debugging category and subcategory selection
  console.log(
    " my selected category and sub category values ",
    category_id,
    subcategory_id
  );

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(hideModal("BusinesscategoriesModal"));
  };

  const handleCategoryChange = (category) => {
    dispatch(updateServiceField({ category_id: category }));
  };

  const handleSubcategoryChange = (subcategory) => {
    dispatch(updateServiceField({ subcategory_id: subcategory }));
  };

  const handalsubmit = () => {
    // Make sure to pass the correct category and subcategory values
    updateService({
      vendor_id: vendor_id,
      service_id: service_id,
      category_id: category_id,
      subcategory_id: subcategory_id,
    });
    close();
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]   ${
              isDarkMode ? "bg-[#2F2F2F]  text-white" : "bg-white text-black"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg   ${
                isDarkMode ? "bg-[#FFFFFF0A]" : "modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                  {getTranslation("Business categories", "Business categories")}
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

            <div className="h-auto flex justify-center items-center mx-auto py-6 w-[80%]">
              <div className="flex items-center relative -top-[0.7rem] justify-center h-12 w-12">
                <Image
                  src={infocircle}
                  className="h-4 w-4"
                  alt="Information icon"
                />
              </div>
              <p
                className={`text-[15px] font-normal  text-center font-poppins   ${
                  isDarkMode ? "text-[#FFFFFF]" : "text-[#226FE4]"
                }`}
              >
                Categories describe what your business is and the products and
                services your business offers. Please add at least one category
                for customers to find your business.
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center flex-col gap-6 items-center h-auto">
              <BusinessCategory onCategoryChange={handleCategoryChange} />
              <BusinessSubCategory
                onSubcategoryChange={handleSubcategoryChange}
              />

              {/* Save button */}
              <div
                className="w-full justify-center items-center flex"
                onClick={handalsubmit}
              >
                <button
                  type="submit"
                  className="w-fit px-[5rem] py-3 bg-[#226FE4] rounded-lg font-poppins text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BusinesscategoriesModal;
