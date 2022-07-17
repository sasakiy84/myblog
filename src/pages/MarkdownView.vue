<template>
    <div v-html="markdown"></div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import axios from "axios"
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { useRoute } from 'vue-router';

const markdown = ref("qqqqqq")

onBeforeMount(async () => {
    const { title } = useRoute().params
    // TODO: error handling
    const { status, data } = await axios.get(`/articles/${title}.md`)
    console.log({ data })
    const processor = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify)
    const vhtml = await processor.process(data)
    markdown.value = vhtml.toString()
})

</script>