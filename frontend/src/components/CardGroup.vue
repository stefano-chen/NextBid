<script setup>
import AuctionCard from './AuctionCard.vue'
import { RouterLink } from 'vue-router'

const props = defineProps(['title', 'auctions', 'viewMore'])
</script>

<template>
  <div class="flex flex-col items-center gap-y-10">
    <h1 class="text-5xl">{{ props.title }}</h1>
    <div class="items- flex flex-row flex-wrap items-center justify-center gap-10">
      <AuctionCard v-for="auction in props.auctions" :key="auction._id" :auction="auction" />
    </div>
    <RouterLink
      v-if="props.viewMore === 'true'"
      to="/auctions"
      class="transition hover:-translate-y-2"
      ><h1>View More</h1></RouterLink
    >
    <br />
  </div>
</template>
