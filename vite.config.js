import { defineConfig } from "vite"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vue from "@vitejs/plugin-vue"
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    open: "/index.html",
  },
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
})
