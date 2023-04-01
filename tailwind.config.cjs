/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        fun: ["ruddy", "sans-serif"],
        quicksand: ["quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};