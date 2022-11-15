<template>
  <a class="link-card" :href="url">
    <div v-if="ogpURL !== ''" class="ogp-container">
      <img class="ogp-img" :src="ogpURL" alt="" />
    </div>
    <div class="meta-info">
      <p class="title">{{ title || url }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  url: string;
  ogpURL: string;
  title: string;
  description: string;
}>();
</script>

<style scoped lang="scss">
.link-card {
  display: flex;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
  margin: 10px 7px;
}

.ogp-container {
  width: 30%;
  max-height: 120px;
}

.ogp-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.meta-info {
  width: 70%;
  margin: auto 0;
}

.title {
  font-size: 13px;
  line-height: 1.1;
  margin-bottom: 4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.description {
  margin-top: 0;
  font-size: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
