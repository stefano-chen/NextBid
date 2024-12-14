<script setup>
const props = defineProps(['colorClass'])
</script>

<template>
  <button :class="[props.colorClass || 'bg-green-800', 'rounded-xl', 'p-4', 'w-40']">
    <slot> </slot>
  </button>
</template>
