/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        gold: "#C89B3C",
        darkgold: "#785A28"
      },
    },
  },
  plugins: [],
};
