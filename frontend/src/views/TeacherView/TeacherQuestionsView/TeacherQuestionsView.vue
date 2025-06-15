<template>
  <div class="teacher-questions-view">
    <div
      :class="`background${showEditModal || showDeleteModal
        ? ' blurred'
        : ''}`"
    >
      <Header />

      <div class="body">
        <div class="container">
          <span class="title-text">{{ courseTitle }}</span>
        </div>

        <div class="container">
          <div class="topics">
            <h3>{{ $t('teacher-questions.topic-name') }}: {{ currentLevel?.LevelTitle }}</h3>

            <ul class="topics-list">
              <li
                v-for="(q, idx) in currentLevel?.questions"
                :key="idx"
                class="topic-item"
              >
                <span>{{ idx + 1 }}. {{ q.QuestionTitle }}</span>

                <div class="actions">
                  <img
                    class="default-icon"
                    src="@/images/edit_icon.png"
                    @click="openEditModal(q)"
                  >

                  <img
                    class="default-icon"
                    src="@/images/delete_icon.png"
                    @click="openDeleteModal(q)"
                  >
                </div>
              </li>
            </ul>

            <div
              class="add-topic"
            >
              <span>{{ $t('teacher-questions.add-question') }}</span>

              <img
                class="add-icon"
                src="@/images/add_icon.png"
                @click="openAddModal"
              >
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>

    <EditQuestionModal
      v-if="showEditModal"
      v-model="questionModel"
      @save="saveQuestion"
      @close="closeEditModal"
    />

    <DeleteQuestionModal
      v-if="showDeleteModal"
      @confirm="confirmDelete"
      @close="closeDeleteModal"
    />

    <div
      v-if="showValidationError"
      class="validation-error-overlay"
    >
      <div class="validation-error-message">
        <h3>Validation Error</h3>

        <p>Complete all the fields to save the question</p>

        <button
          class="error-ok-button"
          type="button"
          @click="hideValidationError"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type Question from '@/types/Question'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/TeacherViewComponents/Footer.vue'
import Header from '@/components/TeacherViewComponents/Header.vue'
import { useGame } from '@/stores/gameStore'
import { createQuestion, deleteQuestion, getCourseName, updateQuestion } from '@/utils/fetchUtils'
import DeleteQuestionModal from './DeleteQuestionModal.vue'
import EditQuestionModal from './EditQuestionModal.vue'

const router = useRouter()

const { currentLevel } = storeToRefs(useGame())
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editedQuestion = ref<Question | null>(null)
const deletedQuestion = ref<Question | null>(null)
const showValidationError = ref(false)

const questionModel: Ref<Question> = ref({
  QuestionId: 0,
  QuestionTitle: '',
  QuestionText: '',
  LevelId: 0,
  OrderNumber: (currentLevel.value?.questions.length as number) + 1,
  answers: [
    { AnswerId: 0, AnswerText: '', IsCorrect: false, QuestionId: 0 },
    { AnswerId: 0, AnswerText: '', IsCorrect: false, QuestionId: 0 },
    { AnswerId: 0, AnswerText: '', IsCorrect: false, QuestionId: 0 },
    { AnswerId: 0, AnswerText: '', IsCorrect: false, QuestionId: 0 },
  ],
})

function openEditModal(question: Question) {
  editedQuestion.value = question
  questionModel.value = { ...question }
  showEditModal.value = true
}

function openAddModal() {
  editedQuestion.value = null
  questionModel.value = {
    QuestionId: 0,
    QuestionTitle: '',
    QuestionText: '',
    LevelId: 0,
    OrderNumber: (currentLevel.value?.questions.length as number) + 1,
    answers: [
      { AnswerId: 0, AnswerText: '', IsCorrect: false, QuestionId: 0 },
      { AnswerId: 0, AnswerText: '', IsCorrect: false, QuestionId: 0 },
      { AnswerId: 0, AnswerText: '', IsCorrect: false, QuestionId: 0 },
      { AnswerId: 0, AnswerText: '', IsCorrect: false, QuestionId: 0 },
    ],
  }
  showEditModal.value = true
}
function validateQuestion(question: Question): boolean {
  // Check if question title and text are not empty
  if (!question.QuestionTitle.trim() || !question.QuestionText.trim()) {
    return false
  }

  // Check if all answers have text
  const hasEmptyAnswer = question.answers.some(answer => !answer.AnswerText.trim())
  if (hasEmptyAnswer) {
    return false
  }

  // Check if at least one answer is marked as correct
  const hasCorrectAnswer = question.answers.some(answer => answer.IsCorrect)
  if (!hasCorrectAnswer) {
    return false
  }

  return true
}
async function saveQuestion() {
  // Validate the question before saving
  if (!validateQuestion(questionModel.value)) {
    showValidationError.value = true

    return // Don't save if validation fails
  }

  if (editedQuestion.value !== null) {
    await updateQuestion(
      questionModel.value.QuestionId,
      { ...questionModel.value },
    )
    if (currentLevel.value && editedQuestion.value !== questionModel.value) {
      const _editedQuestion = currentLevel.value?.questions.findIndex(_q => _q.QuestionId === questionModel.value.QuestionId)
      currentLevel.value.questions[_editedQuestion] = { ...questionModel.value }
    }
  }
  else if (currentLevel.value) {
    questionModel.value.LevelId = currentLevel.value.LevelId
    const newQuestion = await createQuestion({ ...questionModel.value })
    currentLevel.value.questions.push(newQuestion)
  }
  showEditModal.value = false
}

function closeEditModal() {
  showEditModal.value = false
}

function openDeleteModal(question: Question) {
  deletedQuestion.value = question
  showDeleteModal.value = true
}

function confirmDelete() {
  if (deletedQuestion.value !== null && currentLevel.value) {
    currentLevel.value.questions = currentLevel.value.questions.filter((question: Question) => question.QuestionId !== deletedQuestion.value?.QuestionId)
    deleteQuestion(deletedQuestion.value.QuestionId)
  }
  closeDeleteModal()
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deletedQuestion.value = null
}

function hideValidationError() {
  showValidationError.value = false
}

const courseTitle = ref('')

onMounted(async () => {
  if (!currentLevel.value) {
    router.push({ name: 'teacher-topics' })
  }
  courseTitle.value = await getCourseName()
})
</script>

<style scoped>
  .teacher-questions-view {
    overflow-y: scroll !important;
    overflow-x: hidden !important;
  }
  .background {
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    background: #f2f4f6 center/cover no-repeat;
    display: flex;
    align-items: center;
    position: relative;
  }
  .background::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4vh;
    background-color: #f2f4f6;
    z-index: 999;
  }

  .body{
    display: flex;
    flex-direction: column;
    margin: 75px 0;
  }

  .container {
    width: 95vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    margin-top: 60px;
    padding: 20px 20px;
  }

  .title-text{
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
    font-size: 48px;
    padding-left: 40px;
    text-align: left;;
  }

  .topics {
    width: 100%;
    padding: 20px;
  }

  .topics h3 {
    font-family: "Titillium Web", sans-serif;
    font-size: 32px;
    font-weight: 500;
    padding-left: 30px;
    margin-bottom: 10px;
  }

  .topics-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .topic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 60px;
    border-bottom: 1px solid #ccc;
  }

  .topic-item:first-child {
    border-top: 1px solid #ccc;
  }

  .topic-item span {
    font-family: "Titillium Web", sans-serif;
    font-size: 24px;
    font-weight: 400;
  }

  .actions {
    display: flex;
  }

  .default-icon {
    width: 30px;
    height: 30px;
    margin-right: 75px;
    cursor: pointer;
  }

  .add-icon {
    width: 30px;
    height: 30px;
    margin-right: 180px;
    cursor: pointer;
  }

  .add-topic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-family: "Titillium Web", sans-serif;
    font-size: 32px;
    font-weight: 600;
    padding-left: 30px;
    padding-right:60px;
    margin-top: 10px;
  }
  .blurred {
    filter: blur(4px);
    pointer-events: none;
    user-select: none;
 }
 .validation-error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

.validation-error-message {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.18);
  padding: 32px 28px 24px 28px;
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
  font-family: "Titillium Web", sans-serif;
}

.validation-error-message h3 {
  font-size: 24px;
  font-weight: 500;
  color: #c0392b;
  margin-bottom: 16px;
}

.validation-error-message p {
  font-size: 18px;
  color: #333;
  margin-bottom: 24px;
}
.error-ok-button {
  background: #1a4a8f;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-family: "Titillium Web", sans-serif;
  cursor: pointer;
  transition: background-color 0.2s;
}
  </style>
