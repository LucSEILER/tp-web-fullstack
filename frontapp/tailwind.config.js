/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scanne tous tes fichiers React
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F1D26",
        secondary: "#64748b",
        accent: "#10b981",
      },
    },
  },
  plugins: [],
};
