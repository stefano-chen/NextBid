<script setup>
import CardGroup from '@/components/CardGroup.vue'
import SearchIcon from '@/assets/icons/SearchIcon.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

let auctions = ref([])
let isLoading = ref(true)
let loadingError = ref(false)
let searchQuery = ''

const load = async (query) => {
  try {
    const response = await axios.get(`/api/users/`, { params: { q: query } })
    auctions.value = await response.data
  } catch {
    loadingError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(load)

const submitOnEnter = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    load(searchQuery)
  }
}
</script>

<template>
  <CardGroup
    :error="loadingError"
    :loading="isLoading"
    class="mt-8"
    :data="auctions"
    title="Auctions Listing"
    topbtn="true"
    type="user"
  >
    <div class="absolute right-0">
      <div class="flex h-full w-80 items-center gap-4">
        <input
          type="text"
          class="W-1/2 border-b-2 border-b-gray-200 bg-transparent px-1 outline-none"
          v-model="searchQuery"
          @keypress="submitOnEnter"
        />
        <button @click="load(searchQuery)">
          <SearchIcon class="size-8 fill-gray-200 stroke-gray-200" />
        </button>
      </div>
    </div>
  </CardGroup>
</template>
