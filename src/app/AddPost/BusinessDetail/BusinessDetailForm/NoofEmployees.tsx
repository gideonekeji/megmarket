import { useState, useEffect } from "react";
import { MdOutlineCheck, MdOutlineChevronRight, MdClose } from "react-icons/md";
import useTranslation from "@/app/hooks/useTranslation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

interface CategoryDropdownProps {
  required?: boolean;
}

const NoofEmployees: React.FC<CategoryDropdownProps> = () => {
  const { getTranslation } = useTranslation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useAppDispatch();

  const AddPostEmployee = useAppSelector(
    (state) => state.AddPost.employee_strength
  );

  const employeeRanges = [
    { label: "Less than 10", value: "Less than 10" },
    { label: "10-100", value: "10-100" },
    { label: "100-500", value: "100-500" },
    { label: "500-1000", value: "500-1000" },
    { label: "1000-2000", value: "1000-2000" },
    { label: "2000-5000", value: "2000-5000" },
    { label: "5000-10000", value: "5000-10000" },
    { label: "More than 10000", value: "More than 10000" },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [selectedEmployeeRange, setSelectedEmployeeRange] = useState("");

  // ✅ Sync Redux value to local state on mount/change
  useEffect(() => {
    setSelectedEmployeeRange(AddPostEmployee || "");
    setSearchValue(AddPostEmployee || "");
  }, [AddPostEmployee]);

  const handleSelect = (label: string) => {
    setSearchValue(label); // for showing in input
    setSelectedEmployeeRange(label); // for showing selected badge
    dispatch(updateAddPostData({ employee_strength: label })); // ✅ only update Redux on selection
    setShowDropdown(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // only local search state
  };

  const handleFocus = () => setShowDropdown(true);
  const handleBlur = () => setTimeout(() => setShowDropdown(false), 100);
  const handleToggle = () => {
    setShowDropdown((prev) => !prev);
    setRotate((prev) => !prev);
  };

  const handleClear = () => {
    setSelectedEmployeeRange("");
    setSearchValue("");
    dispatch(updateAddPostData({ employee_strength: "" }));
  };

  const filteredRanges = searchValue.trim()
    ? employeeRanges.filter((range) =>
        range.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    : employeeRanges;

  return (
    <div className="w-full flex flex-col relative h-full">
      <label
        htmlFor="employee-range"
        className={`font-poppins text-sm font-medium ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {getTranslation("Number of Employees", "Number of Employees")}
      </label>

      {/* Search Input */}
      <div className="relative mt-[6px] flex items-center cursor-pointer">
        <input
          type="text"
          id="employee-range"
          name="employee-range"
          autoComplete="off"
          className="w-full rounded-xl border cursor-pointer border-light-border dark:border-dark-border font-poppins focus:border-light-inputFocuscolor dark:focus:border-dark-inputFocuscolor text-textcolor bg-light-inputbgcolor dark:bg-dark-inputbgcolor px-4 py-[14px] placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
          placeholder="Search Employee Range"
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Chevron */}
        <div
          className={`absolute right-2 text-xl cursor-pointer transition-transform ${
            rotate ? "rotate-90" : "-rotate-90"
          }`}
          onClick={handleToggle}
        >
          <MdOutlineChevronRight />
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <ul className="absolute top-[5.9rem] left-0 w-full dark:bg-dark-secondarybg bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10 border border-light-button-base mt-1">
          {filteredRanges.length > 0 ? (
            filteredRanges.map((range) => (
              <li
                key={range.value}
                className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 text-black dark:text-dark-darkcolor flex justify-between items-center"
                onMouseDown={() => handleSelect(range.label)}
              >
                {range.label}
                {selectedEmployeeRange === range.label && (
                  <MdOutlineCheck className="text-[#226FE4] text-lg" />
                )}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 font-poppins text-center text-gray-500">
              No ranges found
            </li>
          )}
        </ul>
      )}

      {/* Selected Range Button */}
      {selectedEmployeeRange && (
        <div className="relative inline-block mt-2">
          <button className="px-[14px] py-[4px] pr-8 rounded-lg border border-light-button-base font-poppins relative">
            {selectedEmployeeRange}
            <MdClose
              className="absolute right-2 top-[30%] text-sm bg-white rounded-full border border-gray-300 cursor-pointer text-red-500 hover:text-red-700"
              onClick={handleClear}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default NoofEmployees;
