import { useGetCategoriesQuery } from "@/app/storeApp/api/useGetCategory";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/CategorySelectedIDandValues";
import { useAppSelector } from "@/app/hooks/hooks";
import { useState } from "react";
import { MdOutlineCheck, MdOutlineChevronRight, MdClose } from "react-icons/md";
import useTranslation from "@/app/hooks/useTranslation";

interface CategoryDropdownProps {
  required?: boolean;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = () => {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data || [];

  const dispatch = useDispatch();
  const { getTranslation } = useTranslation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const categoryState = useAppSelector((state) => state.category.selectedCategory);

  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [rotate, setRotate] = useState(false);

  const handleSelectCategory = (categoryName: string, categoryId: number) => {
    setSearchValue(categoryName);
    dispatch(setSelectedCategory({ category_name: categoryName, id: categoryId }));
    setShowDropdown(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleFocus = () => setShowDropdown(true);
  const handleBlur = () => setTimeout(() => setShowDropdown(false), 100);
  const handleToggle = () => {
    setShowDropdown((prev) => !prev);
    setRotate((prev) => !prev);
  };

  const handleClearCategory = () => {
    dispatch(setSelectedCategory({ id: null, category_name: "" }));
    setSearchValue("");
  };

  const filteredCategories = searchValue.trim()
    ? categories.filter((cat) =>
      cat.category_name.toLowerCase().includes(searchValue.toLowerCase())
    )
    : categories;

  return (
    <div className="w-full flex flex-col relative h-full">
      {/* Label */}
      <label
        htmlFor="category"
        className={`font-poppins text-sm font-medium ${isDarkMode ? "text-white" : "text-black"}`}
      >
        {getTranslation("Category", "Category")}
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>

      {/* Search Input */}
      <div className="relative mt-[6px] flex items-center cursor-pointer">
        <input
          type="text"
          id="category"
          name="category"
          autoComplete="off"
          className="w-full rounded-xl border cursor-pointer border-light-border dark:border-dark-border font-poppins focus:border-light-inputFocuscolor dark:focus:border-dark-inputFocuscolor text-textcolor bg-light-inputbgcolor dark:bg-dark-inputbgcolor px-4 py-[14px] placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
          placeholder="Search Category"
          value={searchValue}
          onChange={handleCategoryChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Chevron */}
        <div
          className={`absolute right-2 text-xl cursor-pointer transition-transform ${rotate ? "rotate-90" : "-rotate-90"
            }`}
          onClick={handleToggle}
        >
          <MdOutlineChevronRight />
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <ul className="absolute top-[5.9rem] left-0 w-full   dark:bg-dark-secondarybg  bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10 border border-light-button-base mt-1">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <li
                key={cat.id}
                className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200  dark:text-dark-darkcolor text-black flex justify-between items-center"
                onMouseDown={() => handleSelectCategory(cat.category_name, cat.id)}
              >
                {cat.category_name}
                {categoryState.id === cat.id && (
                  <MdOutlineCheck className="text-[#226FE4] text-lg" />
                )}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 font-poppins text-center text-gray-500">
              No categories found
            </li>
          )}
        </ul>
      )}

      {/* Selected Category Button */}
      {/* Selected Category Button */}
      <div>
        {categoryState.category_name && (
          <div className="relative inline-block mt-2">
            <button
              className="px-[14px] py-[4px] pr-8 rounded-lg border border-light-button-base font-poppins relative"
            >
              {categoryState.category_name}
              <MdClose
                className="  absolute right-2 top-[30%] text-sm bg-white rounded-full border border-gray-300 cursor-pointer text-red-500 hover:text-red-700"
                onClick={handleClearCategory}
              />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default CategoryDropdown;
