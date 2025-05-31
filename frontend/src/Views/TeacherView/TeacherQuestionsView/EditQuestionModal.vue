<template>
  <div
    class="modal-overlay"
    tabindex="0"
    @keydown.esc="$emit('close')"
  >
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">{{ $t('teacher-questions.add-edit-question') }}</span>

        <span
          class="modal-close"
          @click="$emit('close')"
        >&times;</span>
      </div>

      <div class="modal-body">
        <label class="modal-label">{{ $t('teacher-questions.question-content') }}:</label>

        <textarea
          v-model="localQuestion.text"
          class="modal-input"
          :class="{'input-error': showErrors && !localQuestion.text.trim()}"
          rows="4"
        />

        <div class="answers-section">
          <div class="answers-header-row">
            <label class="answers-label">{{ $t('teacher-questions.answer-options') }}:</label>

            <span class="correct-label">{{ $t('teacher-questions.correct-answer') }}</span>
          </div>

          <div
            v-for="(ans, idx) in localQuestion.answers"
            :key="idx"
            class="answer-row"
          >
            <input
              v-model="localQuestion.answers[idx]"
              type="text"
              class="answer-input"
              :class="{'input-error': showErrors && !localQuestion.answers[idx].trim()}"
              :placeholder="`${String.fromCharCode(65 + idx)})`"
            >

            <input
              type="radio"
              :checked="localQuestion.correctIndex === idx"
              name="correct"
              class="answer-radio"
              @change="localQuestion.correctIndex = idx"
            >
          </div>
        </div>
      </div>

      <button
        class="modal-save"
        type="button"
        @click="save"
      >
        {{$t('teacher-questions.save-question')}}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{ modelValue: any }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'save' | 'close'): void
}>()

const localQuestion = ref({
  text: '',
  answers: ['', '', '', ''],
  correctIndex: 0,
})
const showErrors = ref(false)
watch(
  () => props.modelValue,
  (val) => {
    localQuestion.value = { ...val }
  },
  { immediate: true },
)

function save() {
  showErrors.value = true
  if (
    !localQuestion.value.text.trim()
    || localQuestion.value.answers.some(ans => !ans.trim())
  ) {
    return
  }
  emit('update:modelValue', { ...localQuestion.value })
  emit('save')
}
function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape')
    emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)
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
  min-width: 520px;
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
  font-size: 32px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 500;
}
.modal-label{
    font-size: 20px;
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
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
.modal-input {
  width: 100%;
  margin-bottom: 12px;
  font-size: 18px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.answers-section {
  margin-top: 12px;
}
.answers-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.answers-label {
  font-size: 20px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
}
.correct-label {
  font-size: 20px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  margin-right: 5px;
}
.answer-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
}
.answer-input {
  flex: 1;
  font-size: 16px;
  padding: 6px 10px;
}
.answer-radio {
  margin-right: 70px;
  accent-color: #1a4a9d;
  width: 22px;
  height: 22px;
}
.input-error {
  border: 2px solid #e74c3c !important;
  background: #fff6f6;
}
.modal-save {
  background: #1a4a9d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 24px;
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
