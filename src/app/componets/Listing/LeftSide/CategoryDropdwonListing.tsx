"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import dropdown from "../../../../../public/assets/Image/category-2.png";
import { useGetCategoriesQuery } from "@/app/storeApp/api/useGetCategory";
import { setSelectedCategoryListing } from "@/app/storeApp/Slice/Listing/CategoryLIstingSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import corssicon from "../../../../../public/assets/Image/cross12.png";
import { usePathname } from "next/navigation";
import { decodeString } from "@/app/utils/enocodeAndDecode";

const CategoryDropdownListing: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useGetCategoriesQuery();
  const categories = data?.data || [];


const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const segments = pathname.split("/").filter(Boolean);
    let result: string[] = [];

    if (segments.length >= 3) {
      // 2nd and 3rd segments + last segment (store name)
      result = [...segments.slice(1, 3), segments[segments.length - 1]];
    } else if (segments.length === 2) {
      // Only store name exists
      result = [segments[segments.length - 1]];
    }

    // Format category name
    const formattedCategory = result[0]
      ?.replace(/-/g, " ")
      .split(" ")
      .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : "")
      .join(" ");

    // Decode category ID if exists
    const formattedCategoryId = result[1] ? decodeString(result[1]) : null;

    if (formattedCategory || formattedCategoryId) {
      dispatch(
        setSelectedCategoryListing({
          id: formattedCategoryId ? parseInt(formattedCategoryId, 10) : null,
          category_name: formattedCategory || "",
        })
      );
    }

    console.log("Category stored in Redux:", {
      id: formattedCategoryId,
      name: formattedCategory,
    });

  }, [pathname, dispatch]);





  const [searchValue, setSearchValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const selectedCategory = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing
  );

  console.log("Updated slice values:", selectedCategory);

  // Sync local state when Redux slice updates
  useEffect(() => {
    if (selectedCategory?.id) {
      setSearchValue(selectedCategory.category_name);
    } else {
      setSearchValue("");
    }
  }, [selectedCategory]); // Runs only when Redux state updates

  // Handle category selection
  const handleSelectCategory = (category) => {
    dispatch(
      setSelectedCategoryListing({
        id: category.id.toString(),
        category_name: category.category_name,
      })
    );
    setShowDropdown(false);
  };

  // Clear input and reset Redux state
  const handleClearCategory = () => {
    dispatch(setSelectedCategoryListing({ id: null, category_name: "" }));
    sessionStorage.removeItem("subcategories_id");
    sessionStorage.removeItem("subcategory_name");
    sessionStorage.removeItem("Category_ID");
    sessionStorage.removeItem("Category_Name");
  };

  const category_name = selectedCategory.category_name;

  console.log(" my selected  values ", category_name);

  return (
    <div className="w-full flex flex-col h-full gap-1 relative">
      <div className="relative flex items-center  ">
        <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center">
          <Image
            src={dropdown}
            alt="Dropdown Icon"
            className={`h-[1.1rem] w-[1.1rem] opacity-[50%] ${isDarkMode ? "bg-circle-icon" : ""
              }`}
          />
        </span>
        {/*  when category name exit then bg color bg-[#226FE421] */}
        <input
          type="text"
          id="category"
          name="category"
          className={`font-poppins w-full     placeholder:text-T9 rounded-[10px] py-3 pl-10  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput  focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}

          placeholder="Search Category"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          autoComplete="off"
          style={{
            backgroundColor: searchValue ? "#226FE45C" : "",
            border: searchValue ? "none" : ""
          }}
        />
        {searchValue && (
          <button
            className="absolute right-3 text-[#226FE4]"
            onClick={handleClearCategory}
          >
            <Image
              src={corssicon}
              alt="crossicon"
              className={`h-[1.5rem] w-[1.5rem] object-cover ${isDarkMode && "bg-circle-icon"}`}

            />
          </button>
        )}
      </div>
      {showDropdown && (
        <ul className="absolute top-[4rem] left-0 w-full  bg-light-background dark:bg-[#424242]  dark:border-none  dark:text-dark-darkcolor   text-black border font-poppins border-[#DBDBDB] rounded-lg shadow-lg max-h-[30rem] overflow-y-auto z-10">
          {categories.length > 0 ? (
            categories
              .filter((cat) =>
                cat.category_name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .map((categoryItem) => (
                <li
                  key={categoryItem.id}
                  className="px-4 py-2 cursor-pointer font-poppins   dark:border-b-dark-darkcolor border-b"
                  onMouseDown={() => handleSelectCategory(categoryItem)}
                >
                  {categoryItem.category_name}
                </li>
              ))
          ) : (
            <li className="px-4 py-2 text-gray-500 font-poppins text-center">
              Category Not Found
            </li>
          )}

          {/* Show "Category Not Found" if no matches after filtering */}
          {categories.length > 0 &&
            categories.filter((cat) =>
              cat.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            ).length === 0 && (
              <li className="px-4 py-2 text-gray-500 font-poppins text-center">
                Category Not Found
              </li>
            )}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdownListing;
