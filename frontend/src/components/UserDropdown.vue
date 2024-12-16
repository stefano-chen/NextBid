<script setup>
import { ref } from 'vue'
import UserModal from './UserModal.vue'

let showModal = ref(false)

const toggleModal = () => {
  if (!showModal.value) document.body.classList.add('no-scroll')
  else document.body.classList.remove('no-scroll')
  showModal.value = !showModal.value
}
</script>

<template>
  <div class="w-9 hover:cursor-pointer" @click="toggleModal">
    <img class="size-9" src="@/assets/images/user-icon.png" />
    <UserModal :show="showModal" @close="toggleModal" />
  </div>
</template>
