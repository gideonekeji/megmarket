"use client";

import React, { useEffect, useRef, useState } from "react";
import useTranslation from "@/app/hooks/useTranslation";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { setStoreDescription } from "@/app/storeApp/Slice/AddStore";

function AddStoreDescription() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);
  const [isQuillReady, setIsQuillReady] = useState(false);

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const store_description = useAppSelector(
    (state) => state.AddStore.store_description
  );
  const { getTranslation } = useTranslation();

  // Clean unwanted styles from HTML
  const cleanHTML = (html: string) => {
    if (!html) return "";

    // Remove inline color & background styles
    html = html.replace(/\s*color\s*:\s*[^;"]+;?/gi, "");
    html = html.replace(/\s*background-color\s*:\s*[^;"]+;?/gi, "");

    // Remove empty style attributes
    html = html.replace(/\sstyle="\s*"/gi, "");

    // Remove empty spans or spans with no attributes
    html = html.replace(/<span(?:\s+style="")?>\s*<\/span>/gi, "");

    return html;
  };

  // Load Quill CSS
  useEffect(() => {
    const quillCSS = document.createElement("link");
    quillCSS.rel = "stylesheet";
    quillCSS.href =
      "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
    document.head.appendChild(quillCSS);
  }, []);

  // Load Quill JS dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js";
    script.onload = () => setIsQuillReady(true);
    document.body.appendChild(script);
  }, []);

  // Initialize Quill
  useEffect(() => {
    if (isQuillReady && window.Quill && editorRef.current) {
      quillInstance.current = new window.Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Store description typing...",
        formats: [
          "bold",
          "italic",
          "underline",
          "strike",
          "link",
          "list",
          "bullet",
          "blockquote",
          "code-block",
        ], // restrict formats to prevent unwanted styles
      });

      // Pre-fill existing value
      if (store_description) {
        quillInstance.current.clipboard.dangerouslyPasteHTML(
          cleanHTML(store_description)
        );
      }

      // Listen for changes
      quillInstance.current.on("text-change", () => {
        let html =
          editorRef.current?.querySelector(".ql-editor")?.innerHTML || "";
        html = cleanHTML(html);
        dispatch(setStoreDescription(html));
      });
    }
  }, [isQuillReady, store_description, dispatch]);

  return (
    <div className="flex flex-col w-full   font-poppins overflow-hidden">
      <label
        className={`text-sm font-medium mb-[4px] ${
          isDarkMode ? "text-white" : "text-black"
        }`}
        htmlFor="store_description"
      >
        {getTranslation("Service Description", "Service Description")}
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div
        ref={editorRef}
     
      />
    </div>
  );
}

export default AddStoreDescription;
