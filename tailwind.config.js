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
        ink: "#070b11",
        "brand-red": "#970707",
        "brand-red-strong": "#b30c0c",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
