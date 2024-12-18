<script setup>
import GenericMessage from '@/components/GenericMessage.vue'
import axios from 'axios'
import { ref } from 'vue'
let errorMessage = ref('')

let successMessage = ref('')

let formData = {
  title: '',
  description: '',
  initialBid: 0.0,
  dueDate: '',
}

let timeoutID

const showMsg = (options) => {
  successMessage.value = ''
  errorMessage.value = ''
  clearTimeout(timeoutID)
  if (options?.type === 'success') {
    successMessage.value = options?.msg
    timeoutID = setTimeout(() => (successMessage.value = ''), 3500)
  }
  if (options?.type === 'error') {
    errorMessage.value = options?.msg
    timeoutID = setTimeout(() => (errorMessage.value = ''), 3500)
  }
}

const checkFields = () => {
  let message = ''
  if (!formData.title) message += 'Title '
  if (!formData.description) message += ' Description '
  if (!formData.dueDate) message += ' End Date'
  if (message) {
    showMsg({ type: 'error', msg: `The following fields are required: \n${message}` })
    return false
  }
  return true
}

const submit = async () => {
  if (checkFields()) {
    try {
      formData.dueDate = new Date(formData.dueDate).toISOString()
      await axios.post('/api/auctions', formData)
      showMsg({ type: 'success', msg: 'Success! Your auction is now active. Best of luck!' })
    } catch (error) {
      showMsg({ type: 'error', msg: error.response.data.error })
    }
  }
}
</script>

<template>
  <div class="flex h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-violet">
    <div
      class="flex h-3/4 w-2/3 flex-row items-center justify-center rounded-2xl bg-slate-800 shadow-xl shadow-slate-700"
    >
      <div class="h-full w-1/2 p-4">
        <img class="h-full rounded-2xl" src="@/assets/images/AuctionCreation.png" />
      </div>
      <div class="flex h-full w-1/2 flex-col items-center p-8">
        <h1 class="text-4xl">Create New Auction</h1>
        <div class="mt-8 w-2/3">
          <label class="text-lg" for="auctionTitle">Auction Title</label>
          <input
            id="auctionTitle"
            class="mb-4 h-12 w-full rounded-md bg-slate-700 p-4 outline-none"
            type="text"
            placeholder="Enter auction title"
            v-model="formData.title"
          />
          <label class="text-lg" for="auctionDesc">Description</label>
          <textarea
            id="auctionDesc"
            class="mb-4 h-36 w-full resize-none rounded-md bg-slate-700 p-4 outline-none"
            placeholder="Describe the item being auctioned"
            v-model="formData.description"
          ></textarea>
          <label class="text-lg" for="auctionPrice">Starting Price</label>
          <input
            id="auctionPrice"
            class="mb-4 h-12 w-full rounded-md bg-slate-700 p-4 outline-none"
            type="number"
            min="0"
            placeholder="0.00"
            v-model="formData.initialBid"
          />
          <label class="text-lg" for="auctionEnd">Auction End Date</label>
          <input
            id="auctionEnd"
            class="mb-8 h-12 w-full rounded-md bg-slate-700 p-4 outline-none"
            type="datetime-local"
            v-model="formData.dueDate"
          />
          <button class="w-full rounded-md bg-violet px-4 py-2" @click.prevent="submit">
            Create Auction
          </button>
        </div>
        <Transition name="msg">
          <GenericMessage type="success" class="mt-5 text-lg" v-if="successMessage"
            ><p class="whitespace-pre-wrap bg-green-600 text-lg">
              {{ successMessage }}
            </p></GenericMessage
          >
        </Transition>
        <Transition name="msg">
          <GenericMessage type="error" class="mt-5 text-lg" v-if="errorMessage"
            ><p class="whitespace-pre-wrap text-lg">{{ errorMessage }}</p></GenericMessage
          >
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg-enter-active {
  transition: opacity 0.5s ease;
}
.msg-leave-active {
  transition: opacity 0 ease;
}

.msg-enter-from {
  opacity: 0;
}
.msg-leave-to {
  opacity: 0;
}
</style>
