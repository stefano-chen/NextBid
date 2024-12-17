<script setup></script>

<template>
  <div class="flex h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-violet">
    <div
      class="flex h-3/4 w-2/3 flex-row items-center justify-center rounded-2xl bg-slate-800 shadow-xl shadow-slate-700"
    >
      <div class="h-full w-1/2 p-4">
        <img class="h-full rounded-2xl" src="@/assets/images/Designer.png" />
      </div>
      <div class="flex h-full w-1/2 justify-center">
        <SignForm @toggleform="toogle" :signup="signup" />
      </div>
    </div>
  </div>
</template>
