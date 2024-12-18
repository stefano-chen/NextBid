<script setup>
import AuctionCard from './AuctionCard.vue'
import { RouterLink } from 'vue-router'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './GenericMessage.vue'
import UserCard from './UserCard.vue'
import EditAuctionCard from './EditAuctionCard.vue'
import { inject } from 'vue'
import axios from 'axios'

const props = defineProps([
  'title',
  'viewmore',
  'loading',
  'error',
  'topbtn',
  'type',
  'showcommands',
])

const scrollToTop = () => {
  console.error(props.showcommands)
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

let data = inject('data')

const delAuction = async (id) => {
  try {
    await axios.delete(`/api/auctions/${id}`)
    data.value = data.value.filter(function (item) {
      return item._id !== id
    })
  } catch (error) {
    console.log(error.response.data.error)
  }
}
</script>

<template>
  <div class="relative top-24 flex flex-col items-center gap-y-10">
    <div v-if="!props.loading" class="flex w-full flex-row items-center justify-center">
      <h1 class="text-5xl">{{ props.title }}</h1>
      <slot></slot>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-center gap-10">
      <LoadingSpinner v-if="props.loading" />
      <ErrorMessage type="error" v-else-if="props.error">
        Server Error Cannot Fetch Data</ErrorMessage
      >
      <AuctionCard
        v-else-if="props.type === 'auction'"
        v-for="auction in data"
        :key="auction._id"
        :auction="auction"
      />
      <EditAuctionCard
        v-else-if="props.type === 'editAuction'"
        v-for="editAuction in data"
        :key="editAuction._id"
        :auction="editAuction"
        @delete="delAuction(editAuction._id)"
      />
      <UserCard
        v-else-if="props.type === 'user'"
        v-for="user in data"
        :key="user._id"
        :user="user"
      />
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
