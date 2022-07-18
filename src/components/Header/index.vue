<template>
  <header class="header">
    <div class="header-content is-hidden-on-sp is-hidden-on-tab">
      <RouterLink to="/">
        <img src="/src/assets/logo.png" class="logo" alt="blog logo" />
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/articles" class="nav-item">articles</RouterLink>
        <RouterLink to="/profile" class="nav-item">profile</RouterLink>
        <RouterLink to="/projects" class="nav-item">projects</RouterLink>
      </nav>
    </div>
    <div class="header-content is-hidden-on-pc">
      <Hamburger v-model:isOpen="isOpen"></Hamburger>

      <RouterLink to="/">
        <img src="/src/assets/logo.png" class="logo" alt="blog logo" />
      </RouterLink>
    </div>
  </header>
  <Sidebar
    class="is-hidden-on-pc sidebar"
    :class="{ open: isOpen, close: !isOpen }"
  ></Sidebar>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import Hamburger from "./elements/Hamburger.vue";
import Sidebar from "./elements/Sidebar.vue";

const route = useRoute();
const isOpen = ref(false);

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false;
  }
);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  padding: 0.7rem 1.5rem;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #eaecef;
  background-color: white;

  &-content {
    height: 100%;
    max-width: 780px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}

.sidebar {
  width: 0;
  animation-fill-mode: backwards;

  &.open {
    transition-duration: 0.3s;
    animation-name: sidebar-fade-in;
    width: 300px;
  }

  &.close {
    transition-duration: 0.3s;
    width: 0;
    opacity: 0;
    animation-name: sidebar-fade-out;
    pointer-events: none;
  }
}

@keyframes sidebar-fade-in {
  0% {
    opacity: 0;
    width: 0;
  }

  1% {
    opacity: 1;
  }

  100% {
    width: 300px;
    max-width: 100%;
  }
}

@keyframes sidebar-fade-out {
  0% {
    opacity: 1;
    width: 300px;
  }

  99% {
    opacity: 1;
  }

  100% {
    width: 0;
    opacity: 0;
  }
}

.logo {
  height: 100%;
  padding: 0.1rem;
  box-sizing: border-box;
}

.nav {
  margin-left: auto;
  display: flex;
  align-items: center;

  &-item {
    font-size: 1.3rem;
    margin-left: 2rem;
    text-decoration: none;
    color: #000000;
  }
}
</style>
