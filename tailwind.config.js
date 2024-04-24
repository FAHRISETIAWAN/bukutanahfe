/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#003E69",
        white: "#ffffff",
        yellow: "#FEC32F",
        background: "#f4f4f4",
        text: {
          DEFAULT: "#000000",
          light: "#80808F",
        },
        light: {
          DEFAULT: "#FAFBFC",
          lighter: "#F3F4F6",
        },
      },
    },
  },
  plugins: [
  ],
};
