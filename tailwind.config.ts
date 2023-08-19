import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#444444",
        secondary: "#dfd7af",
        tertiary: "#f5f3ed",
        background: "#1c1c1c",
      },
      fontFamily: {
        Lexend: ["Lexend Deca", "sans-serif"],
        Roboto: ["Roboto Mono", "sans-serif"],
      },
      fontSize: {
        sm: ["12px", {
            fontWeight: 400,
            lineHeight: "16px",
        }],
        base: ["16px", {
            fontWeight: 400,
            lineHeight: "20px",
        }],
        lg: ["24px", {
            fontWeight: 400,
            lineHeight: "24px",
        }],
        xl: ["32px", {
            fontWeight: 400,
            lineHeight: "32px",
        }],
      },
    },
    plugins: [],
  },
};
export default config;
