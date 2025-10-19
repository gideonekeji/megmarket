import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      screens: {
        "2xl": "1536px",
        "3xl": "2100px"
      },

      backgroundImage: {
        "blue-gradient-180":
          "linear-gradient(180deg, rgba(34, 111, 228, 0) 0%, #226FE4 100%)",

        "blue-gradient-176":
          "linear-gradient(176.96deg, rgba(0, 70, 174, 0.41) -37.76%, #001D48 114.06%)",
      },

      colors: ({ colors }) =>
        flattenColorPalette({
          ...colors,
          // Light mode colors global
          light: {
            background: "#FFF",
            topheaderbg: "#000",
            primary: "#FF0000",
            secondary: "#000000",
            muted: "#535353",
            darkcolor: "#212121",
            box: "#F4F4F4",
            blueAccent: "#0C57E6",
            border: "#EFEFEF",
            inputbgcolor: "#FFF",
            inputFocuscolor: "#226FE4",
            button: {
              base: "#226FE4",
              hover: "#1E40AF",
            },

            bordercolo: {
              maincolor: "#226FE41A",
              focusbordercolo: "#226FE4"
            },
            textsecondarycolor: "#B4B4B4"
          },

          // Dark mode colors
          dark: {
            background: "#181818",
            secondarybg: "#2F2F2F",
            Modalbgcolortop:"#2F2F2F",
            Modelbgolorall:"",
            authbgcolor:"#1D1D1D",
            bginput: "#B4B4B414",
            bordercolorinput: "#363636",
            primary: "#FF6B6B",
            opacitybg: "#226FE45C",
            secondary: "#FFFFFF",
            muted: "#B0B0B0",
            box: "#1A1A1A",
            blueAccent: "#60A5FA",
            border: "#B4B4B414",
            darkcolor: "#FFF",
            inputFocuscolor: "#226FE4",
            inputbgcolor: "#FFFFFF0A",
            button: {
              base: "#3B82F6",
              hover: "#2563EB",
            },
          },
        }),

      fontFamily: {
        poppins: ["Poppins", "serif"],
        americansign: ["AmericanSign", "cursive"],
      },

      fontSize: {
        //  final  Web Typography 

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Heading ++++++++++++++++++++++++++++++++++++ //

        H1: ["52px", { lineHeight: "100%", fontWeight: "600" }],
        H2: ["46px", { lineHeight: "100%", fontWeight: "400" }],
        H3: ["40px", { lineHeight: "100%", fontWeight: "600" }],
        H4: ["32px", { lineHeight: "100%", fontWeight: "700" }],
        H5: ["30px", { lineHeight: "100%", fontWeight: "700" }],
        H6: ["24px", { lineHeight: "100%", fontWeight: "600" }],

        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Text ++++++++++++++++++++++++++++++++++++ //


        T1: ["24px", { lineHeight: "100%", fontWeight: "400" }],
        T2: ["22px", { lineHeight: "20px", fontWeight: "600" }],
        T3: ["22px", { lineHeight: "100%", fontWeight: "400" }],
        T4: ["20px", { lineHeight: "100%", fontWeight: "600" }],
        T5: ["16px", { lineHeight: "20px", fontWeight: "400" }],
        T6: ["16px", { lineHeight: "20px", fontWeight: "400" }],
        T7: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        T8: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        T9: ["12px", { lineHeight: "20px", fontWeight: "400" }],
        T10: ["10px", { lineHeight: "20px", fontWeight: "600" }],
        T11: ["12px", { lineHeight: "20px", fontWeight: "400" }],
        T12: ["12px", { lineHeight: "100%", fontWeight: "400" }],
        T13: ["9.55px", { lineHeight: "100%", fontWeight: "400" }],
        T14: ["17.3px", { lineHeight: "100%", fontWeight: "600" }],
        T15: ["12px", { lineHeight: "100%", fontWeight: "500" }],



        // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Button ++++++++++++++++++++++++++++++++++++ //

        B1: ["20px", { lineHeight: "100%", fontWeight: "600" }],
        B2: ["18px", { lineHeight: "100%", fontWeight: "500" }],
        B3: ["18px", { lineHeight: "100%", fontWeight: "500" }],
        B4: ["14px", { lineHeight: "140%", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};

export default config;
