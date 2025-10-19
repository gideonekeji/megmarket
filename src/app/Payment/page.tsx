"use client";

import React, { useEffect } from "react";
import PaymentBreadComeSub from "../componets/AllBreadCome/PaymentBreadComeSub";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import PaymentCombineLeftSideAndRightSide from "../componets/Payment/PaymentCombineLeftSideAndRightSide";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";

function Payment() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useAppDispatch();

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  return (
    <div className=" w-full h-auto flex flex-col  dark:bg-dark-background bg-light-background">
      <div>
        <PaymentBreadComeSub />
      </div>

      <div
        className={`mx-auto 2xl:w-[50%] xl:w-[80%] w-[90%] mt-[3rem]      gap-6    flex   `}
      >
        <PaymentCombineLeftSideAndRightSide />
      </div>
    </div>
  );
}

export default Payment;
