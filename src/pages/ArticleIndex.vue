<template>
    <h1>Articles</h1>
    <p>
    <ul>
        <li v-for="article in articles" :key="article">
            <RouterLink :to="`/articles/${article}`">{{ article }}</RouterLink>
        </li>
    </ul>
    </p>
</template>
<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { RouterLink } from "vue-router"

const articles = ref<string[]>([])

onBeforeMount(
    async () => {
        const { data: { articles: _articles } } = await axios.get("/contents.json")
        articles.value = _articles
        console.log(articles.value)
    }
)
</script>