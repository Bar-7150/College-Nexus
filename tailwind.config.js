/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdfaf3",
          100: "#f9f2e3",
          200: "#f1e3c3",
          300: "#e6cf9b",
          400: "#d9b870",
          500: "#c79e4d",
          600: "#b3853b",
          700: "#8f6530",
          800: "#74512c",
          900: "#604227",
        },
        forest: {
          950: "#060d09",
          900: "#0b1510",
          850: "#101d16",
          800: "#16271e",
          700: "#1f372a",
          600: "#2d4e3c",
        },
        sand: {
          50: "#faf8f4",
          100: "#f4f1ea",
          200: "#ebe5d8",
          300: "#ddd4c0",
          400: "#c7baa1",
        },
        brand: {
          50: "#fef2f2",
          100: "#ffe1e1",
          200: "#ffc9c9",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        heading: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "gold-shimmer": "linear-gradient(135deg, #dfc285 0%, #c79e4d 50%, #b3853b 100%)",
      },
    },
  },
  plugins: [],
};
