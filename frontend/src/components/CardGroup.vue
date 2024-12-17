<script setup>
import AuctionCard from './AuctionCard.vue'
import { RouterLink } from 'vue-router'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './ErrorMessage.vue'

const props = defineProps(['title', 'data', 'viewmore', 'loading', 'error', 'topbtn'])

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div class="flex flex-col items-center gap-y-10">
    <div class="flex w-full flex-row items-center justify-center">
      <h1 class="text-5xl">{{ props.title }}</h1>
      <slot></slot>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-center gap-10">
      <LoadingSpinner v-if="props.loading" />
      <ErrorMessage v-else-if="props.error"> Server Error Cannot Fetch Data</ErrorMessage>
      <AuctionCard v-else v-for="data in props.data" :key="data._id" :auction="data" />
    </div>
    <RouterLink
      v-if="props.viewmore === 'true'"
      to="/auctions"
      class="transition hover:-translate-y-2"
      ><h1>View More</h1></RouterLink
    >
    <br />
    <img
      v-if="props.topbtn"
      class="fixed bottom-10 right-10 -rotate-90 transition hover:rotate-90 hover:cursor-pointer"
      src="@/assets/images/back-arrow.png"
      @click="scrollToTop"
    />
  </div>
</template>
