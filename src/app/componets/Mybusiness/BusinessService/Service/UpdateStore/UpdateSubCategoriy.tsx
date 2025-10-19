"use client";
import React, { useState } from "react";
import { useGetSubCategoriyListStore } from "@/app/storeApp/api/useGetSubCategoriyListStore";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setSelectedSubCategoryupdatestore } from "@/app/storeApp/Slice/UpdateStoreSubCategoriySlice";
import useTranslation from "@/app/hooks/useTranslation";

function UpdateSubCategoriy() {
  const { data } = useGetSubCategoriyListStore();
  const subCategories = data?.subCategoryData || [];

  // Retrieve stored values from sessionStorage
  const storedId = sessionStorage.getItem("updatestore_idsubcategory");
  const storedName = sessionStorage.getItem("updatestorenamesubcategory");
  const dispatch = useAppDispatch();

  console.log(" mu id $$$", storedId);

  const { getTranslation } = useTranslation();

  // State to manage the selected subcategory
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    storedId || ""
  );

  const handleChange = (event) => {
    const selectedId = event.target.value;

    // Find the corresponding subcategory name
    const selectedSub = subCategories.find((sub) => sub.id === selectedId);

    if (selectedSub) {
      // Store ID and name in sessionStorage
      sessionStorage.setItem("updatestore_idsubcategory", selectedSub.id);
      sessionStorage.setItem(
        "updatestorenamesubcategory",
        selectedSub.subcategory_name
      );
      dispatch(
        setSelectedSubCategoryupdatestore({
          id: selectedSub.id,
          name: selectedSub.subcategory_name,
        })
      );
      // Update state
      setSelectedSubCategory(selectedSub.id);
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full flex flex-col gap-3">
      <label
        className={`font-poppins text-sm font-medium ${
          isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
        }`}
      >
        {`Sub-Categories (${data?.totalSubCategoryCount || 0})`}
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <FormControl fullWidth>
        <Select value={selectedSubCategory} onChange={handleChange}>
          {subCategories.map((sub) => (
            <MenuItem key={sub.id} value={sub.id}>
              {sub.subcategory_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default UpdateSubCategoriy;
