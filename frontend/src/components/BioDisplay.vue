<script setup>
import { inject, ref } from 'vue'
import EditIcon from '@/assets/icons/EditIcon.vue'
import SaveIcon from '@/assets/icons/SaveIcon.vue'
import axios from 'axios'

let editable = ref(false)
const { user, setBio, saveUser } = inject('user')

// const originalBio = computed({
//   get() {
//     return user.value.bio
//   },

//   set(newBio) {
//     setBio(newBio)
//   },
// })

let originalBio = user.value.bio

let newBio = originalBio

const updateBio = async () => {
  try {
    if (newBio !== originalBio) {
      await axios.post('/api/users/bio', { bio: newBio })
      setBio(newBio)
      saveUser()
      originalBio = newBio
    }
  } catch (error) {
    console.log(error.response.data)
  }
}

const toggleEdit = () => {
  const textarea = document.getElementById('textarea')
  if (editable.value) {
    textarea.classList.remove('outline')
    updateBio()
  } else textarea.classList.add('outline')
  editable.value = !editable.value
}
</script>

<template>
  <label class="block text-xl" for="bio">Profile Description</label>
  <div id="bio" class="relative mt-1 h-1/6 w-full">
    <textarea
      id="textarea"
      class="h-full w-full resize-none overflow-y-scroll whitespace-pre-wrap break-words rounded-lg bg-slate-800/50 p-3"
      v-model="newBio"
      placeholder="You don't have a profile description yet.&#10;Add one to tell others more about yourself!"
      :disabled="!editable"
    >
    </textarea>
    <component
      :is="editable ? SaveIcon : EditIcon"
      @click.prevent="toggleEdit"
      class="absolute right-2 top-2 size-6 stroke-white hover:cursor-pointer"
    ></component>
  </div>
</template>
