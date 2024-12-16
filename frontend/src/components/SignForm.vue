<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import eyeopenUrl from '@/assets/images/eye-open.png'
import eyeclosedUrl from '@/assets/images/eye-closed.png'
import ErrorMessage from './ErrorMessage.vue'
import LoadingSpinner from './LoadingSpinner.vue'

const router = useRouter()

let props = defineProps({
  signup: Boolean,
})

const emit = defineEmits(['toggleform'])

const form = computed(() => {
  return !props.signup
    ? {
        title: 'Sign In',
        subtitle: "Don't have an account yet?",
        buttonText: 'Sign In',
        endpoint: '/api/auth/signin',
      }
    : {
        title: 'Create an account',
        subtitle: 'Already have an account?',
        buttonText: 'Create account',
        endpoint: '/api/auth/signup',
      }
})

let showPassword = ref(false)

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

let userData = {}
const { setUser } = inject('user')

let errorMessage = ref('')
let loarding = ref(false)

const submit = async () => {
  try {
    errorMessage.value = ''
    loarding.value = true
    await new Promise((r) => setTimeout(r, 2000)) // Delete for production
    const response = await axios.post(form.value.endpoint, userData)
    const data = await response.data
    setUser(data)
    // console.log(user.value.username) // Delete for production
    localStorage.setItem('NextBid-user', JSON.stringify(data))
    router.push('/')
  } catch (error) {
    errorMessage.value = error.response.data.error
  } finally {
    loarding.value = false
  }
}

const toggle = () => {
  errorMessage.value = ''
  emit('toggleform')
}
</script>

<template>
  <div class="flex w-4/6 flex-col items-start">
    <div
      class="mb-2 flex items-center gap-2 transition hover:-translate-y-2 hover:cursor-pointer"
      @click="$router.push('/')"
    >
      <img class="size-5" src="@/assets/images/back-arrow.png" />
      <span>Back </span>
    </div>
    <h1 class="text-4xl">{{ form.title }}</h1>
    <div class="w-full" v-if="!loarding">
      <p class="mb-14 mt-3 text-lg opacity-50">
        {{ form.subtitle }}
        <span class="ml-2 underline hover:cursor-pointer" @click="toggle">Click here</span>
      </p>
      <Transition>
        <div v-if="props.signup" class="flex gap-4">
          <input
            class="mt-4 h-12 w-1/2 rounded-md bg-slate-700 p-4 outline-none"
            type="text"
            placeholder="First name"
            v-model="userData.name"
          />
          <input
            class="mt-4 h-12 w-1/2 rounded-md bg-slate-700 p-4 outline-none"
            type="text"
            placeholder="Last name"
            v-model="userData.surname"
          />
        </div>
      </Transition>
      <input
        class="mt-4 h-12 w-full rounded-md bg-slate-700 p-4 outline-none"
        type="text"
        placeholder="username"
        v-model="userData.username"
      />
      <div class="relative w-full">
        <input
          class="mt-4 h-12 w-full rounded-md bg-slate-700 p-4 outline-none"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
          v-model="userData.password"
        />
        <img
          class="absolute inset-y-7 right-2 z-50 size-6 hover:cursor-pointer"
          :src="!showPassword ? eyeopenUrl : eyeclosedUrl"
          @click="toggleShowPassword"
        />
      </div>
      <button
        @click="submit"
        class="mt-16 w-full rounded-md bg-violet px-4 py-2"
      >
        {{ form.buttonText }}
      </button>
    </div>
    <LoadingSpinner class="mt-20" v-else />
    <ErrorMessage class="mt-6 text-lg" v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
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
