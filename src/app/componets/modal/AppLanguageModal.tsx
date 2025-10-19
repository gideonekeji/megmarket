"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import "./style.css";
import { useListAllLanguages } from "@/app/storeApp/api/Language/uselistAllLanguages";
import { useFetchDefaultLanguage } from "@/app/storeApp/api/Language/useFetchDefaultLanguage";
import { setLanguage } from "@/app/storeApp/Slice/languageSlice";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";

function AppLanguageModal() {
  const modalData = useAppSelector((state) => state.modals.AppLanguage);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Sync dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  const { data, isLoading, isError } = useListAllLanguages();
  const { mutate: fetchDefaultLanguage, data: defaultdata } =
    useFetchDefaultLanguage();

  const [selectedLanguage, setSelectedLanguage] = useState({
    language: "English",
    status_id: 1,
    country: "US",
    language_alignment: "ltr",
    default_status: 1,
  });

  useEffect(() => {
    const storedLanguageString = localStorage.getItem("selectedLanguage");
    if (storedLanguageString) {
      try {
        const storedLanguage = JSON.parse(storedLanguageString);
        setSelectedLanguage(storedLanguage);
        fetchDefaultLanguage(storedLanguage?.status_id ?? "1");
      } catch (error) {
        console.error("Error parsing language data:", error);
      }
    }
  }, [fetchDefaultLanguage]);

  useEffect(() => {
    if (defaultdata) {
      dispatch(
        setLanguage({
          language: defaultdata.language || "Hindi",
          language_alignment: defaultdata.language_alignment || "ltr",
          translations: defaultdata.results || [],
        })
      );
    }
  }, [defaultdata, dispatch]);

  const handleLanguageSelection = (lang) => {
    setSelectedLanguage({
      language: lang.language,
      status_id: lang.status_id,
      country: lang.country,
      language_alignment: lang.language_alignment,
      default_status: lang.default_status,
    });
  };

  const handleApplyClick = async () => {
    try {
      await fetchDefaultLanguage({ status_id: selectedLanguage.status_id });
      localStorage.setItem(
        "selectedLanguage",
        JSON.stringify(selectedLanguage)
      );
      dispatch(hideModal("AppLanguage"));
      window.location.reload();
    } catch (error) {
      console.error("Error applying language:", error);
    }
  };

  return (
    <Dialog
      open={modalData}
      onClose={() => dispatch(hideModal("AppLanguage"))}
      as="div"
      className="z-50"
    >
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%] 2xl:w-[25%]  bg-white  dark:bg-dark-secondarybg`}
          >
            <div
              className={`flex h-auto w-full items-center justify-center rounded-xl p-4 ${isDarkMode
                  ? "text-[#FFFFFF] shadow-lg bg-[#FFFFFF0A]"
                  : "text-[#000000] deleteac"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium">Language</h3>
            </div>
            <div className="flex h-auto w-full flex-col gap-6 p-8">
              {data?.languages?.map((lang) => (
                <div
                  key={lang.status_id}
                  className={`flex w-full cursor-pointer items-start justify-start gap-3 rounded-xl p-2 transition duration-200 ${selectedLanguage.status_id === lang.status_id
                      ? "text-black"
                      : "text-black"
                    }`}
                  onClick={() => handleLanguageSelection(lang)}
                >
                  <div className="applanguagebordercolor mt-1 flex h-5 w-5 items-center justify-center rounded-full border border-light-button-base">
                    <div
                      className={`h-[50%] w-[50%] rounded-full ${selectedLanguage.status_id === lang.status_id
                          ? "   bg-light-button-base  "
                          : "bg-transparent"
                        }`}
                    ></div>
                  </div>
                  <div
                    className={`font-poppins flex items-center justify-center   text-B2 pt-[6px] ${selectedLanguage.status_id === lang.status_id
                        ? ""
                        : isDarkMode
                          ? "text-[#FFFFFF]"
                          : "text-[#000000]"
                      }`}
                  >
                    {lang.language}
                  </div>
                </div>
              ))}
              <div className="flex w-full items-center justify-center gap-3">
                <button
                  className={`font-poppins w-full text-B3 rounded-lg py-3     text-light-button-base border  border-light-button-base `}
                  onClick={() => dispatch(hideModal("AppLanguage"))}
                >
                  Cancel
                </button>
                <button
                  className="font-poppins w-full rounded-lg text-B3   bg-light-button-base py-3 text-white"
                  onClick={handleApplyClick}
                >
                  Apply
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default AppLanguageModal;
