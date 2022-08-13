<template>
  <header class="page-header">
    <h1 class="page-title">{{ headTitle }}</h1>
    <div class="tags">
      <div v-for="tag in tags" class="tag">{{ tag }}</div>
    </div>
    <p class="page-description">{{ headDescription }}</p>
  </header>
  <article class="markdown-article">
    <div v-html="markdown"></div>
  </article>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import axios from "axios";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { parse } from "yaml";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";

import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { blogName } from "../utils/constant";
import { getAllMetaRowsResponse, isArticleFroontMatter } from "../type";

import jsHighlight from "highlight.js/lib/languages/javascript";
import tsHighlight from "highlight.js/lib/languages/typescript";
import bashHighlight from "highlight.js/lib/languages/bash";

const markdown = ref("");
const headTitle = ref("");
const headDescription = ref("");
const tags = ref<string[]>([]);
const { title: baseFileName } = useRoute().params;

if (import.meta.env.SSR) {
  const { data } = await axios.get<getAllMetaRowsResponse>(
    `http://blog.sasakiy84.net/articles/${baseFileName}.md`
  );
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, [
      {
        type: "yaml",
        marker: "-",
        anywhere: false,
      },
    ])
    .use(remarkExtractFrontmatter, {
      yaml: parse,
      name: "frontMatter",
    })
    .use(remarkRehype)
    .use(rehypeHighlight, {
      languages: {
        jsHighlight,
        tsHighlight,
        bashHighlight,
      },
    })
    .use(rehypeStringify);
  const result = await processor.process(data);
  const {
    data: { frontMatter },
  } = result;
  if (!isArticleFroontMatter(frontMatter)) {
    // TODO show more info
    throw Error("title and description field required");
  }
  headTitle.value = frontMatter.title;
  headDescription.value = frontMatter.description;
  tags.value = frontMatter.tags;
  markdown.value = result.toString();
}

onBeforeMount(async () => {
  // TODO: error handling
  const { status, data } = await axios.get(`/articles/${baseFileName}.md`);
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, [
      {
        type: "yaml",
        marker: "-",
        anywhere: false,
      },
    ])
    .use(remarkExtractFrontmatter, {
      yaml: parse,
      name: "frontMatter",
    })
    .use(remarkRehype)
    .use(rehypeHighlight, {
      languages: {
        javascript: jsHighlight,
        typescript: tsHighlight,
        bash: bashHighlight,
      },
    })
    .use(rehypeStringify);
  const result = await processor.process(data);
  const {
    data: { frontMatter },
  } = result;
  if (!isArticleFroontMatter(frontMatter)) {
    // TODO show more info
    throw Error("title and description field required");
  }
  headTitle.value = frontMatter.title;
  headDescription.value = frontMatter.description;
  tags.value = frontMatter.tags;
  markdown.value = result.toString();
});
useHead({
  title: computed(() => `${headTitle.value} | ${blogName}`),
  meta: [
    {
      name: "description",
      content: computed(() => headDescription.value),
    },
  ],
});
</script>
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
  code {
    padding: 3px 5px;
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
