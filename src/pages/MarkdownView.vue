<template>
  <Suspense>
    <MarkdownRenderer />
    <template #fallback>loading</template>
  </Suspense>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
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
import { getAllMetaRowsResponse, isArticleFrontMatter } from "../type";

import jsHighlight from "highlight.js/lib/languages/javascript";
import tsHighlight from "highlight.js/lib/languages/typescript";
import bashHighlight from "highlight.js/lib/languages/bash";

import { useMarkdownParser } from "../composables/markdownParser";
import MarkdownRenderer from "../components/Markdown/Renderer.vue";

const markdown = ref("");
const headTitle = ref("");
const headDescription = ref("");
const tags = ref<string[]>([]);
const { title: baseFileName } = useRoute().params;

const { parseMdToMdast, toVnode, extractMetaData } = useMarkdownParser();

onBeforeMount(async () => {
  // TODO: error handling
  const { status, data } = await axios.get(`/articles/${baseFileName}.md`);

  const root = parseMdToMdast(data);
  // MarkdownRenderer = () => toVnode(root);
  const metaData = extractMetaData(root);

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
  if (!isArticleFrontMatter(frontMatter)) {
    // TODO show more info
    throw Error("title and description field required");
  }
  headTitle.value = metaData.title;
  headDescription.value = metaData.description;
  tags.value = metaData.tags;
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
