import Image from "next/image";
import React, { useState } from "react";
import dropdwoninputboxicon from "../../../../../public/assets/Image/listingdropdwonlocation.png";
import { updateFilterData } from "@/app/storeApp/Slice/category/filterSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setselectedSubCategory } from "@/app/storeApp/Slice/category/subcategorySlice";
import { RxCross2 } from "react-icons/rx";

function SubcategoryList() {
  const [isSubCategorySelected, setIsSubCategorySelected] = useState(false); // Track subcategory selection state
  const dispatch = useAppDispatch();

  const selectedSubCategory = useAppSelector(
    (state) => state.subcategory.selectedSubCategory
  );

  const handleResetSubCategory = () => {
    dispatch(updateFilterData({ subcategory_id: null }));
    setIsSubCategorySelected(true);
  };
  const handleSubCategoryClick = () => {
    setIsSubCategorySelected(!isSubCategorySelected); // Toggle between showing the button and selected subcategory
    if (isSubCategorySelected) {
      const subcategory = {
        id: selectedSubCategory.id,
        subcategory_name: selectedSubCategory.subcategory_name,
      }; // Example selected subcategory
      dispatch(setselectedSubCategory(subcategory));
      dispatch(updateFilterData({ subcategory_id: subcategory.id.toString() }));
      console.log("Selected subcategory:", JSON.stringify(subcategory)); // Proper logging
    } else {
      dispatch(
        setselectedSubCategory({
          subcategory_name: selectedSubCategory.subcategory_name,
        })
      );
      // dispatch(updateFilterData({ subcategory_id: selectedSubCategory.id }));
    }
  };

  return (
    <div>
      {isSubCategorySelected ? (
        <button
          className="inputboxbgcolor w-full py-4 px-4 rounded-xl flex justify-between items-center gap-4 cursor-pointer"
          onClick={handleSubCategoryClick}
        >
          <div className="flex justify-center items-center gap-2">
            <Image
              src={dropdwoninputboxicon}
              alt="Dropdown Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
            <span className="font-poppins text-[#000000] font-normal text-lg">
              Select Subcategory
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
              {selectedSubCategory.subcategory_name}
            </span>
          </div>
          <div
            className="flex items-center justify-end"
            onClick={handleResetSubCategory}
          >
            <RxCross2 className="text-xl text-[#000000] cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SubcategoryList;
