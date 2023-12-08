/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Hedvig: ["Hedvig Letters Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
