<script setup>
import { RouterLink } from 'vue-router'
import { format } from 'date-fns'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import SaveIcon from '@/assets/icons/SaveIcon.vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import { ref } from 'vue'
import axios from 'axios'

let isEditable = ref(false)

const maxCharTitle = 21
const maxCharDescription = 180
const props = defineProps(['auction', 'commands'])
let title = props.auction.title
if (title && title.length > maxCharTitle) title = title.slice(0, maxCharTitle - 1) + '...'
let description = props.auction.description
if (description && description.length > maxCharDescription)
  description = description.slice(0, maxCharDescription - 1) + '...'
const auctionId = props.auction._id
const initialBid = props.auction.initialBid?.toFixed(2)
const dueDate = format(props.auction.dueDate, 'dd-MM-yyyy HH:mm')

const emit = defineEmits(['delete'])

const updateAuction = async () => {
  try {
    await axios.put(`/api/auctions/${auctionId}`, { title, description })
  } catch (error) {
    console.log(error.response.data)
  }
}

const toggleEdit = () => {
  const textarea = document.getElementById(`${auctionId}_desc`)
  const titleArea = document.getElementById(`${auctionId}_title`)
  if (isEditable.value) {
    textarea.classList.remove('outline')
    titleArea.classList.remove('outline')
    updateAuction()
  } else {
    textarea.classList.add('outline')
    titleArea.classList.add('outline')
  }
  isEditable.value = !isEditable.value
}
</script>

<template>
  <div
    class="relative w-96 rounded-xl bg-glaucous/50 p-10 shadow-2xl hover:scale-110 hover:transition"
  >
    <input
      :id="`${auctionId}_title`"
      class="mt-2 w-full bg-transparent p-1 text-3xl"
      type="text"
      v-model="title"
      :disabled="!isEditable"
    />
    <textarea
      :id="`${auctionId}_desc`"
      class="mt-3 h-24 w-full resize-none whitespace-pre-wrap text-wrap break-words bg-slate-800/10 p-2 text-xl"
      v-model="description"
      :disabled="!isEditable"
    >
    </textarea>
    <hr class="mt-5" />
    <div class="mt-2 flex flex-row items-center justify-between">
      <p class="text-sm">
        Initial Bid: {{ initialBid }}&#8364; <br />
        Ends: {{ dueDate }}
      </p>
      <RouterLink :to="`/auction/${auctionId}`" class="rounded-md bg-green-700 px-2 py-1"
        >More</RouterLink
      >
    </div>
    <div class="absolute right-8 top-2 flex items-center justify-center gap-1">
      <component
        :is="isEditable ? SaveIcon : EditIcon"
        @click.prevent="toggleEdit"
        class="size-6 transition hover:scale-125 hover:cursor-pointer"
      ></component>
      <DeleteIcon
        class="size-8 transition hover:scale-125 hover:cursor-pointer"
        @click.prevent.stop="emit('delete')"
      />
    </div>
  </div>
</template>
