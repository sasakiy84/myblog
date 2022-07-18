<template>
  <div class="card">
    <div class="img-wrapper">
      <img class="img" :src="src" alt="project image" />
    </div>
    <div class="text">
      <p class="title">{{ title }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  src: string;
}>();
</script>

<style scoped lang="scss">
@import "../../util.scss";
.card {
  width: 100%;
  height: 160px;
  border-left: 5px solid black;
  padding: 10px 0 10px 10px;
  display: flex;
  flex-direction: row-reverse;
  box-sizing: border-box;
  margin-bottom: 30px;
  @include sp {
    display: block;
    border-left: none;
    padding: 10px;
    height: max-content;
  }
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &-wrapper {
      width: 250px;
      height: 90%;
      margin-top: auto;
      margin-bottom: -10px;
      @include sp {
        width: 100%;
        height: auto;
        margin-bottom: 10px;
      }
    }
  }
  .text {
    width: calc(100% - 250px);
    padding-right: 30px;
    @include sp {
      width: 100%;
    }
    .title {
      font-size: 24px;
      font-weight: 400;
      margin: 0 0 20px 0;
      @include sp {
        margin-bottom: 5px;
      }
    }
    .description {
      font-size: 13px;
      line-height: 1.8;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      @include sp {
        margin: 5px;
      }
    }
  }
}
</style>
