"use client";
import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useTranslation from "@/app/hooks/useTranslation";

import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import "../../businesscss.css";

function NumberofEmployeesModal() {
  const dispatch = useAppDispatch();

  const modalOpen = useAppSelector((state) => state.modals.NumberofEmployeesModal);
  const employee_strength = useAppSelector((state) => state.service.service.employee_strength);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const Demo = Cookies.get("demoUser") === "true";

  // Employee dropdown options
  const employeeOptions = useMemo(
    () => [
      { value: "1-5", label: "Less than 10" },
      { value: "10-100", label: "10-100" },
      { value: "100-500", label: "100-500" },
      { value: "500-1000", label: "500-1000" },
      { value: "1000-2000", label: "1000-2000" },
      { value: "2000-5000", label: "2000-5000" },
      { value: "5000-10000", label: "5000-10000" },
      { value: "10000+", label: "More than 10000" },
    ],
    []
  );

  const employeeStrengthMap: Record<string, string> = {
    "Less than 10": "1-5",
    "10-100": "10-100",
    "100-500": "100-500",
    "500-1000": "500-1000",
    "1000-2000": "1000-2000",
    "2000-5000": "2000-5000",
    "5000-10000": "5000-10000",
    "More than 10000": "10000+",
  };

  const [employees, setEmployees] = useState(
    employeeStrengthMap[employee_strength] || "1-5"
  );

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const closeModal = () => {
    dispatch(hideModal("NumberofEmployeesModal"));
  };

  const handleSave = async () => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    try {
      await updateService({
        vendor_id,
        service_id,
        employee_strength: employees,
      }).unwrap();

      dispatch(updateServiceField({ employee_strength: employees }));
      toast.success("Number of employees updated successfully!");
      closeModal();
    } catch {
      toast.error("Failed to update. Please try again.");
    }
  };

  return (
    <Dialog open={modalOpen} onClose={closeModal} as="div" className="z-50">
      <div className="fixed inset-0 z-50 bg-black bg-opacity-55 backdrop-blur-sm flex items-center justify-center">
        <DialogPanel
          className={`mx-auto w-full max-w-[490px] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out pb-6 ${
            isDarkMode ? "bg-dark-authbgcolor text-white" : "bg-white text-black"
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 font-poppins rounded-lg ${
              isDarkMode ? "bg-dark-Modalbgcolortop" : "modalbordercolor"
            }`}
          >
            <h3 className="text-lg font-medium text-center w-full">
              {getTranslation("Number of Employees", "Number of Employees")}
            </h3>
            <Image
              src={crossicon}
              onClick={closeModal}
              className={`h-8 w-8 cursor-pointer ${isDarkMode ? "invert" : ""}`}
              alt="Close"
            />
          </div>

          {/* Info text */}
          <div className="flex justify-center gap-1 items-center mx-auto py-6 w-[75%]">
            <Image src={infocircle} className="h-4 w-4" alt="Info" />
            <p className="text-[15px] 2xl:text-T8 font-normal text-center font-poppins text-light-button-base">
              {getTranslation(
                "Please select the number of employees at your company",
                "Please select the number of employees at your company"
              )}
            </p>
          </div>

          {/* Employee list */}
          <div className="mx-auto w-[80%] flex flex-col gap-4">
            {employeeOptions.map((option) => (
              <div
                key={option.value}
                className={`w-full flex items-center p-4 cursor-pointer rounded-lg shadow-md space-x-4 ${
                  isDarkMode
                    ? "bg-[#2F2F2F] hover:bg-[#FFFFFF1A] border-2 border-[#373737]"
                    : "hover:bg-[#F5F5F5]"
                }`}
                onClick={() => setEmployees(option.value)}
              >
                <input
                  type="radio"
                  name="employees"
                  value={option.value}
                  checked={employees === option.value}
                  onChange={(e) => setEmployees(e.target.value)}
                  className="h-5 w-5 text-light-button-base focus:ring-light-button-base"
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="text-lg font-normal font-poppins">{option.label}</p>
              </div>
            ))}

            {/* Save button */}
            <div className="flex justify-center">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className={`w-fit px-[5rem] py-3 rounded-lg font-poppins text-white ${
                  isLoading
                    ? "bg-light-button-base cursor-not-allowed"
                    : "bg-light-button-base hover:opacity-90"
                }`}
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
    </Dialog>
  );
}

export default NumberofEmployeesModal;
