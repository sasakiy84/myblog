import "./normalize.css";
import "./highlights.css";
import "./util.scss";
import App from "./App.vue";
import { ViteSSG } from "vite-ssg";

import MarkdownViewVue from "./pages/MarkdownView.vue";
import ArticleIndex from "./pages/ArticleIndex.vue";
import Profile from "./pages/Profile.vue";
import Top from "./pages/Top.vue";
import Project from "./pages/WorkIndex.vue";
import { RouteRecordRaw } from "vue-router";

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
    name: "works",
    path: "/works",
    component: Project,
  },
  {
    name: "top",
    path: "/",
    component: Top,
  },
];

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {}
);
