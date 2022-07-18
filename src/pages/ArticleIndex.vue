<template>
    <h1 class="heading1">Articles</h1>

    <RouterLink class="card-wrapper" v-for="article in articles" :key="article.baseFileName"
        :to="`/articles/${article.baseFileName}`">
        <ArticleCard :title="article.title" :description="article.description"></ArticleCard>
    </RouterLink>
</template>
<script setup lang="ts">
import { useHead } from '@vueuse/head';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { RouterLink } from "vue-router"
import ArticleCard from '../components/ArticleCard/index.vue';
import { articlesMetaRows, getAllMetaRowsResponse } from '../type';
import { blogName } from '../utils/constant';

const articles = ref<articlesMetaRows>([])

onBeforeMount(
    async () => {
        const { data: { articles: _articles } } = await axios.get<getAllMetaRowsResponse>("/contents.json")
        articles.value = _articles
    }
)

useHead({
    title: `Articles | ${blogName}`
})
</script>
<style lang="scss">
.heading1 {
    margin-bottom: 40px;
}

.card-wrapper {
    display: block;
    margin-bottom: 20px;
    margin: 0 auto 20px;
    text-decoration: none;
    color: black;
}
</style>