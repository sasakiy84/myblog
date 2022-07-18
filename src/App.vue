<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { RouterView } from "vue-router"
import Header from "./components/Header/index.vue"

useHead({
  title: "sasakiy84.net",
  meta: [
    {
      name: "description",
      content: "sasakiy84のブログ"
    }
  ]
})
</script>

<template>
  <Header></Header>
  <main class="main">
    <RouterView></RouterView>
  </main>
</template>

<style scoped lang="scss">
.main {
  padding: 2rem;
  max-width: 720px;
  margin: 3.6rem auto 0;
}
</style>
