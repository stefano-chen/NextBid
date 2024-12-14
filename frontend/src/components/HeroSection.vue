<script setup>
import PrimaryButton from './PrimaryButton.vue'
</script>

<template>
  <div class="flex flex-row items-center justify-evenly bg-glaucous py-32 pl-24 pr-32">
    <div class="flex flex-col gap-10">
      <h1 class="md:text-3xl xl:text-9xl">Your Next Great Deal Starts Here!</h1>
      <PrimaryButton> Click Here </PrimaryButton>
    </div>
    <img
      class="rounded-3xl bg-transparent md:size-64 xl:size-96"
      src="@/assets/images/auction.jpg"
      alt="Auction Rating"
    />
  </div>
</template>
