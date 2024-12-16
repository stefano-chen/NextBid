<script setup>
import { ref, computed } from 'vue'
import eyeopenUrl from '@/assets/images/eye-open.png'
import eyeclosedUrl from '@/assets/images/eye-closed.png'

let props = defineProps({
  signup: Boolean,
})

const formText = computed(() => {
  return !props.signup
    ? {
        title: 'Sign In',
        subtitle: "Don't have an account yet?",
        buttonText: 'Sign In',
      }
    : {
        title: 'Create an account',
        subtitle: 'Already have an account?',
        buttonText: 'Create account',
      }
})

let showPassword = ref(false)

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="flex w-4/6 flex-col items-start">
    <div
      class="mb-2 flex items-center gap-2 transition hover:-translate-y-2 hover:cursor-pointer"
      @click="$router.back()"
    >
      <img class="size-5" src="@/assets/images/back-arrow.png" />
      <span>Back </span>
    </div>
    <h1 class="text-4xl">{{ formText.title }}</h1>
    <p class="mb-14 mt-3 text-lg opacity-50">
      {{ formText.subtitle }}
      <span class="ml-2 underline hover:cursor-pointer" @click="$emit('toggleform')"
        >Click here</span
      >
    </p>
    <Transition>
      <div v-if="props.signup" class="flex gap-4">
        <input
          class="mt-4 h-12 w-1/2 rounded-md bg-slate-700 p-4 outline-none"
          type="text"
          placeholder="First name"
        />
        <input
          class="mt-4 h-12 w-1/2 rounded-md bg-slate-700 p-4 outline-none"
          type="text"
          placeholder="Last name"
        />
      </div>
    </Transition>
    <input
      class="mt-4 h-12 w-full rounded-md bg-slate-700 p-4 outline-none"
      type="text"
      placeholder="username"
    />
    <div class="relative w-full">
      <input
        class="mt-4 h-12 w-full rounded-md bg-slate-700 p-4 outline-none"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Enter your password"
      />
      <img
        class="absolute inset-y-7 right-2 z-50 size-6 hover:cursor-pointer"
        :src="!showPassword ? eyeopenUrl : eyeclosedUrl"
        @click="toggleShowPassword"
      />
    </div>
    <button class="mt-16 w-full rounded-md bg-violet px-4 py-2">{{ formText.buttonText }}</button>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
