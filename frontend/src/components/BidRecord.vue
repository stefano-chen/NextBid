<script setup>
import { format } from 'date-fns'
const props = defineProps(['bid'])

const date = format(props.bid.createdAt, 'dd-MM-yyyy HH:mm:ss')
// console.log(props.bid?.createdAt)
const username = `[${date}] ${props.bid.user.username}`
const amount = props.bid.amount.toFixed(2)
</script>

<template>
  <div class="grid grid-cols-4 grid-rows-1 border-b-2 px-2 py-1 text-xl">
    <label class="col-span-3 border-r-2">{{ username }}</label>
    <label class="text-center">{{ amount }}&#8364;</label>
  </div>
</template>
