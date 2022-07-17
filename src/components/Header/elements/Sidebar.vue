<template>
    <nav class="sidebar">
        <RouterLink to="/articles" class="sidebar-item">articles</RouterLink>
        <RouterLink to="/profile" class="sidebar-item">profile</RouterLink>
        <RouterLink to="/projects" class="sidebar-item">projects</RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<style scoped lang="scss">
.sidebar {
    position: absolute;
    top: 60px;
    width: 300px;
    max-width: 100%;
    height: calc(100% - 60px);
    background-color: white;
    border-right: 1px solid #eaecef;

    &-item {
        display: block;
        width: 100%;
        font-size: 1.5rem;
        padding: 1rem 0;
        text-align: center;
        text-decoration: none;
        color: #000000;
        border-bottom: 1px solid #eaecef;
    }
}
</style>