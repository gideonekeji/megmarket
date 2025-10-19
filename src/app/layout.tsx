"use client"; // Ensure client-side rendering

import "./globals.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

// Dynamically import components to prevent SSR
const StoreProvider = dynamic(() => import("./storeApp/StoreProvider"), {
  ssr: false,
});
const Header = dynamic(() => import("./header/page"), { ssr: false });
const Footer = dynamic(() => import("./fotter/page"), { ssr: false });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [languageAlignment, setLanguageAlignment] = useState("ltr");


  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedLanguageString = localStorage.getItem("selectedLanguage");
  //     const storedLanguage = storedLanguageString ? JSON.parse(storedLanguageString) : null;
  //     setLanguageAlignment(storedLanguage?.language_alignment ?? "ltr");

  //     // Disable right-click
  //     const handleContextMenu = (e: MouseEvent) => e.preventDefault();
  //     document.addEventListener("contextmenu", handleContextMenu);

  //     // Block specific keys
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       if (
  //         e.key === "F12" ||
  //         (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
  //         (e.ctrlKey && e.key === "U")
  //       ) {
  //         e.preventDefault();
  //       }
  //     };
  //     document.addEventListener("keydown", handleKeyDown);

  //     // Cleanup on unmount
  //     return () => {
  //       document.removeEventListener("contextmenu", handleContextMenu);
  //       document.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }
  // }, []);
  return (
    <html lang="en" dir={languageAlignment} suppressHydrationWarning>
      <body className="bg-white    dark:bg-dark-background" suppressHydrationWarning>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}
