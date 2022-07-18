<template>
  <div class="card">
    <h2 class="title">{{ title }}</h2>
    <p class="description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<style scoped lang="scss">
.title {
  color: hsl(234, 12%, 34%);
  font-weight: 600;
  font-size: 1.2rem;
}

.description {
  color: hsl(229, 6%, 66%);
}

.card {
  width: 100%;
  height: 180px;
  border-radius: 5px;
  border-top: 3px solid black;
  padding: 20px;
  box-shadow: 0px 30px 40px -20px hsl(229, 6%, 66%);
  box-sizing: border-box;
}
</style>
