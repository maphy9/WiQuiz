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
          <span class="title-text">{{ subjectName }}</span>
        </div>

        <div class="container">
          <div class="topics">
            <h3>{{ $t('teacher-questions.topic-name') }}: {{ topicName }}</h3>

            <ul class="topics-list">
              <li
                v-for="(q, idx) in questions"
                :key="idx"
                class="topic-item"
              >
                <span>{{ idx + 1 }}. {{ q.text }}</span>

                <div class="actions">
                  <img
                    class="default-icon"
                    src="@/images/edit_icon.png"
                    @click="openEditModal(idx)"
                  >

                  <img
                    class="default-icon"
                    src="@/images/delete_icon.png"
                    @click="openDeleteModal(idx)"
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Footer from '@/components/TeacherViewComponents/Footer.vue'
import Header from '@/components/TeacherViewComponents/Header.vue'
import DeleteQuestionModal from './DeleteQuestionModal.vue'
import EditQuestionModal from './EditQuestionModal.vue'

const subjectName = ref('Analiza Matematyczna I')

const topicName = ref('Granice funkcji')

const questions = ref([
  {
    text: 'Oblicz granicę: lim(x → 2) (x² + 3x − 4)',
    answers: ['2', '6', '1', 'nie istnieje'],
    correctIndex: 1,
  },
  {
    text: 'Oblicz granicę: lim(x → 0) (sin(x)/x)',
    answers: ['1', '0', '∞', 'nie istnieje'],
    correctIndex: 0,
  },
  {
    text: 'Oblicz granicę: lim(x → ∞) (1/x)',
    answers: ['0', '∞', '1', 'nie istnieje'],
    correctIndex: 0,
  },
  {
    text: 'Oblicz granicę: lim(x → 1) (x³ − 1)/(x − 1)',
    answers: ['3', '0', '1', 'nie istnieje'],
    correctIndex: 3,
  },
  {
    text: 'Oblicz granicę: lim(x → 0) (e^x − 1)/x',
    answers: ['1', '0', '∞', 'nie istnieje'],
    correctIndex: 0,
  },

])

const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingIndex = ref<number | null>(null)
const deletingIndex = ref<number | null>(null)
const questionModel = ref({
  text: '',
  answers: ['', '', '', ''],
  correctIndex: 0,
})

function openEditModal(index: number) {
  editingIndex.value = index
  questionModel.value = { ...questions.value[index] }
  showEditModal.value = true
}
function openAddModal() {
  editingIndex.value = null
  questionModel.value = { text: '', answers: ['', '', '', ''], correctIndex: 0 }
  showEditModal.value = true
}
function saveQuestion() {
  if (editingIndex.value !== null) {
    questions.value[editingIndex.value] = { ...questionModel.value }
  }
  else {
    questions.value.push({ ...questionModel.value })
  }
  showEditModal.value = false
}
function closeEditModal() {
  showEditModal.value = false
}
function openDeleteModal(index: number) {
  deletingIndex.value = index
  showDeleteModal.value = true
}
function confirmDelete() {
  if (deletingIndex.value !== null) {
    questions.value.splice(deletingIndex.value, 1)
  }
  showDeleteModal.value = false
  deletingIndex.value = null
}
function closeDeleteModal() {
  showDeleteModal.value = false
  deletingIndex.value = null
}
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
  </style>
