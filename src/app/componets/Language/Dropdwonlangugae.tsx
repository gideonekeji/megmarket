"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import languageicon from "../../../../public/assets/Image/language.png";
import dropdwonicon from "../../../../public/assets/Image/dropdwonicon.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useListAllLanguages } from "@/app/storeApp/api/Language/uselistAllLanguages";
import { useFetchDefaultLanguage } from "@/app/storeApp/api/Language/useFetchDefaultLanguage";
import { setLanguage } from "@/app/storeApp/Slice/languageSlice";

function DropdwonLanguage() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { data } = useListAllLanguages();
  const { mutate: fetchDefaultLanguage, data: defaultdata } =
    useFetchDefaultLanguage();

  const [selectedLanguage, setSelectedLanguage] = useState({
    language: "English",
    status_id: 1,
    country: "US",
    language_alignment: "ltr",
    default_status: 1,
  });

  const [isOpenlanguage, setIsOpenLanguage] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedLanguageString = localStorage.getItem("selectedLanguage");
    const storedLanguage = storedLanguageString
      ? JSON.parse(storedLanguageString)
      : null;

    fetchDefaultLanguage(storedLanguage?.status_id ?? "1");

    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, [fetchDefaultLanguage]);

  useEffect(() => {
    if (defaultdata) {
      const detectedLanguage = defaultdata.language || "Hindi";
      const detectedAlignment = defaultdata.language_alignment || "ltr";

      dispatch(
        setLanguage({
          language: detectedLanguage,
          language_alignment: detectedAlignment,
          translations: defaultdata.results || [],
        })
      );
    }
  }, [defaultdata, dispatch]);

  const handleLanguageSelection = async (
    language: string,
    status_id: number,
    country: string,
    language_alignment: string,
    default_status: number
  ) => {
    const selectedData = {
      language,
      status_id,
      country,
      language_alignment,
      default_status,
    };

    setSelectedLanguage(selectedData);
    localStorage.setItem("selectedLanguage", JSON.stringify(selectedData));
    setIsOpenLanguage(false); // ✅ Close dropdown immediately

    try {
      await fetchDefaultLanguage({ status_id });
      window.location.reload();
    } catch (error) {
      console.error("Error fetching language:", error);
    }
  };

  return (
    <div className="w-full h-auto">
      <div className="flex items-center">
        {/* Language Icon */}
        <button className="z-10 inline-flex items-center py-2.5 text-sm font-medium text-black">
          <div className="h-5 w-5">
            <Image
              src={languageicon}
              alt="Language Icon"
              width={20}
              height={20}
              className={isDarkMode ? "bg-circle-icon" : ""}
            />
          </div>
        </button>

        {/* Language Selector */}
        <div className="group relative cursor-pointer p-2">
          <div
            className="flex items-center gap-2"
            onClick={() => setIsOpenLanguage(!isOpenlanguage)} // ✅ Toggle on click instead of hover
          >
            <p
              className={`text-B3 ${
                isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
              }`}
            >
              {selectedLanguage.language}
            </p>
            <div className="h-4 w-4">
              <Image
                src={dropdwonicon}
                alt="Dropdown Icon"
                width={16}
                height={16}
                className={`transform transition-transform duration-200 ${
                  isOpenlanguage ? "rotate-180" : ""
                } ${isDarkMode ? "bg-circle-icon" : ""}`}
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {isOpenlanguage && (
            <div
              className={`absolute left-0 top-12 z-50 w-[10rem] rounded border shadow transition-all duration-300 ease-out ${
                isDarkMode ? "text-[#FFFFFFCC] bg-[#2F2F2F]" : "bg-white"
              }`}
            >
              <ul className="w-full">
                {data?.languages?.map((lang) => (
                  <li
                    key={lang.status_id}
                    className="cursor-pointer p-3 hover:bg-gray-200"
                    onClick={() =>
                      handleLanguageSelection(
                        lang.language,
                        lang.status_id,
                        lang.country,
                        lang.language_alignment,
                        lang.default_status
                      )
                    }
                  >
                    {lang.language}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DropdwonLanguage;
