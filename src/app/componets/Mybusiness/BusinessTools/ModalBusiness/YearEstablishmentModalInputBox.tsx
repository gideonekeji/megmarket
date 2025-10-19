"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlineChevronRight, MdClose, MdOutlineCheck } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { setMonthValue, setYearValue } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/monthYearSlice";
import useTranslation from "@/app/hooks/useTranslation";

const YearEstablishmentModalInputBox: React.FC = () => {
  const { getTranslation } = useTranslation();
  const dispatch = useAppDispatch();

  const storevalues = useAppSelector((state) => state.service.service);
  const monthFromStore = useAppSelector((state) => state.monthYear.monthValue);
  const yearFromStore = useAppSelector((state) => state.monthYear.yearValue);

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const Demo = Cookies.get("demoUser") === "true";

  // ✅ Extract isLoading from the mutation hook
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: (currentYear + 20) - 1900 + 1 }, (_, i) => `${currentYear + 20 - i}`);

  useEffect(() => {
    if (storevalues.published_year) {
      dispatch(setYearValue(storevalues.published_year));
    }
    if (storevalues.published_month) {
      dispatch(setMonthValue(storevalues.published_month));
    }
  }, [storevalues.published_year, storevalues.published_month, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setShowMonthDropdown(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async () => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    if (monthFromStore && yearFromStore) {
      try {
        await updateService({
          vendor_id,
          service_id,
          published_year: yearFromStore,
          published_month: monthFromStore,
        }).unwrap();

        dispatch(updateServiceField({
          published_year: yearFromStore,
          published_month: monthFromStore,
        }));
        toast.success("Saved successfully!")

        dispatch(hideModal("YearEstablishmentModal"));

      } catch (error) {
        toast.error(getTranslation("Failed to save changes", "Failed to save changes"));
      }
    } else {
      toast.error("Please select both month and year.");
    }
  };

  const handleSelectMonth = (m: string) => {
    dispatch(setMonthValue(m));
    setShowMonthDropdown(false);
  };

  const handleSelectYear = (y: string) => {
    dispatch(setYearValue(y));
    setShowYearDropdown(false);
  };

  const handleClearMonth = () => dispatch(setMonthValue(null));
  const handleClearYear = () => dispatch(setYearValue(null));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 relative">
        <div className="w-full flex gap-4 md:flex-row flex-col">
          {/* Month Dropdown */}
          <div ref={monthRef} className="w-full flex flex-col relative">
            <label className="font-poppins text-sm font-medium">{getTranslation("Month", "Month")}</label>
            <div className="relative mt-[6px]">
              <input
                type="text"
                readOnly
                placeholder="Select Month"
                value={monthFromStore ?? ""}
                onClick={() => setShowMonthDropdown((p) => !p)}
                className="w-full rounded-xl border border-light-border cursor-pointer dark:border-dark-border font-poppins focus:border-light-inputFocuscolor dark:focus:border-dark-inputFocuscolor text-textcolor bg-light-inputbgcolor dark:bg-dark-inputbgcolor px-4 py-[14px] placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
              />
              <MdOutlineChevronRight
                className={`absolute right-2 top-4 text-xl transition-transform ${showMonthDropdown ? "rotate-90" : "-rotate-90"}`}
              />
            </div>
            {showMonthDropdown && (
              <ul className="absolute top-[5.9rem] left-0 w-full bg-white dark:bg-dark-secondarybg rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10 border border-light-button-base mt-1">
                {months.map((m) => (
                  <li
                    key={m}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex justify-between items-center"
                    onClick={() => handleSelectMonth(m)}
                  >
                    {m}
                    {monthFromStore === m && <MdOutlineCheck className="text-blue-600" />}
                  </li>
                ))}
              </ul>
            )}
            {monthFromStore && (
              <div className="relative inline-block mt-2">
                <button className="px-[14px] py-[4px] pr-8 rounded-lg border relative">
                  {monthFromStore}
                  <MdClose
                    className="absolute right-2 top-[30%] cursor-pointer text-red-500"
                    onClick={handleClearMonth}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div ref={yearRef} className="w-full flex flex-col relative">
            <label className="font-poppins text-sm font-medium">{getTranslation("Year", "Year")}</label>
            <div className="relative mt-[6px]">
              <input
                type="text"
                readOnly
                placeholder="Select Year"
                value={yearFromStore ?? ""}
                onClick={() => setShowYearDropdown((p) => !p)}
                className="w-full rounded-xl border border-light-border cursor-pointer dark:border-dark-border font-poppins focus:border-light-inputFocuscolor dark:focus:border-dark-inputFocuscolor text-textcolor bg-light-inputbgcolor dark:bg-dark-inputbgcolor px-4 py-[14px] placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
              />
              <MdOutlineChevronRight
                className={`absolute right-2 top-4 text-xl transition-transform ${showYearDropdown ? "rotate-90" : "-rotate-90"}`}
              />
            </div>
            {showYearDropdown && (
              <ul className="absolute top-[5.9rem] left-0 w-full bg-white dark:bg-dark-secondarybg rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10 border border-light-button-base mt-1">
                {years.map((y) => (
                  <li
                    key={y}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex justify-between items-center"
                    onClick={() => handleSelectYear(y)}
                  >
                    {y}
                    {yearFromStore === y && <MdOutlineCheck className="text-blue-600" />}
                  </li>
                ))}
              </ul>
            )}
            {yearFromStore && (
              <div className="relative inline-block mt-2">
                <button className="px-[14px] py-[4px] pr-8 rounded-lg border relative">
                  {yearFromStore}
                  <MdClose
                    className="absolute right-2 top-[30%] cursor-pointer text-red-500"
                    onClick={handleClearYear}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center ">
        <button
          type="submit"
          onClick={handleSave}
          disabled={isLoading}
          className={`w-fit px-[5rem] py-3 rounded-lg font-poppins text-white flex items-center justify-center gap-2 
            ${isLoading ? "bg-light-button-base cursor-not-allowed" : "bg-light-button-base"}`}
        >
          {isLoading ? (
            <>
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
            </>
          ) : (
            getTranslation("Save", "Save")
          )}
        </button>
      </div>
    </div>
  );
};

export default YearEstablishmentModalInputBox;
