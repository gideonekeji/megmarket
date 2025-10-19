"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import useTranslation from "@/app/hooks/useTranslation";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { updateStoreDescription } from "@/app/storeApp/Slice/UpdateStoreSlice";

function UpdateStoreDescription() {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);
  const [isQuillReady, setIsQuillReady] = useState(false);

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const store_description = useAppSelector(
    (state) => state.UpdateStore.store?.store_description
  );
  const { getTranslation } = useTranslation();

  // Clean unwanted styles from HTML
  const cleanHTML = useCallback((html: string) => {
    if (!html) return "";
    return html
      .replace(/\s*color\s*:\s*[^;"]+;?/gi, "")
      .replace(/\s*background-color\s*:\s*[^;"]+;?/gi, "")
      .replace(/\sstyle="\s*"/gi, "")
      .replace(/<span(?:\s+style="")?>\s*<\/span>/gi, "");
  }, []);

  // Quill config memoized
  const quillConfig = useMemo(
    () => ({
      theme: "snow",
      placeholder: "Enter Service Description...",
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
      ],
    }),
    []
  );

  // Load Quill CSS once
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

  // Initialize Quill once
  useEffect(() => {
    if (!isQuillReady || !window.Quill || !editorRef.current || quillInstance.current) return;

    quillInstance.current = new window.Quill(editorRef.current, quillConfig);

    // Pre-fill existing value if present
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
      dispatch(updateStoreDescription(html));
    });
  }, [isQuillReady, quillConfig, cleanHTML, dispatch, store_description]);

  // Update editor only if store_description changes externally
  useEffect(() => {
    if (
      quillInstance.current &&
      store_description &&
      cleanHTML(quillInstance.current.root.innerHTML) !== cleanHTML(store_description)
    ) {
      quillInstance.current.clipboard.dangerouslyPasteHTML(
        cleanHTML(store_description)
      );
    }
  }, [store_description, cleanHTML]);

  return (
    <div className="flex flex-col w-full font-poppins overflow-hidden">
      <label
        className={`text-sm font-medium mb-[4px] ${
          isDarkMode ? "text-white" : "text-black"
        }`}
        htmlFor="store_description"
      >
        {getTranslation("Service Description", "Service Description")}
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div ref={editorRef} />
    </div>
  );
}

export default React.memo(UpdateStoreDescription);
