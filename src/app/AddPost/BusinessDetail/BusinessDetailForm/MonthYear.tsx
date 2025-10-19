import { useState, useRef, useEffect } from "react";
import { MdOutlineChevronRight, MdClose, MdOutlineCheck } from "react-icons/md";
import useTranslation from "@/app/hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setMonthValue, setYearValue } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/monthYearSlice";

const MonthYear: React.FC = () => {
  const { getTranslation } = useTranslation();
  const dispatch = useAppDispatch();

  // ✅ Get values from Redux
  const monthFromStore = useAppSelector((state) => state.monthYear.monthValue);
  const yearFromStore = useAppSelector((state) => state.monthYear.yearValue);

  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: (currentYear + 20) - 1900 + 1 },
    (_, i) => `${currentYear + 20 - i}`
  );

  const handleSelectMonth = (m: string) => {
    dispatch(setMonthValue(m));
    setShowMonthDropdown(false);
  };

  const handleSelectYear = (y: string) => {
    dispatch(setYearValue(y));
    setShowYearDropdown(false);
  };

  const handleClearMonth = () => {
    dispatch(setMonthValue(null));
  };

  const handleClearYear = () => {
    dispatch(setYearValue(null));
  };

  // Close dropdown when clicking outside
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-poppins text-T7">Year of Establishment</h2>
      <div className="w-full flex gap-4 md:flex-row flex-col">

        {/* Month Dropdown */}
        <div ref={monthRef} className="w-full flex flex-col relative">
          <label className="font-poppins text-sm font-medium">
            {getTranslation("Month", "Month")}
          </label>

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
          <label className="font-poppins text-sm font-medium">
            {getTranslation("Year", "Year")}
          </label>

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
  );
};

export default MonthYear;
