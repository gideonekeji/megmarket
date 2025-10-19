"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Static assets
import line from "../../../public/assets/Image/line.png";

// Hooks
import { useAppSelector } from "../hooks/hooks";
import useTranslation from "../hooks/useTranslation";

// API hooks
import { useGetCategoriesQuery } from "../storeApp/api/useGetCategory";
import { useAddNewsemail } from "../storeApp/api/useAddNewsemail";

// Redux slices
import { setActiveComponent } from "../storeApp/Slice/activeComponentSlice";
import { setSelectedCategoryListing } from "../storeApp/Slice/Listing/CategoryLIstingSlice";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";

// Components
import SubscribeMessageBox from "./SubscribeMessageBox";


function Fotter() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();

  const { data } = useGetCategoriesQuery();

  console.log(" my api responce called ", data?.data);

  const router = useRouter();
  const categories = data?.data || [];
  const firstColumn = categories.slice(0, 5);
  const secondColumn = categories.slice(5, 10);
  const thirdColumn = categories.slice(10, 15);
  const fourthColumn = categories.slice(15, 20);

  const hnadalprivacyclik = () => {
    router.push("/Profile");
    dispatch(setActiveComponent("Privacy Policy"));
  };

  const handaltermcom = () => {
    router.push("/Profile");
    dispatch(setActiveComponent("Terms and Condition"));
  };

  console.log(" my   api responce called12121212~~~@!@ ", firstColumn);

  const [email, setEmail] = useState("");
  const { mutate, isLoading } = useAddNewsemail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }

    console.log("Submitting Email:", email); // ✅ Log input email before API call

    mutate(email, {
      onSuccess: (resp: any) => {
        console.log("API Response onSuccess:", resp); // ✅ Log API success response
        toast.success(resp?.message || "Your email has been successfully subscribed!");
        setEmail(""); // Clear input field after successful submission
      },
      onError: (error: any) => {
        console.error("API Response onError:", error.response?.data || error.message); // ✅ Log API error response
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    });
  };

  const { getTranslation } = useTranslation();


  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  return (
    <div
      className={`relative w-full pt-[8rem]   ${isDarkMode ? "dark:bg-[#181818] " : ""
        } `}
    >
      {/* fotter top content */}
      <SubscribeMessageBox />

      {/* fotter content  */}
      <div
        className={`w-full h-auto   bg-center bg-cover flex  justify-center    items-center  backgroundImage2   ${isDarkMode ? "dark:bg-[#181818]" : ""
          }`}
      >
        <div
          className={`w-full flex flex-col h-full pt-20 pb-5  ${isDarkMode ? "dark:bg-[#2F2F2F]" : ""
            }`}
        >
          {/* Footer Content */}
          <div className="w-[90%] 2xl:w-[68%] mx-auto grid  grid-cols-2    md:grid-cols-[20%_80%] gap-8 gap-y-6">
            {/* Use Links Links */}
            <div className="flex flex-col items-center md:items-start space-y-6  w-full ">
              <div className="flex flex-col items-center md:items-start gap-y-3">
                <h3 className=" text-H6 text-light-button-base font-poppins">
                  {getTranslation("Use Links ", "Use Links")}
                </h3>
                <Image src={line} alt="Line" className="w-16" />
              </div>
              <div className="flex flex-col items-start space-y-4 text-sm font-medium">
                <p
                  className={` text-[18px]   font-normal font-poppins cursor-pointer hover:text-[#226FE4] ${isDarkMode ? "dark:text-white" : ""
                    }`}
                  onClick={() => router.push("/about")}
                >
                  About Us
                </p>

                <p
                  className={`text-[18px]   font-normal  font-poppins cursor-pointer hover:text-[#226FE4] ${isDarkMode ? "dark:text-white" : ""
                    }`}
                  onClick={hnadalprivacyclik}
                >
                  Privacy Policy
                </p>

                <p
                  className={` text-[18px]   font-normal font-poppins cursor-pointer hover:text-[#226FE4] ${isDarkMode ? "dark:text-white" : ""
                    }`}
                  onClick={handaltermcom}
                >
                  Terms & Conditions
                </p>
              </div>
            </div>
            <div className="w-full   md:hidden">
              {/* Heading */}
              <div className="flex flex-col items-center md:items-start gap-y-3">
                <h3 className=" text-H6  text-light-button-base font-poppins">
                  {getTranslation("Categories", "Categories")}
                </h3>
                <Image src={line} alt="Line" className="w-16" />
              </div>

              {/* Categories Grid */}
              <div className="grid  w-full justify-items-center  items-center md:grid-cols-4 gap-6 mt-4">
                {[firstColumn].map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 text-sm font-medium"
                  >
                    {column.map((category) => (
                      <p
                        key={category.id}
                        className={`  text-T6 xl:text-B3 font-poppins cursor-pointer hover:text-[#226FE4]  ${isDarkMode ? "dark:text-white" : ""
                          }`}
                        onClick={() => {
                          router.push("/store");

                          sessionStorage.setItem(
                            "Category_ID",
                            category.id.toString()
                          );
                          sessionStorage.setItem(
                            "Category_Name",
                            category.category_name
                          );

                          sessionStorage.removeItem("subcategory_name");
                          sessionStorage.removeItem("subcategories_id");

                          dispatch(
                            setSelectedCategoryListing({
                              id: category.id.toString(),
                              category_name: category.category_name,
                            })
                          );
                        }}
                      >
                        {category.category_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className=" w-full  md:hidden">
              <div className="grid    grid-flow-col  w-full gap-6 mt-4">
                {[secondColumn].map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 text-sm font-medium"
                  >
                    {column.map((category) => (
                      <p
                        key={category.id}
                        className={` text-T6 xl:text-B3 font-poppins cursor-pointer hover:text-[#226FE4]  ${isDarkMode ? "dark:text-white" : ""
                          }`}
                        onClick={() => {
                          router.push("/store");

                          sessionStorage.setItem(
                            "Category_ID",
                            category.id.toString()
                          );
                          sessionStorage.setItem(
                            "Category_Name",
                            category.category_name
                          );

                          sessionStorage.removeItem("subcategory_name");
                          sessionStorage.removeItem("subcategories_id");

                          dispatch(
                            setSelectedCategoryListing({
                              id: category.id.toString(),
                              category_name: category.category_name,
                            })
                          );
                        }}
                      >
                        {category.category_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className=" w-full  md:hidden">
              <div className="grid    grid-flow-col  w-full gap-6 mt-4">
                {[thirdColumn].map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 text-sm font-medium"
                  >
                    {column.map((category) => (
                      <p
                        key={category.id}
                        className={` text-T6 xl:text-B3 font-poppins cursor-pointer hover:text-[#226FE4]  ${isDarkMode ? "dark:text-white" : ""
                          }`}
                        onClick={() => {
                          router.push("/store");

                          sessionStorage.setItem(
                            "Category_ID",
                            category.id.toString()
                          );
                          sessionStorage.setItem(
                            "Category_Name",
                            category.category_name
                          );

                          sessionStorage.removeItem("subcategory_name");
                          sessionStorage.removeItem("subcategories_id");

                          dispatch(
                            setSelectedCategoryListing({
                              id: category.id.toString(),
                              category_name: category.category_name,
                            })
                          );
                        }}
                      >
                        {category.category_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full  md:hidden">
              <div className="grid    grid-flow-col  justify-items-center  items-center w-full gap-6 mt-4">
                {[fourthColumn].map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 text-sm font-medium"
                  >
                    {column.map((category) => (
                      <p
                        key={category.id}
                        className={`text-T6 xl:text-B3 font-poppins cursor-pointer hover:text-[#226FE4]  ${isDarkMode ? "dark:text-white" : ""
                          }`}
                        onClick={() => {
                          router.push("/store");

                          sessionStorage.setItem(
                            "Category_ID",
                            category.id.toString()
                          );
                          sessionStorage.setItem(
                            "Category_Name",
                            category.category_name
                          );

                          sessionStorage.removeItem("subcategory_name");
                          sessionStorage.removeItem("subcategories_id");

                          dispatch(
                            setSelectedCategoryListing({
                              id: category.id.toString(),
                              category_name: category.category_name,
                            })
                          );
                        }}
                      >
                        {category.category_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Categories Section */}
            <div className="w-full hidden md:block">
              {/* Heading */}
              <div className="flex flex-col items-center md:items-start gap-y-3">
                <h3 className=" text-H6 text-light-button-base font-poppins">
                  {getTranslation("Categories", "Categories")}
                </h3>
                <Image src={line} alt="Line" className="w-16" />
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                {[firstColumn, secondColumn, thirdColumn, fourthColumn].map(
                  (column, index) => (
                    <div
                      key={index}
                      className="flex flex-col space-y-2 mt-2    gap-2 text-sm font-medium"
                    >
                      {column.map((category) => (
                        <p
                          key={category.id}
                          className={`font-normal text-[18px]    font-poppins cursor-pointer hover:text-[#226FE4]  ${isDarkMode ? "dark:text-white" : ""
                            }`}
                          onClick={() => {
                            router.push("/store");

                            sessionStorage.setItem(
                              "Category_ID",
                              category.id.toString()
                            );
                            sessionStorage.setItem(
                              "Category_Name",
                              category.category_name
                            );

                            sessionStorage.removeItem("subcategory_name");
                            sessionStorage.removeItem("subcategories_id");

                            dispatch(
                              setSelectedCategoryListing({
                                id: category.id.toString(),
                                category_name: category.category_name,
                              })
                            );
                          }}
                        >
                          {category.category_name}
                        </p>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="flex justify-center pb-3 items-center mt-10 w-[90%] md:w-[80%] mx-auto text-center">
            <p
              className={`font-poppins ${isDarkMode ? "dark:text-white" : "text-black"}`}
            >
              Copyright © 2000-2024{" "}
              <a
                href="https://megmarketafrica.com/"
                className={`${isDarkMode ? "dark:text-white" : "text-black"} font-semibold`}
              >
                Meg Market Africa
              </a>{" "}
              All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Fotter;
