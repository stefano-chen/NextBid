<script setup>
import SignForm from '@/components/SignForm.vue'
import { ref } from 'vue'
let signup = ref(false)
const toogle = () => {
  signup.value = !signup.value
}
</script>

<template>
  <div class="flex h-screen items-center justify-center overflow-hidden bg-violet">
    <div class="flex h-3/4 w-2/3 flex-row items-center justify-center rounded-2xl bg-slate-800">
      <div class="h-full w-1/2 p-4">
        <img class="h-full rounded-2xl" src="@/assets/images/Designer.png" />
      </div>
      <div class="flex h-full w-1/2 justify-center">
        <SignForm @toggleform="toogle" :signup="signup" />
      </div>
    </div>
  </div>
</template>
