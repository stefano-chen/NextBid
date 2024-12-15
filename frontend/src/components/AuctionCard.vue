<script setup>
import { RouterLink } from 'vue-router'
import { format } from 'date-fns'

const maxCharTitle = 21
const maxCharDescription = 180
const props = defineProps(['auction'])
let title = props.auction.title
if (title && title.length > maxCharTitle) title = title.slice(0, maxCharTitle - 1) + '...'
let description = props.auction.description
if (description && description.length > maxCharDescription)
  description = description.slice(0, maxCharDescription - 1) + '...'
const auctionId = props.auction._id
const initialBid = props.auction.initialBid?.toFixed(2)
const dueDate = format(props.auction.dueDate, 'dd-MM-yyyy HH:mm')
</script>

<template>
  <div class="bg-violet/50 w-96 rounded-xl p-10 shadow-2xl">
    <h1>{{ title }}</h1>
    <p class="mt-3 whitespace-pre-wrap text-wrap break-words">
      {{ description }}
    </p>
    <hr class="mt-5" />
    <div class="mt-2 flex flex-row items-center justify-between">
      <p class="text-sm">
        Initial Bid: {{ initialBid }}&#8364; <br />
        Ends: {{ dueDate }}
      </p>
      <RouterLink :to="`/auction/${auctionId}`" class="rounded-md bg-green-700 px-2 py-1"
        >More</RouterLink
      >
    </div>
  </div>
</template>
