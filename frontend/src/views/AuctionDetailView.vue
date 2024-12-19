<script setup>
import BidHistory from '@/components/BidHistory.vue'
import GenericMessage from '@/components/GenericMessage.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref, onMounted, computed, onUnmounted, inject } from 'vue'
import { format, isPast } from 'date-fns'

const route = useRoute()
let auction = ref({})
let errorMessage = ref('')

let timeoutID
const MSG_DURATION = 3500

const auctionId = route.params.id

const { user } = inject('user')

const userId = user.value?._id

let amount = 0

let isExpired = computed(() => {
  if (auction.value.dueDate) {
    return isPast(auction.value.dueDate)
  }
  return true
})

let dueDate = computed(() => {
  if (auction.value.dueDate) return format(auction.value.dueDate, 'dd-MM-yyyy HH:mm')
  return null
})

let owner = computed(() => {
  if (auction.value.owner) return auction.value.owner.username
  return null
})

let ownerId = computed(() => {
  if (auction.value.owner) return auction.value.owner._id
  return null
})

let startingBid = computed(() => {
  if (auction.value.initialBid >= 0) {
    return `${auction.value.initialBid.toFixed(2)}€`
  }
  return null
})

const showMsg = (msg) => {
  clearTimeout(timeoutID)
  errorMessage.value = msg
  timeoutID = setTimeout(() => (errorMessage.value = ''), MSG_DURATION)
}

const loadAuction = async () => {
  try {
    const response = await axios.get(`/api/auctions/${auctionId}`)
    auction.value = response.data
  } catch {
    errorMessage.value = 'Cannot Fetch Data'
  }
}

const sendBid = async () => {
  try {
    errorMessage.value = ''
    await axios.post(`/api/auctions/${auctionId}/bids`, { amount })
  } catch (error) {
    showMsg(error.response.data.error)
  }
}

onMounted(loadAuction)
onUnmounted(() => clearTimeout(timeoutID))
</script>

<template>
  <div class="relative top-[6rem] grid h-[calc(100vh-6rem)] w-screen grid-cols-3 grid-rows-1">
    <div class="mt-14 flex w-full flex-col items-center justify-start gap-10">
      <h1 class="text-5xl">{{ auction?.title || ' ' }}</h1>
      <img class="size-96 rounded-2xl" src="@/assets/images/AuctionItem.jpeg" />
    </div>
    <div class="mt-14 flex w-full flex-col gap-4">
      <h1 class="self-start text-5xl">Description</h1>
      <div
        class="h-1/5 w-5/6 overflow-scroll whitespace-pre-wrap break-words rounded-lg bg-slate-700/30 p-2 text-xl"
      >
        {{ auction?.description }}
      </div>
      <label class="self-start opacity-80"
        >Status:
        <span :class="isExpired ? 'text-red-500' : 'text-green-500'"
          >{{ isExpired ? 'Ended' : 'In Progress' }}
        </span></label
      >
      <label class="self-start opacity-80"
        >Created by:
        <RouterLink class="underline underline-offset-4" :to="`/user/${ownerId}`">
          {{ owner }}
        </RouterLink></label
      >
      <label class="self-start opacity-80">Ends on: {{ dueDate }}</label>
      <label class="self-start opacity-80">Starting Bid: {{ startingBid }}</label>
      <div v-if="!isExpired && userId !== ownerId" class="flex w-full items-center gap-6">
        <label>Place your bid:</label>
        <input
          id="amount"
          class="px-2 py-1 text-black outline-none"
          type="number"
          min="0"
          v-model="amount"
        />
        <button @click.prevent="sendBid" class="rounded-md bg-green-700 px-3 py-1">Send</button>
      </div>
      <Transition>
        <GenericMessage v-if="errorMessage" type="error" class="-ml-12">{{
          errorMessage
        }}</GenericMessage>
      </Transition>
    </div>
    <BidHistory />
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
