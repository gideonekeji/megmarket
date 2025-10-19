"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import dropdownIcon from "../../../../../public/assets/Image/subcategorylisting.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetSubCategoriesQuery } from "@/app/storeApp/api/useGetAllSubCategory";
import { setselectedSubCategoryListing } from "@/app/storeApp/Slice/Listing/SubCategoryListing";
import { setselectedSubCategory } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/SubCategorySelectedIdandValues";
import corssicon from "../../../../../public/assets/Image/cross12.png";

const SubCategoryListingDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const category_id = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing.id
  );

  console.log(" category id ", category_id);

  const { data, refetch } = useGetSubCategoriesQuery(
    { category_id: category_id || "" },
    { skip: !category_id }
  );

  const SubCategoryDetail = useAppSelector(
    (state) => state.subcategory.selectedSubCategory
  );


  console.log("SubCategoryDetailSubCategoryDetailSubCategoryDetail", SubCategoryDetail)
  const [searchValue, setSearchValue] = useState<string>(
    SubCategoryDetail.subcategory_name || ""
  );


  const subcategories = data?.subCategoryData || [];

  useEffect(() => {
    if (SubCategoryDetail?.id) {
      setSearchValue(SubCategoryDetail.subcategory_name || null);
    } else {
      setSearchValue("");
    }
  }, [SubCategoryDetail]); // Runs only when Redux state updates



  useEffect(() => {
    dispatch(
      setselectedSubCategoryListing({
        id: SubCategoryDetail.id || null,
        subcategory_name: SubCategoryDetail.subcategory_name || "",
      })
    );

    if (SubCategoryDetail.subcategory_name) {
      setSearchValue(SubCategoryDetail.subcategory_name);
    }
  }, [SubCategoryDetail, dispatch]);





  console.log("searchValuesearchValue", searchValue)
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (category_id) refetch();
  }, [category_id, refetch]);

  useEffect(() => {
    if (!searchValue) {
      dispatch(
        setselectedSubCategoryListing({ id: null, subcategory_name: "" })
      );
    }
  }, [searchValue, dispatch]);

  useEffect(() => {
    if (!category_id) {
      setSearchValue(""); // Clear input when category_id is null
      dispatch(setselectedSubCategory({ id: null, subcategory_name: "" }));
      dispatch(
        setselectedSubCategoryListing({ id: null, subcategory_name: "" })
      );
    } else {
      refetch();
    }
  }, [category_id, dispatch, refetch]);

  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.subcategory_name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  const handleSelectSubCategory = (subcategory: {
    id: number;
    subcategory_name: string;
  }) => {
    setSearchValue(subcategory.subcategory_name);
    dispatch(setselectedSubCategory(subcategory));
    setShowDropdown(false);
    sessionStorage.setItem("subcategory", JSON.stringify(subcategory));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const handleReset = () => {
    setSearchValue("");
    sessionStorage.removeItem("subcategory");
    dispatch(setselectedSubCategory({ id: null, subcategory_name: "" }));
    dispatch(setselectedSubCategoryListing({ id: null, subcategory_name: "" }));
  };

  return (
    <div className="w-full flex flex-col gap-1 relative">
      <div className="relative flex items-center">
        <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center">
          <Image
            src={dropdownIcon}
            alt="Dropdown Icon"
            className={`h-[1rem] w-[1rem] ${isDarkMode && "bg-circle-icon"}`}
          />
        </span>

        <input
          type="text"
          name="subcategory"
          className={`font-poppins w-full     placeholder:text-T9 rounded-[10px] py-3 pl-10  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput  focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
          placeholder="Search Subcategories"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => category_id && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          disabled={!category_id}
          style={{
            backgroundColor: searchValue ? "#226FE45C" : "",
            border: searchValue ? "none" : ""
          }}
        />

        {searchValue && category_id && (
          <button
            className="absolute right-3 text-[#226FE4]"
            onClick={handleReset}
          >
            <Image
              src={corssicon}
              alt="cross icon"
              className={`h-[1.5rem] w-[1.5rem] object-cover ${isDarkMode && "bg-circle-icon"}`}
            />
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          className={`absolute top-[3.5rem] left-0 w-full  bg-light-background dark:bg-[#424242]  dark:border-none  dark:text-dark-darkcolor   text-black border border-[#226FE480] rounded-lg shadow-lg max-h-[30rem] overflow-y-auto z-10 ${isDarkMode ? "text-white" : "text-gray-700 bg-white"
            }`}
        >
          {filteredSubcategories.length > 0 ? (
            filteredSubcategories.map((subcategory) => (
              <li
                key={subcategory.id}
                className="px-4 py-2 cursor-pointer font-poppins border-b  "
                onMouseDown={() => handleSelectSubCategory(subcategory)}
              >
                {subcategory.subcategory_name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-center text-gray-500">
              No subcategories found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SubCategoryListingDropdown;
