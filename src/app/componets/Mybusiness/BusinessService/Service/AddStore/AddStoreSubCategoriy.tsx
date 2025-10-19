import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@mui/material";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetSubCategoriyListStore } from "@/app/storeApp/api/useGetSubCategoriyListStore";
import useTranslation from "@/app/hooks/useTranslation";

function AddStoreSubCategory() {
  const [category, setCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    // Load stored subcategory from session on mount
    const storedCategory = sessionStorage.getItem("selectedSubCategory");
    const storedCategoryId = sessionStorage.getItem("selectedSubCategoryId");

    if (storedCategory && storedCategoryId) {
      setCategory(storedCategory);
      setSelectedCategoryId(storedCategoryId);
    }
  }, []);

  const handleChange = (event) => {
    const selectedSubCategory = data?.subCategoryData?.find(
      (subCategory) => subCategory.subcategory_name === event.target.value
    );

    if (selectedSubCategory) {
      setCategory(selectedSubCategory.subcategory_name);
      setSelectedCategoryId(selectedSubCategory.id);

      // Store in sessionStorage
      sessionStorage.setItem(
        "selectedSubCategory",
        selectedSubCategory.subcategory_name
      );
      sessionStorage.setItem("selectedSubCategoryId", selectedSubCategory.id);
    }
  };

  const { getTranslation } = useTranslation();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { data } = useGetSubCategoriyListStore();

  console.log("My sub category data:", data?.subCategoryData);

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
        <Select value={category} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>
               {getTranslation("Select Sub-Category", "Select Sub-Category")}
          </MenuItem>
          {data?.subCategoryData?.map((subCategory) => (
            <MenuItem key={subCategory.id} value={subCategory.subcategory_name}>
              {subCategory.subcategory_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default AddStoreSubCategory;
