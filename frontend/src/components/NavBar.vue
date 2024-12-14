<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <nav class="sticky top-0 h-24 w-screen bg-slate-800 p-6">
    <div class="flex flex-row justify-between">
      <div class="flex w-fit flex-row items-center gap-4 hover:cursor-pointer" @click="goHome">
        <img class="w-10" src="@/assets/images/logo.png" />
        <h1>NextBid</h1>
      </div>
      <div class="flex flex-row gap-4">
        <RouterLink :to="`/about`"><h1>About</h1></RouterLink>
        <RouterLink :to="`/about`"><h1>About</h1></RouterLink>
      </div>
    </div>
  </nav>
</template>
