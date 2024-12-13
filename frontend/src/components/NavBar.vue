<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
}
</script>

<template>
  <nav class="sticky top-0 w-screen p-6 bg-slate-800 h-24">
    <div class="flex flex-row justify-between">
      <div class="w-fit flex flex-row gap-4 hover:cursor-pointer items-center" @click="goHome">
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
