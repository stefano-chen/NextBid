<script setup>
import AuctionCard from './AuctionCard.vue'
import { RouterLink } from 'vue-router'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './ErrorMessage.vue'

const props = defineProps(['title', 'auctions', 'viewmore', 'loading', 'error'])
</script>

<template>
  <div class="flex flex-col items-center gap-y-10">
    <div class="grid w-full grid-cols-7">
      <h1 class="col-start-4 col-end-6 text-5xl">{{ props.title }}</h1>
      <div class="col-start-6 col-end-7">
        <slot></slot>
      </div>
    </div>
    <div class="items- flex flex-row flex-wrap items-center justify-center gap-10">
      <LoadingSpinner v-if="props.loading" />
      <ErrorMessage v-else-if="props.error"> Server Error Cannot Fetch Data</ErrorMessage>
      <AuctionCard v-else v-for="auction in props.auctions" :key="auction._id" :auction="auction" />
    </div>
    <RouterLink
      v-if="props.viewmore === 'true'"
      to="/auctions"
      class="transition hover:-translate-y-2"
      ><h1>View More</h1></RouterLink
    >
    <br />
  </div>
</template>
