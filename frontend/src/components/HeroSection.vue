<script setup>
import PrimaryButton from "./PrimaryButton.vue";
</script>

<template>
  <div class="bg-glaucous pl-24 pr-32 py-32 flex flex-row justify-evenly items-center">
    <div class="flex flex-col gap-10">
      <h1 class="xl:text-9xl md:text-3xl">Your Next Great Deal Starts Here!</h1>
      <PrimaryButton> Click Here </PrimaryButton>
    </div>
    <img
      class="rounded-3xl bg-transparent xl:size-96 md:size-64"
      src="@/assets/images/auction.jpg"
      alt="Auction Rating"
    />
  </div>
</template>
