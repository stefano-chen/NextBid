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
    const response = await axios.get('/api/auctions/', { params: { limit: 8 } })
    auctions.value = await response.data
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
    :error="loadingError"
    :loading="isLoading"
    :data="auctions"
    title="Recently Added"
    viewmore="true"
    type="auction"
  />
</template>
