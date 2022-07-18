<template>
    <h1>Profile</h1>
</template>
<script setup lang="ts">import { useHead } from '@vueuse/head';
import { blogName } from '../utils/constant';

useHead({
    title: `Profile | ${blogName}`
})


</script>