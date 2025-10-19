"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import Cookies from "js-cookie";

import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { usegetLive } from "@/app/storeApp/api/usegetLive";
import { useGetUserDetail } from "@/app/storeApp/api/useGetUserDetail";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";

import AvatarWithSpinner from "../Loading/AvatarWithSpinner";
import HomeHeroSection from "./HomeHeroSection";
import HomeSectionSerachBox from "./HomeSectionSerachBox";
import Services from "./ServicesSection3/Services";
import Section4 from "./Section4";
import SponsorStores from "./SponsorStores/SponsorStores";
import NewCities from "./NewCities/NewCities";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8/Section8";
import Section9 from "./Section9/Section9";
import LanguageUpdater from "../Language/LanguageUpdater";

function AllComponetsHomeScrenn() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { isLoading } = useHomeScreenApi();
  const { data } = usegetLive();

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data: updateswervice }] = useUpdateServiceMutation();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [showSection9, setShowSection9] = useState(false);

  // Global first-render loader
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Update service on mount if vendor & service IDs exist
  useEffect(() => {
    if (vendor_id && service_id) {
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  // Store service name in cookies
  useEffect(() => {
    const serviceName = updateswervice?.service?.service_name;
    if (serviceName) {
      Cookies.set("servicename1", encodeURIComponent(serviceName));
    }
  }, [updateswervice]);

  // Handle dark mode
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  // Show Section9 based on live payment data
  useEffect(() => {
    if (data?.is_payment) {
      Cookies.set("demo", data?.is_payment);
    } else {
      Cookies.remove("demo");
    }
    setShowSection9(!!Cookies.get("demo"));
  }, [data?.is_payment]);

  // Store demo user info
  const { data: userdetails } = useGetUserDetail();
  useEffect(() => {
    if (userdetails?.userdetails?.is_demo) {
      Cookies.set("demoUser", userdetails.userdetails.is_demo.toString());
    } else {
      Cookies.remove("demoUser");
    }
  }, [userdetails?.userdetails?.is_demo]);

  // ✅ Global loader
  if (isLoading || isPageLoading) {
    return (
      <div className="w-full flex justify-center dark:bg-dark-background items-center h-screen">
        <AvatarWithSpinner />
      </div>
    );
  }

  return (
    <div className="h-auto w-full bg-light-background dark:bg-dark-background">
      <HomeHeroSection />
      <HomeSectionSerachBox />
      <div className="flex flex-col gap-y-[6rem]">
        <Services />
        <Section4 />
        <SponsorStores />
        <NewCities />
        <Section6 />
        <Section7 />
        <Section8 />
        {showSection9 && <Section9 />}
        <LanguageUpdater />
      </div>
    </div>
  );
}

export default AllComponetsHomeScrenn;
