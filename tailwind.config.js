// ✅ tailwind.config.js — CommonJS style (recommended for Vite)
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your custom colors
        brandBlue: "#1fb6ff",
        softGray: {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
        },
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: []
};
