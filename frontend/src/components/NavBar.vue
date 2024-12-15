<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="sticky top-0 h-24 w-screen bg-slate-800 p-6">
    <div class="flex flex-row justify-between">
      <RouterLink to="/">
        <div class="flex w-fit flex-row items-center gap-4">
          <img class="w-10" src="@/assets/images/logo.png" />
          <h1>NextBid</h1>
        </div>
      </RouterLink>
      <div class="flex flex-row gap-4">
        <RouterLink to="/"><h1>Home</h1></RouterLink>
        <RouterLink to="/auctions"><h1>Auctions</h1></RouterLink>
        <RouterLink to="/about"><h1>About</h1></RouterLink>
        <RouterLink to="/login"><h1>Login</h1></RouterLink>
      </div>
    </div>
  </nav>
</template>
