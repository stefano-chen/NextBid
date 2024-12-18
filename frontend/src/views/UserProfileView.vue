<script setup>
import GeneralUserIcon from '@/assets/icons/GeneralUserIcon.vue'
import CardGroup from '@/components/CardGroup.vue'
import TrophyIcon from '@/assets/icons/TrophyIcon.vue'
import HammerIcon from '@/assets/icons/HammerIcon.vue'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// const showAuctions = ref(route.query.show)
// console.log(showAuctions)
let userData = ref({})
let isLoading = ref(true)
let loadingError = ref(false)
let showMyAuctions = ref(true)

const toggleMyAuctions = () => {
  showMyAuctions.value = !showMyAuctions.value
}

const renderData = () => {
  if (userData.value && !showMyAuctions.value) {
    return userData.value.wonAuctions
  }
  return userData.value.myAuctions
}

const loadUserData = async () => {
  try {
    const userId = route.params.id
    const response = await axios.get(`/api/users/${userId}`)
    userData.value = await response.data
  } catch {
    loadingError.value = true
  } finally {
    isLoading.value = false
  }
}

const bio = computed(
  () => userData.value.bio || "This user hasn't added a profile description yet.",
)
const username = computed(() => userData.value.username)

const fullname = computed(() => userData.value.name + ' ' + userData.value.surname)

const title = computed(() =>
  showMyAuctions.value ? `${userData.value.username}'s Auctions` : 'Won Auctions',
)

const btnText = computed(() => (showMyAuctions.value ? 'Show Wins' : 'Show Auctions'))

onMounted(loadUserData)
</script>

<template>
  <div class="fixed top-24 h-full w-2/5 bg-glaucous">
    <div class="flex h-full flex-col items-center">
      <GeneralUserIcon class="h-1/3 w-1/3" />
      <h1 class="mb-1">{{ username }}</h1>
      <h1 class="mb-8 text-lg">({{ fullname }})</h1>
      <div
        class="h-1/6 w-1/2 resize-none overflow-y-scroll whitespace-pre-wrap break-words rounded-lg bg-slate-800/30 p-3 text-xl"
      >
        {{ bio }}
      </div>
      <div
        @click.prevent.stop="toggleMyAuctions"
        class="m-4 flex items-center gap-2 rounded-md border p-2 hover:cursor-pointer"
      >
        <TrophyIcon v-show="showMyAuctions" class="size-12" />
        <HammerIcon v-show="!showMyAuctions" class="size-12" />
        <label class="select-none text-3xl hover:cursor-pointer">
          {{ btnText }}
        </label>
      </div>
    </div>
  </div>
  <div class="flex h-screen w-screen flex-row justify-end">
    <div class="flex h-full w-3/5 justify-center pt-10">
      <CardGroup
        :error="loadingError"
        :loading="isLoading"
        :data="renderData()"
        :title="title"
        topbtn="true"
        type="auction"
      />
    </div>
  </div>
</template>
