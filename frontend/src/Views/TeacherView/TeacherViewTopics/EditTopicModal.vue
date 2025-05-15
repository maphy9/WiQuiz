<template>
  <div
    class="modal-overlay"
    tabindex="0"
    @keydown.esc="discardAndClose"
  >
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">Dodaj/Zmień Temat</span>

        <span
          class="modal-close"
          @click="$emit('close')"
        >&times;</span>
      </div>

      <div class="modal-body">
        <label for="topicName">Nazwa Tematu:</label>

        <input
          id="topicName"
          v-model="localTopicName"
          class="modal-input"
          type="text"
          autocomplete="off"
          @keyup.enter="save"
        >
      </div>

      <button
        class="modal-save"
        type="button"
        @click="save"
      >
        Zapisz zmiany
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'save' | 'close'): void
}>()

const localTopicName = ref<string>('')

watch(
  () => props.modelValue,
  (val) => {
    localTopicName.value = val
  },
  { immediate: true },
)

watch(() => props.modelValue, (val) => {
  localTopicName.value = val
})

function save() {
  emit('update:modelValue', localTopicName.value)
  emit('save')
}
function discardAndClose() {
  localTopicName.value = props.modelValue // discard changes
  emit('close')
}

onMounted(() => {
  nextTick(() => {
    const overlay = document.querySelector('.modal-overlay') as HTMLElement
    overlay?.focus()
  })
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  padding: 32px 28px 24px 28px;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.modal-title {
  font-size: 24px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 500;
}
.modal-close {
  font-size: 32px;
  cursor: pointer;
  line-height: 1;
}
.modal-body {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}
.modal-body label {
  font-size: 18px;
  margin-bottom: 6px;
  font-family: "Titillium Web", sans-serif;
}
.modal-input {
  font-size: 18px;
  padding: 7px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: "Titillium Web", sans-serif;
}
.modal-save {
  background: #1a4a9d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 18px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}
.modal-save:hover {
  background: #163e7d;
}
</style>
