<template>
  <div v-html="markdown"></div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import axios from "axios"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { parse } from "yaml";
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";

import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { blogName } from '../utils/constant';
import { getAllMetaRowsResponse, isArticleFroontMatter } from '../type';

const markdown = ref("qqqqqq")
const headTitle = ref("")
const headDescription = ref("")
const { title: baseFileName } = useRoute().params

console.log(import.meta)

if (import.meta.env.SSR) {
  console.log("start in SSR")
  const { data: { articles } } = await axios.get<getAllMetaRowsResponse>("http://blog.sasakiy84.net/contents.json")
  const { title, description } = articles.find(({ baseFileName: _baseFileName }) => baseFileName === _baseFileName)!
  headTitle.value = title
  headDescription.value = description
}

onBeforeMount(async () => {
  const { baseFileName } = useRoute().params
  // TODO: error handling
  const { status, data } = await axios.get(`/articles/${baseFileName}.md`)
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, [{
      type: 'yaml',
      marker: '-',
      anywhere: false
    }])
    .use(remarkExtractFrontmatter, {
      yaml: parse,
      name: 'frontMatter'
    })
    .use(remarkRehype).use(rehypeStringify)
  const result = await processor.process(data)
  const {
    data: { frontMatter },
  } = result
  if (!isArticleFroontMatter(frontMatter)) {
    // TODO show more info
    throw Error("title and description field required");
  }
  headTitle.value = frontMatter.title
  headDescription.value = frontMatter.description
  markdown.value = result.toString()
})
useHead({
  title: computed(() => `${headTitle.value} | ${blogName}`),
  meta: [
    {
      name: "description",
      content: computed(() => headDescription.value)
    }
  ]

})


</script>