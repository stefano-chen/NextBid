<script setup>
import CardGroup from '@/components/CardGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

let auctions = ref([])
let isLoarding = ref(true)
let loardingError = ref(false)

onMounted(async () => {
  try {
    const response = await axios.get('/api/auctions/')
    if (response.status === 200) auctions.value = await response.data
  } catch {
    loardingError.value = true
  } finally {
    isLoarding.value = false
  }
})
</script>

<template>
  <LoadingSpinner v-if="isLoarding" />
  <CardGroup v-else-if="!loardingError" class="mt-8" :auctions="auctions" title="All Auctions" />
  <ErrorMessage v-else> Server Error Cannot Fetch Data</ErrorMessage>
</template>
