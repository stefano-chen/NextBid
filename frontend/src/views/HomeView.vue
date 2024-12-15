<script setup>
import CardGroup from '@/components/CardGroup.vue'
import HeroSection from '@/components/HeroSection.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

let auctions = ref([])
let isLoading = ref(true)
let loadingError = ref(false)

onMounted(async () => {
  try {
    // await new Promise((r) => setTimeout(r, 2000)) // Delete for production
    const response = await axios.get('/api/auctions/?limit=8')
    if (response.status === 200) auctions.value = await response.data
  } catch {
    loadingError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <HeroSection />

  <CardGroup
    :loading-error="loadingError"
    :loading="isLoading"
    :auctions="auctions"
    title="Recently Added"
    view-more="true"
  />
</template>
