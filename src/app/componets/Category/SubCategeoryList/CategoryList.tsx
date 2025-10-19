import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setSelectedCategory } from "@/app/storeApp/Slice/category/categorySlice";
import { updateFilterData } from "@/app/storeApp/Slice/category/filterSlice";
import Image from "next/image";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import dropdwoninputboxicon from "../../../../../public/assets/Image/listingdropdwonlocation.png";
import { useGetCategoriesQuery } from "@/app/storeApp/api/useGetCategory";

function CategoryList() {
  const dispatch = useAppDispatch();
  const [isCategorySelected, setIsCategorySelected] = useState(false); // Track category selection state
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );
  const { data } = useGetCategoriesQuery();
  const category = data?.data || [];


   

  const handleResetCategory = () => {
    dispatch(updateFilterData({ category_id: null }));
    setIsCategorySelected(true);
  };

  const handleCategoryClick = () => {
    setIsCategorySelected(!isCategorySelected);
    if (isCategorySelected) {
      const category = {
        id: selectedCategory.id,
        category_name: selectedCategory.category_name,
      }; // Example selected category
      dispatch(setSelectedCategory(category));
      dispatch(updateFilterData({ category_id: category.id.toString() }));
      console.log("Selected category:", JSON.stringify(category)); // Proper logging
    } else {
      dispatch(
        setSelectedCategory({
          id: null,
          category_name: selectedCategory.category_name,
        })
      );
      // dispatch(updateFilterData({ category_id: null }));
    }
  };

  return (
    <div>
      {/* Category dropdown or selected category */}
      {isCategorySelected ? (
        <button
          className="inputboxbgcolor w-full py-4 px-4 rounded-xl flex justify-between items-center gap-4 cursor-pointer"
          onClick={handleCategoryClick}
        >
          <div className="flex justify-center items-center gap-2">
            <Image
              src={dropdwoninputboxicon}
              alt="Dropdown Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
            <span className="font-poppins text-[#000000] font-normal text-lg">
              Select Category 
            </span>
          </div>
        </button>
      ) : (
        <div className="inputboxbgcolor w-full py-4 px-4 rounded-xl flex justify-between items-center gap-4 cursor-pointer">
          <div className="flex justify-center items-center gap-2">
            <Image
              src={dropdwoninputboxicon}
              alt="Dropdown Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
            <span className="font-poppins text-[#000000] font-normal text-lg line-clamp-1">
              {selectedCategory.category_name}
            </span>
          </div>
          <div
            className="flex items-center justify-end"
            onClick={handleResetCategory}
          >
            <RxCross2 className="text-xl text-[#000000] cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;
