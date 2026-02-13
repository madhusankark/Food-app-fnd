/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // React files
  ],
  theme: {
    extend: {
      colors: {
        india: {
          saffron: "#FF9933",
          white: "#FFFFFF",
          green: "#138808",
          navy: "#000080",   // Ashoka Chakra color
        },
      },
      fontFamily: {
        india: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "tricolor-gradient":
          "linear-gradient(to right, #FF9933, #FFFFFF, #138808)",
      },
    },
  },
  plugins: [],
};
