import "./normalize.css";
import "./util.scss";
import App from "./App.vue";
import { ViteSSG } from "vite-ssg";

import MarkdownViewVue from "./pages/MarkdownView.vue";
import ArticleIndex from "./pages/ArticleIndex.vue";
import Profile from "./pages/Profile.vue";
import Top from "./pages/Top.vue";
import Project from "./pages/ProjectIndex.vue";
import { RouteRecordRaw } from "vue-router";

// const jsonData = await readFile(join("public", "contents.json"));
// const {
//   articles,
// }: {
//   articles: { baseFileName: string; title: string; description: string }[];
// } = JSON.parse(jsonData.toString());
const routes: RouteRecordRaw[] = [
  {
    name: "articleIndex",
    path: "/articles",
    component: ArticleIndex,
  },
  {
    name: "articles",
    path: "/articles/:title",
    component: MarkdownViewVue,
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
  },
  {
    name: "projects",
    path: "/projects",
    component: Project,
  },
  {
    name: "top",
    path: "/",
    component: Top,
  },
];

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }
);

// export async function includedRoutes(
//   paths: string[],
//   routes: RouteRecordRaw[]
// ): Promise<string[]> {
//   // Sensitive key is managed by Vite - this would not be available inside
//   // vite.config.js as it runs before the environment has been populated.

//   console.log({ articles });

//   const newRoutes = routes.flatMap((route) => {
//     return route.name === "articles"
//       ? articles.map((article) => `/articles/${article.baseFileName}`)
//       : route.path;
//   });
//   return newRoutes;
// }
