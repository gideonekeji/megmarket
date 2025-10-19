import React, { useEffect, useRef, useState } from "react";
import useTranslation from "@/app/hooks/useTranslation";
import { useAppSelector } from "@/app/hooks/hooks";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

function BusinessDescriptionUpdateNewVersion({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);
  const [isQuillReady, setIsQuillReady] = useState(false);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  useEffect(() => {
    const quillCSS = document.createElement("link");
    quillCSS.rel = "stylesheet";
    quillCSS.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
    document.head.appendChild(quillCSS);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js";
    script.onload = () => setIsQuillReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isQuillReady && window.Quill && editorRef.current) {
      quillInstance.current = new window.Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your service description here...",
      });

      if (value) {
        quillInstance.current.clipboard.dangerouslyPasteHTML(value);
      }

      quillInstance.current.on("text-change", () => {
        let html =
          editorRef.current?.querySelector(".ql-editor")?.innerHTML || "";

        // Remove all inline color and background-color styles
        html = html.replace(/style="[^"]*(color|background-color)[^"]*"/gi, "");

        onChange(html);
      });
    }
  }, [isQuillReady]);

  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value]);

  return (
    <div className="my-4 flex flex-col gap-[6px] font-poppins overflow-hidden">
      <label
        className={`text-B4 mb-[2px] ${isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"}`}
        htmlFor="service_description"
      >
        {getTranslation("Business Description", "Business Description")}
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div ref={editorRef} />
    </div>
  );
}

export default BusinessDescriptionUpdateNewVersion;
