<template>
  <Suspense>
    <MarkdownRenderer />
    <template #fallback>loading</template>
  </Suspense>
</template>
<script setup lang="ts">
import MarkdownRenderer from "../components/Markdown/Renderer.vue";
</script>
