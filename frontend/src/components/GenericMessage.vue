<script setup>
const props = defineProps({
  type: String,
})

const getColor = () => {
  if (props.type === 'error') return 'bg-red-800'
  if (props.type === 'success') return 'bg-green-600'
  return ' bg-gray-200'
}
</script>

<template>
  <div class="flex w-full justify-center">
    <div :class="[getColor(), 'rounded-md', 'px-5', 'py-3', 'whitespace-pre-wrap', 'break-words']">
      <slot></slot>
    </div>
  </div>
</template>
