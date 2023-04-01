import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), solid(), vue(), tailwind()],
});
