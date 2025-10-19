"use client";
import React, { useEffect } from "react";
import { useGetSubCategoriesQuery } from "@/app/storeApp/api/useGetAllSubCategory";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import SubCategoryCard from "@/app/componets/SubCategory/SubCategoryCard";
import { usePathname, useRouter } from "next/navigation";
import { SubCategoryData } from "@/app/types/Restypes";
import { useDispatch } from "react-redux";
import { setselectedSubCategory } from "@/app/storeApp/Slice/category/subcategorySlice";
import { useAppSelector } from "@/app/hooks/hooks";
import video from "../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import Image from "next/image";
import SubcategoryBreadCome from "@/app/componets/AllBreadCome/CategorisBreadCome/SubcategoryBreadCome";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import { encodeString } from "@/app/utils/enocodeAndDecode";

function Category() {
  const router = useRouter();
  const lastSegment = sessionStorage.getItem("Category_ID");
  const dispatch = useDispatch(); // Initialize dispatch

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  // const selectedCategory = useAppSelector(
  //   (state) => state.subcategory.selectedSubCategory
  // );

  const { data, error, isLoading } = useGetSubCategoriesQuery({
    category_id: lastSegment || "",
  });

  if (isLoading) {
    return (
      <div className="w-full justify-center items-center flex h-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      (error as { message?: string }).message || "Error loading subcategories";
    return (
      <div className="text-red-500 p-4 border border-red-500 rounded-md">
        {errorMessage}
      </div>
    );
  }

  // Handle category card click
  const handleCategoryClick = (subCategory: SubCategoryData) => {
    // Dispatch the action to store the selected subcategory
    dispatch(
      setselectedSubCategory({
        id: subCategory.id,
        subcategory_name: subCategory.subcategory_name,
      }),
      sessionStorage.setItem("subcategory_name", subCategory.subcategory_name),
      sessionStorage.setItem("subcategories_id", subCategory.id)
    );

    const encodedServiceId = encodeString(String(subCategory.id)); // Ensure serviceId is a string
    const serviceSlug = subCategory.subcategory_name
      .toLowerCase()
      .replace(/\s+/g, "-"); // Convert name to URL slug

    // Navigate to the detail page
    router.push(`subcategorydetail/${serviceSlug}`);
  };

  if (!data?.subCategoryData?.length) {
    return (
      <div className={`w-full h-auto    ${isDarkMode ? " bg-[#181818]" : ""} `}>
        <SubcategoryBreadCome />
        <div className="flex h-auto min-h-screen w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src={video}
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <h2
            className={`font-poppins font-medium  ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            No Data Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-auto    ${isDarkMode ? " bg-[#181818]" : ""} `}>
      <SubcategoryBreadCome />
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[95%] grid gap-4 mt-[4rem]   ">
        {data?.subCategoryData?.map((subCategory: SubCategoryData) => (
          <SubCategoryCard
            key={subCategory.id}
            id={subCategory.id}
            subcategory_name={subCategory.subcategory_name}
            subcategory_image={subCategory.subcategory_image}
            services_count={subCategory.services_count}
            category_id={subCategory.category_id}
            onClick={() => handleCategoryClick(subCategory)} // Pass the full subCategory object
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
