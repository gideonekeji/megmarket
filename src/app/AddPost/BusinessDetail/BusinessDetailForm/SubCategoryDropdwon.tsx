import { useGetSubCategoriesQuery } from "@/app/storeApp/api/useGetAllSubCategory";
import { useDispatch } from "react-redux";
import {
  setselectedSubCategory,
  resetSubCategory,
} from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/SubCategorySelectedIdandValues";
import { useAppSelector } from "@/app/hooks/hooks";
import { useState, useEffect, useMemo, useCallback } from "react";
import { MdClose, MdOutlineChevronRight } from "react-icons/md";
import useTranslation from "@/app/hooks/useTranslation";

const SubcategoryDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const category_id = useAppSelector(
    (state) => state.categorySelected.selectedCategory.id
  );

  const subcategory = useAppSelector(
    (state) => state.subCategorySelected.selectedSubCategory
  );

  // Fetch subcategories
  const { data } = useGetSubCategoriesQuery(
    { category_id: category_id || "" },
    { skip: !category_id }
  );

  const subcategoryList = useMemo(
    () => data?.subCategoryData || [],
    [data]
  );

  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [rotate, setRotate] = useState(false);

  // Sync selectedValues with Redux safely
  useEffect(() => {
    if (!category_id) {
      setSelectedValues([]);
      dispatch(resetSubCategory());
    } else {
      const subArray = Array.isArray(subcategory)
        ? subcategory
        : subcategory && subcategory.subcategory_name
        ? [subcategory]
        : [];
      setSelectedValues(
        subArray
          .filter((s) => s.subcategory_name)
          .map((s) => s.subcategory_name)
      );
    }
  }, [category_id, subcategory, dispatch]);

  // Search input change
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    []
  );

  // Select / unselect a subcategory
  const handleSelectCategory = useCallback(
    (subcategoryName: string) => {
      let newSelectedValues: string[];
      if (selectedValues.includes(subcategoryName)) {
        newSelectedValues = selectedValues.filter((v) => v !== subcategoryName);
      } else {
        newSelectedValues = [...selectedValues, subcategoryName];
      }

      setSelectedValues(newSelectedValues);

      const selectedSubcategories = subcategoryList.filter((sub) =>
        newSelectedValues.includes(sub.subcategory_name)
      );

      dispatch(setselectedSubCategory(selectedSubcategories));
    },
    [selectedValues, subcategoryList, dispatch]
  );

  // Filter subcategories
  const filteredSubcategories = useMemo(() => {
    if (!searchValue.trim()) return subcategoryList;
    return subcategoryList.filter((sub) =>
      sub.subcategory_name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, subcategoryList]);

  // Toggle dropdown
  const handleToggle = useCallback(() => {
    setShowDropdown((prev) => !prev);
    setRotate((prev) => !prev);
  }, []);

  return (
    <div className="w-full flex flex-col relative">
      {/* Label */}
      <label
        htmlFor="subcategory"
        className={`font-poppins text-sm font-medium ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {getTranslation("Subcategory ", "Subcategory ")}
      </label>

      {/* Search Input */}
      <div className="relative mt-2 flex items-center cursor-pointer">
        <input
          type="text"
          id="subcategory"
          name="subcategory"
          autoComplete="off"
          className={`${
            !category_id ? "bg-gray-300 cursor-not-allowed" : ""
          } w-full rounded-xl border border-light-border dark:border-dark-border font-poppins focus:border-light-inputFocuscolor dark:focus:border-dark-inputFocuscolor text-textcolor bg-light-inputbgcolor dark:bg-dark-inputbgcolor px-4 py-[14px] placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none`}
          placeholder="Search Subcategory"
          value={searchValue}
          onChange={handleCategoryChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          disabled={!category_id}
        />

        <div
          className={`absolute right-2 text-xl cursor-pointer transition-transform ${
            rotate ? "rotate-90" : "-rotate-90"
          }`}
          onClick={handleToggle}
        >
          <MdOutlineChevronRight className="text-xl" />
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && category_id && (
        <ul className="absolute top-[5.9rem] left-0 w-full bg-white dark:bg-dark-secondarybg rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10 border border-[#226FE480] mt-1">
          {filteredSubcategories.length > 0 ? (
            filteredSubcategories.map((sub) => (
              <li
                key={sub.id}
                className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 dark:bg-dark-darkcolor text-black flex items-center"
                onMouseDown={() => handleSelectCategory(sub.subcategory_name)}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(sub.subcategory_name)}
                  readOnly
                  className="mr-3"
                />
                {sub.subcategory_name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-center text-gray-500">
              No subcategories found
            </li>
          )}
        </ul>
      )}

      {/* Selected Chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedValues.map((value) => (
          <div key={value} className="relative inline-block">
            <button
              className={`px-[14px] py-[4px] pr-8 rounded-lg border font-poppins relative ${
                isDarkMode
                  ? "border-[#555555] bg-[#555555] text-white"
                  : "border-light-button-base bg-white text-black"
              }`}
            >
              {value}
              <MdClose
                className="absolute right-2 top-[30%] text-sm bg-white rounded-full border border-gray-300 cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleSelectCategory(value)}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryDropdown;
