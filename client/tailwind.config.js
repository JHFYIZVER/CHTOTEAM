/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#2C2F48",
        darkBlue: "#1D203E",
        dark: "#0E141B",
        aside: "#22253E",
        active: "#31295B",
        gray: "#76808C",
        input: "#393D5D",
        tag: "#556772",
        link: "#66C0F4",
        discription: "#8F98A0",
        red: "#F34D4D"
      },
      maxWidth: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
        xxl: "2560px",
      },
      borderRadius: {
        bigBtn: "8px",
        smallBtn: "3px",
      },
      padding: {
        35: "35px",
      },
    },
  },
  plugins: [],
};
