<script setup lang="ts">
import { useMarkdownParser } from "../../composables/markdownParser";
import axios from "axios";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useHead } from "@vueuse/head";
import { blogName } from "../../utils/constant";

const { parseMdToMdast, toVnode, extractMetaData } = useMarkdownParser();
const { title: baseFileName } = useRoute().params;
const mdPathURL = import.meta.env.SSR
  ? `http://blog.sasakiy84.net/articles/${baseFileName}.md`
  : `/articles/${baseFileName}.md`;

const { status, data } = await axios.get(mdPathURL);

const root = parseMdToMdast(data);
const metaData = extractMetaData(root);
const renderFunction = await toVnode(root);
const MarkdownRenderer = () => renderFunction;

useHead({
  title: computed(() => `${metaData.title} | ${blogName}`),
  meta: [
    {
      name: "description",
      content: computed(() => metaData.description),
    },
  ],
});
</script>
<template>
  <header class="page-header">
    <h1 class="page-title">{{ metaData.title }}</h1>
    <div class="tags">
      <div v-for="tag in metaData.tags" class="tag">{{ tag }}</div>
    </div>
    <p class="page-description">{{ metaData.description }}</p>
  </header>
  <article class="markdown-article">
    <MarkdownRenderer />
  </article>
</template>
<style lang="scss" scoped>
.page {
  &-header {
    border-bottom: 1px black dashed;
    padding-bottom: 6px;
    margin-bottom: 30px;
  }

  &-title {
    padding: 10px 0 10px 10px;
    border-left: 4px solid #000;
  }

  &-description {
    line-height: 1.6;
  }
}

.tags {
  .tag {
    display: inline-flex;
    margin-right: 1rem;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: 26px;
    min-width: 12px;
    box-sizing: border-box;
    align-items: center;
    padding: 0 12px;
    font-size: 10.5px;
  }
}
</style>
<style lang="scss">
.markdown-article {
  pre {
    padding: 10px 10px;
    margin: 0 5px;
    background: #f3f3f3;
    color: #444;
    overflow-x: auto;
  }

  code {
    padding: 5px 5px;
    background: #f3f3f3;
    color: #444;
  }

  p {
    line-height: 1.8;
    white-space: pre-line;
    word-wrap: break-word;
  }

  ul {
    li {
      line-height: 1.8;
    }
  }

  img {
    max-width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
