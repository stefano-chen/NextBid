<script setup>
import axios from 'axios'
import { inject } from 'vue'

const emit = defineEmits(['close'])

const { show } = defineProps({
  show: Boolean,
})

const { user, setUser } = inject('user')

const signout = async () => {
  try {
    await axios.get('/api/auth/signout')
    setUser(null)
    localStorage.removeItem('NextBid-user')
    emit('close')
  } catch {
    null
  }
}
</script>

<template>
  <Transition name="overlay">
    <div
      v-show="show"
      class="absolute right-0 top-0 z-20 h-screen w-screen overflow-hidden bg-slate-900/50 hover:cursor-default"
      @click.prevent.stop="emit('close')"
    >
      <div class="absolute right-0 h-full w-3/12 rounded-l-xl bg-slate-900 px-8 py-10" @click.stop>
        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-row items-center gap-5">
            <img src="@/assets/images/user-icon.png" />
            <h1>{{ user.username }}</h1>
          </div>
          <div class="flex flex-row items-center gap-5">
            <img
              @click.prevent.stop="signout"
              class="size-7 hover:cursor-pointer"
              src="@/assets/images/signout.png"
            />
            <img
              @click.prevent.stop="emit('close')"
              class="size-8 hover:cursor-pointer"
              src="@/assets/images/close.png"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
