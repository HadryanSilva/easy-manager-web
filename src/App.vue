<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <Toast :position="'top-right'" :style="'font-family: Montserrat'" />
  <RouterView />
</template>

<style scoped></style>
