<script setup>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <NavBar v-if="!$route.meta.hideNavbar" />
  <RouterView />
</template>
