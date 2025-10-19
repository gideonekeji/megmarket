"use client";

import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { updateFilterData } from "@/app/storeApp/Slice/category/filterSlice";
import CategoryList from "./CategoryList";
import SubcategoryList from "./SubcategoryList";

function CategoryListDropdwon() {
  const dispatch = useAppDispatch();

  const selectedSubCategory = useAppSelector(
    (state) => state.subcategory.selectedSubCategory
  );

  console.log(
    " my sub category: " + selectedSubCategory.id,
    selectedSubCategory.subcategory_name
  );

  const updateslice = useAppSelector((state) => state.filterSlice);
  console.log(" my uodate slice ", updateslice);

  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    // Only dispatch if both category and subcategory are selected
    if (selectedCategory.id && selectedSubCategory.id) {
      dispatch(
        updateFilterData({
          category_id: selectedCategory.id.toString(),
          subcategory_id: selectedSubCategory.id.toString(),
        })
      );
    }
  }, [dispatch, selectedCategory.id, selectedSubCategory.id]);

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="relative w-full pb-2">
        <div className="absolute right-2 top-2" onClick={toggleDropdown}>
          <MdKeyboardArrowRight
            className={`rotate-${
              isDropdownOpen ? "90" : "-90"
            } text-2xl text-[#000000] cursor-pointer transition-transform duration-300`}
          />
        </div>
      </div>

      <div className="w-full flex flex-col p-6">
        <div
          className={`transition-all mt-6 duration-300 ease-in-out overflow-hidden flex flex-col gap-4 ${
            isDropdownOpen ? "max-h-[300px] pt-4" : "max-h-0"
          }`}
          style={{ transitionProperty: "max-height" }}
        >
          {/* Category dropdown or selected category */}
          <CategoryList />
          {/* Subcategory dropdown or selected subcategory */}
          <SubcategoryList />
        </div>
      </div>
    </div>
  );
}

export default CategoryListDropdwon;
