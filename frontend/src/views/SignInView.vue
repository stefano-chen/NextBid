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
    <div class="flex h-3/4 w-2/3 flex-row rounded-2xl bg-slate-800">
      <div class="w-1/2 pb-5 pl-5 pt-5">
        <img class="h-full rounded-2xl" src="@/assets/images/Designer.png" />
      </div>
      <div class="ml-36 mt-36 h-full w-1/2">
        <SignForm @toggleform="toogle" :signup="signup" />
      </div>
    </div>
  </div>
</template>
