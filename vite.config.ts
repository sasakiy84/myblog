import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { readFile } from "fs/promises";
import { join } from "path";
import { RouteRecordRaw } from "vue-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // @ts-ignore
  // https://github.com/antfu/vite-ssg/blob/main/src/types.ts
  ssgOptions: {
    dirStyle: "nested",
    includedRoutes: async (paths: string[], routes: RouteRecordRaw[]) => {
      const jsonData = await readFile(join("public", "contents.json"));
      const {
        articles,
      }: {
        articles: {
          baseFileName: string;
          title: string;
          description: string;
        }[];
      } = JSON.parse(jsonData.toString());

      const newRoutes = routes.flatMap((route) => {
        return route.name === "articles"
          ? articles.map((article) => `/articles/${article.baseFileName}`)
          : route.path;
      });
      return newRoutes;
    },
  },
});
