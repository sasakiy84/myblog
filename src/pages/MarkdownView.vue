<template>
    <div v-html="markdown"></div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import axios from "axios"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { parse } from "yaml";
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkFrontmatter from "remark-frontmatter";

import { useRoute } from 'vue-router';

const markdown = ref("qqqqqq")

onBeforeMount(async () => {
    const { title } = useRoute().params
    // TODO: error handling
    const { status, data } = await axios.get(`/articles/${title}.md`)
    const processor = unified().use(remarkParse).use(remarkFrontmatter, [{
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
    markdown.value = result.toString()
})

</script>