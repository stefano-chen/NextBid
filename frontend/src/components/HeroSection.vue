<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-row items-center justify-evenly bg-glaucous py-32 pl-24 pr-32">
    <div class="flex flex-col gap-10">
      <h1 class="text-9xl">Your Next Great Deal Starts Here!</h1>
      <RouterLink class="w-32" to="/auctions">
        <div class="flex items-center justify-center rounded-xl bg-green-800 p-4">
          Click Here
        </div></RouterLink
      >
    </div>
    <img class="size-96 rounded-3xl bg-transparent" src="@/assets/images/auction.jpg" />
  </div>
</template>
