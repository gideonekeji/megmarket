"use client";

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetSubCategoriesQuery } from "@/app/storeApp/api/useGetAllSubCategory";
import { useDispatch } from "react-redux";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import useTranslation from "@/app/hooks/useTranslation";

export default function BusinessSubCategory() {
  const dispatch = useDispatch();
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const category_id = useAppSelector(
    (state) => state.service.service.category_id
  );
  const subcategory_id = useAppSelector(
    (state) => state.service.service.subcategory_id
  );

  // Fetch subcategories based on category_id
  const { data } = useGetSubCategoriesQuery(
    { category_id: category_id || "" },
    { skip: !category_id } // Skip if no category_id
  );

  const subcategory = data?.subCategoryData;

  // Handle change in selection (multiple values)
  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;

    const newSelectedValues =
      typeof value === "string" ? value.split(",") : value;
    setSelectedValues(newSelectedValues);

    // Get the corresponding subcategories
    const selectedSubcategories = subcategory?.filter((sub) =>
      newSelectedValues.includes(sub.subcategory_name)
    );

    if (selectedSubcategories) {
      const subcategoryIds = selectedSubcategories.map((sub) => sub.id);
      dispatch(
        updateServiceField({ subcategory_id: subcategoryIds.join(",") })
      );
    }
  };

  // Handle deletion of selected values (deselect a subcategory)
  const handleDelete = (value: string) => {
    const newSelectedValues = selectedValues.filter((item) => item !== value);
    setSelectedValues(newSelectedValues);

    // Update Redux store with the new selected subcategories
    const selectedSubcategories = subcategory?.filter((sub) =>
      newSelectedValues.includes(sub.subcategory_name)
    );

    if (selectedSubcategories) {
      const subcategoryIds = selectedSubcategories.map((sub) => sub.id);
      dispatch(
        updateServiceField({ subcategory_id: subcategoryIds.join(",") })
      );
    }
  };

  // Initialize selected values based on subcategory_id
  React.useEffect(() => {
    if (subcategory_id) {
      const selectedSubcategoryIds = subcategory_id.split(",");
      const defaultSelectedValues = subcategory
        ?.filter((sub) => selectedSubcategoryIds.includes(sub.id.toString()))
        .map((sub) => sub.subcategory_name);

      if (defaultSelectedValues) {
        setSelectedValues(defaultSelectedValues);
      }
    }
  }, [subcategory_id, subcategory]);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { getTranslation } = useTranslation();

  return (
    <div className="w-full overflow-hidden">
      <label
        htmlFor="location"
        className={`font-poppins mb-3 block text-sm font-medium capitalize  ${
          isDarkMode ? " text-white" : " text-black "
        }`}
      >
         {getTranslation("Sub Category", "Sub Category")}
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>

      <FormControl style={{ width: "100%" }}>
        <Select
          multiple
          value={selectedValues}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          disabled={!category_id} // Disable if no category_id
          sx={{
            color: isDarkMode ? "white" : "black",
            "&:focus": {
              backgroundColor: "#f5f5f5",
            },

            "&:disabled": {
              backgroundColor: "#f5f5f5",
              color: "#cccccc",
            },
            "&:not(:first-child)": {
              marginTop: 8,
            },
          }}
        >
          {/* Render options only if subcategory data is available */}
          {subcategory?.map((sub) => (
            <MenuItem
              key={sub.id}
              value={sub.subcategory_name}
              className="!flex !gap-2"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(sub.subcategory_name)}
                onChange={() => {
                  const newSelectedValues = selectedValues.includes(
                    sub.subcategory_name
                  )
                    ? selectedValues.filter(
                        (value) => value !== sub.subcategory_name
                      )
                    : [...selectedValues, sub.subcategory_name];
                  setSelectedValues(newSelectedValues);

                  // Update Redux with the new subcategory selections
                  const selectedSubcategories = subcategory?.filter((sub) =>
                    newSelectedValues.includes(sub.subcategory_name)
                  );

                  if (selectedSubcategories) {
                    const subcategoryIds = selectedSubcategories.map(
                      (sub) => sub.id
                    );
                    dispatch(
                      updateServiceField({
                        subcategory_id: subcategoryIds.join(","),
                      })
                    );
                  }
                }}
                disabled={!category_id}
              />
              {sub.subcategory_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        sx={{
          mt: 2,

          color: isDarkMode ? "white" : "black",
        }}
      >
        {selectedValues.map((value) => (
          <Chip
            key={value}
            label={value}
            onDelete={() => handleDelete(value)}
            sx={{
              margin: 0.5,
              color: isDarkMode ? "white" : "black",
              backgroundColor: isDarkMode ? "#333333" : "#ffffff",
              border: isDarkMode ? "1px solid #cccccc" : "1px solid #333333",
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: isDarkMode ? "#444444" : "#cccccc",
              },
              "&:focus": {
                backgroundColor: isDarkMode ? "#444444" : "#cccccc",
              },
              "&:active": {
                backgroundColor: isDarkMode ? "#333333" : "#cccccc",
              },
              "&:first-child": {
                marginLeft: 0,
              },
              "&:not(:first-child)": {
                marginLeft: 2,
              },
            }}
          />
        ))}
      </Box>

      {/* Message when category is not selected */}
      {!category_id && (
        <Box sx={{ mt: 2, color: "gray" }}>
             {getTranslation("Please select a category to see subcategories.", "Please select a category to see subcategories.")}
        </Box>
      )}
    </div>
  );
}
