<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps<{
  message: any
}>()

const { message } = toRefs(props)
const messageColor = computed(() => {
  switch (message.value.color) {
    case 'GREEN':
      return '#2CB688'
    case 'RED':
      return '#E8484B'
    default:
      return '#FADA5E'
  }
})
</script>

<template>
  <div
    class="message"
    :style="{'backgroundColor': messageColor}"
  >
    <span class="message-text">
      {{ message.text }}
    </span>
  </div>
</template>

<style scoped>
.message {
  height: 68px;
  width: calc(100% - 28px);
  padding: 0 12px;
  margin: 10px 0;
  border: 1px solid black;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-text {
  color: white;
  font-size: 48px;
  font-weight: bold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
</style>
