<template>
  <h1>Works</h1>
  <article v-for="work in works" :key="work.title">
    <WorkCard
      :title="work.title"
      :description="work.description"
      :src="work.src"
    ></WorkCard>
  </article>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { blogName } from "../utils/constant";
import WorkCard from "../components/WorkCard/index.vue";

const works = [
  {
    title: "個人ブログ",
    description:
      "ポートフォリオ&技術ブログ。UIライブラリとして Vue3 + vite 、を使用。 SSG したファイルを GitHub Actions を使用して AWS S3 にホスティングする構成。",
    src: "https://i.ytimg.com/vi/o_RG03t7cVE/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBO_2ck7QU2z7S9CgE4gLbTm8vLEg",
  },
];

useHead({
  title: `Works | ${blogName}`,
});
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
}
</style>
