import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          "50": "#faf7fc",
          "100": "#f4eff8",
          "200": "#e8dfef",
          "300": "#d7c5e2",
          "400": "#bea1d1",
          "500": "#a17bba",
          "600": "#855d9c",
          "700": "#6c497e",
          "800": "#5b3e6a",
          "900": "#4e3758",
          "950": "#2e1b37",
        },
        "anti-plum": {
          "50": "#f5f5f6",
          "100": "#e6e6e7",
          "200": "#d0d0d1",
          "300": "#b0aeb2",
          "400": "#7f7d82",
          "500": "#6c6b6f",
          "600": "#5d5b5f",
          "700": "#4f4e50",
          "800": "#454446",
          "900": "#272727",
          "950": "#111011",
        },
      },
    },
    fontFamily: {
      sans: "var(--font-main-sans)",
      serif: "var(--font-main-serif)",
      mono: "var(--font-main-mono)",
    },
  },
  plugins: [],
};
export default config;
