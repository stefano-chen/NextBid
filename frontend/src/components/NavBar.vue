<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import UserDropdown from './UserDropdown.vue'

const { user } = inject('user')

const isAuth = computed(() => (user.value ? true : false))
</script>

<template>
  <nav class="fixed top-0 z-10 h-24 w-screen bg-slate-800 p-6">
    <div class="flex flex-row items-center justify-between">
      <RouterLink to="/">
        <div class="flex w-fit flex-row items-center gap-4">
          <img class="w-10" src="@/assets/images/logo.png" />
          <h1>NextBid</h1>
        </div>
      </RouterLink>
      <div class="flex flex-row items-center gap-5">
        <RouterLink to="/"><h1>Home</h1></RouterLink>
        <RouterLink to="/auctions"><h1>Auctions</h1></RouterLink>
        <RouterLink to="/users"><h1>Users</h1></RouterLink>
        <RouterLink to="/about"><h1>About</h1></RouterLink>
        <RouterLink v-if="!isAuth" to="/signin"><h1>Sign in</h1></RouterLink>
        <UserDropdown v-else />
      </div>
    </div>
  </nav>
</template>
