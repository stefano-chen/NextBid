<script setup>
import { RouterLink } from 'vue-router'
import { format } from 'date-fns'

const maxCharusername = 21
const maxCharbio = 180
const props = defineProps(['user'])
let username = props.user.username
if (username && username.length > maxCharusername)
  username = username.slice(0, maxCharusername - 1) + '...'
let bio = props.user.bio
if (bio && bio.length > maxCharbio) bio = bio.slice(0, maxCharbio - 1) + '...'
const userId = props.user._id
const joinDate = format(props.user.createdAt, 'dd-MM-yyyy')
const fullname = `${props.user.name} ${props.user.surname}`
</script>

<template>
  <div class="w-96 rounded-xl bg-glaucous/50 p-10 shadow-2xl hover:scale-110 hover:transition">
    <h1>{{ username }}</h1>
    <label>({{ fullname }})</label>
    <div
      class="mt-3 h-24 overflow-y-scroll whitespace-pre-wrap text-wrap break-words rounded-xl bg-slate-800/15 p-4 text-opacity-50"
    >
      {{ bio || 'No description yet' }}
    </div>
    <hr class="mt-5" />
    <div class="mt-2 flex flex-row items-center justify-between">
      <p class="text-sm">Joined since: {{ joinDate }}</p>
      <RouterLink :to="`/user/${userId}`" class="rounded-md bg-green-700 px-2 py-1"
        >More</RouterLink
      >
    </div>
  </div>
</template>
