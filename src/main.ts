import { createApp } from "vue";
import "./normalize.css";
import "./util.scss";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";
import MarkdownViewVue from "./pages/MarkdownView.vue";
import ArticleIndex from "./pages/ArticleIndex.vue";
import Profile from "./pages/Profile.vue";
import Top from "./pages/Top.vue";
import Project from "./pages/ProjectIndex.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/articles",
      component: ArticleIndex,
    },
    {
      path: "/articles/:title",
      component: MarkdownViewVue,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/projects",
      component: Project,
    },
    {
      path: "/",
      component: Top,
    },
  ],
});
createApp(App).use(router).mount("#app");
