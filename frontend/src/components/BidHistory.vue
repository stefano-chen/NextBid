<script setup>
import BidRecord from './BidRecord.vue'
import GenericMessage from './GenericMessage.vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, onMounted, onUnmounted } from 'vue'

const route = useRoute()

const auctionID = route.params.id

let intervalID
const fetchInterval = 1000

let errorMessage = ref('')
let bids = ref([])

const fetchBids = async () => {
  try {
    const response = await axios.get(`/api/auctions/${auctionID}/bids`)
    bids.value = await response.data
    return response.status
  } catch (error) {
    clearInterval(intervalID)
    const status = error.response.status
    errorMessage.value =
      status >= 500 ? 'Server Error Cannot Fetch Data' : error.response.data.error
    return status
  }
}

onMounted(() => {
  fetchBids()
    .then((status) => {
      if (status === 200) {
        intervalID = setInterval(fetchBids, fetchInterval)
      }
    })
    .catch((error) => {
      console.error(error)
    })
})

onUnmounted(() => {
  clearInterval(intervalID)
})
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-start p-4">
    <h1>Bid History</h1>
    <div
      v-if="!errorMessage"
      class="mt-2 grid max-h-full w-full grid-flow-row overflow-scroll rounded-lg bg-slate-800/50"
    >
      <div class="grid grid-cols-4 grid-rows-1 border-b-2 px-2 py-1 text-xl">
        <label class="col-span-3 border-r-2">Username</label>
        <label class="text-center">Bid</label>
      </div>
      <TransitionGroup>
        <BidRecord v-for="bid in bids" :key="bid._id" :bid="bid" />
      </TransitionGroup>
    </div>
    <GenericMessage v-else type="error">{{ errorMessage }}</GenericMessage>
  </div>
</template>

<style scoped>
.v-enter-active {
  transition: opacity 1s ease-in;
}
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from {
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}
</style>
