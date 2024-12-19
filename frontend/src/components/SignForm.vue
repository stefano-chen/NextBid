<script setup>
import { ref, computed, inject, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import eyeopenUrl from '@/assets/images/eye-open.png'
import eyeclosedUrl from '@/assets/images/eye-closed.png'
import ErrorMessage from './GenericMessage.vue'
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
const { setUser, saveUser } = inject('user')

let errorMessage = ref('')
let loarding = ref(false)

let timeoutID

const showMessage = (msg) => {
  errorMessage.value = ''
  clearTimeout(timeoutID)
  errorMessage.value = msg
  timeoutID = setTimeout(() => (errorMessage.value = ''), 5000)
}

const checkFields = () => {
  let message = ''
  if (props.signup && !userData.name) message += 'First name '
  if (props.signup && !userData.surname) message += ' Last name \n'
  if (!userData.username) message += 'Username '
  if (!userData.password) message += ' Password'
  if (message) {
    showMessage(`The following fields are required: \n${message}`)
    return false
  }
  return true
}

const submit = async () => {
  try {
    if (checkFields()) {
      loarding.value = true
      const response = await axios.post(form.value.endpoint, userData)
      const data = await response.data
      setUser(data)
      saveUser()
      router.push('/')
    }
  } catch (error) {
    showMessage(error.response.data.error)
  } finally {
    loarding.value = false
  }
}

const toggle = () => {
  errorMessage.value = ''
  emit('toggleform')
}

onUnmounted(() => clearTimeout(timeoutID))
</script>

<template>
  <Transition>
    <div :key="form" class="relative flex h-full w-3/4 flex-col items-center justify-center">
      <div
        class="mb-2 flex items-center gap-2 self-start transition hover:-translate-y-2 hover:cursor-pointer"
        @click="$router.push('/')"
      >
        <img class="size-5" src="@/assets/images/back-arrow.png" />
        <span>Back </span>
      </div>
      <h1 class="self-start text-4xl">{{ form.title }}</h1>
      <div class="w-full" v-if="!loarding">
        <p class="mb-8 mt-3 text-lg opacity-50">
          {{ form.subtitle }}
          <span class="ml-2 underline hover:cursor-pointer" @click="toggle">Click here</span>
        </p>
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
        <input
          class="mt-4 h-12 w-full rounded-md bg-slate-700 p-4 outline-none"
          type="text"
          placeholder="Username"
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
          class="relative mt-8 w-full rounded-md bg-violet px-4 py-2 transition hover:scale-105"
        >
          {{ form.buttonText }}
        </button>
      </div>
      <LoadingSpinner class="mt-20" v-else />
      <Transition name="error">
        <ErrorMessage type="error" class="absolute top-6 mt-5 text-lg" v-if="errorMessage"
          ><p class="whitespace-pre-wrap text-lg">{{ errorMessage }}</p></ErrorMessage
        >
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active {
  transition: opacity 1s ease-in;
}
.v-leave-active {
  opacity: 0;
}

.v-enter-from {
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}

.error-enter-active {
  transition: opacity 0.5s ease-in;
}
.error-leave-active {
  transition: opacity 0.5s ease-in;
}

.error-enter-from {
  opacity: 0;
}
.error-leave-to {
  opacity: 0;
}
</style>
