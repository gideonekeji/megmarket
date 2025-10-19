"use client";
import React, { useEffect, useState } from "react";
import Card from "../componets/homesection/ServicesSection3/Card";
import Header from "../componets/Category/Header";
import { useGetCategoriesQuery } from "../storeApp/api/useGetCategory";
import { Categorydata } from "@/app/types/Restypes";
import AvatarWithSpinner from "../componets/Loading/AvatarWithSpinner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { setSelectedCategory } from "../storeApp/Slice/category/categorySlice";
import { useAppSelector } from "../hooks/hooks";
import Categories from "../componets/AllBreadCome/CategorisBreadCome/Categories";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import { setSelectedCategoryListing } from "../storeApp/Slice/Listing/CategoryLIstingSlice";
import { TailSpin } from "react-loader-spinner";

function Category() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const [loadingCategory, setLoadingCategory] = useState<number | null>(null);

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);
  // Access selected category from Redux store
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );

  if (isLoading) {
    return (
      <div className="w-full justify-center items-center flex h-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching categories.</div>;
  }

  const categories = data?.data || [];

  // Handle category card click

  const handleCategoryClick = (category: Categorydata) => {
    setLoadingCategory(category.id);

    dispatch(
      setSelectedCategoryListing({
        id: category.id,
        category_name: category.category_name,
      })
    );

    sessionStorage.setItem("Category_Name", category.category_name);
    sessionStorage.setItem("Category_ID", category.id);

    const serviceSlug = category.category_name.toLowerCase().replace(/\s+/g, "-");

    router.push(`/store`).finally(() => setLoadingCategory(null));
  };


  return (
    <div className={`w-full h-auto   bg-light-background    dark:bg-dark-background`}>
      <div>
        <Categories />
      </div>

      {/* All Categories */}
      <div className="mx-auto   w-[90%]  2xl:w-[68%]  gap-6  mt-[128px]  grid   xl:grid-cols-7  md:grid-cols-5  grid-cols-2 2xl:grid-cols-8">
        {categories.length > 0 ? (
          categories.map((category: Categorydata) => (
            <Card
              key={category.id}
              id={category.id}
              category_image={category.category_image}
              category_name={category.category_name}
              subcategories_count={category.subcategories_count}
              onClick={() => handleCategoryClick(category)}
              isLoading={loadingCategory === category.id} // Pass loading state for each category
            />
          ))
        ) : (
          <div>No categories available.</div>
        )}

      </div>
    </div>
  );
}

export default Category;
