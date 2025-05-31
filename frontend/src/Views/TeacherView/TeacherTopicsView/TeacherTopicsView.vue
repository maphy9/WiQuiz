<template>
  <div class="teacher-topics-view">
    <div
      :class="`background${showModal || showDeleteModal
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
            <h3>{{ $t('teacher-topics.choose-topic') }}</h3>

            <ul class="topics-list">
              <li
                v-for="(topic, idx) in topics"
                :key="idx"
                class="topic-item"
              >
                <span>{{ topic.name }}</span>

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

              <div class="add-topic">
                <span>{{ $t('teacher-topics.add-new-topic') }}</span>

                <img
                  class="add-icon"
                  src="@/images/add_icon.png"
                  @click="openAddModal()"
                >
              </div>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>

    <EditTopicModal
      v-if="showModal"
      v-model="topicName"
      @save="saveTopic"
      @close="closeModal"
    />

    <DeleteTopicModal
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
import DeleteTopicModal from '@/Views/TeacherView/TeacherTopicsView/DeleteTopicModal.vue'
import EditTopicModal from '@/Views/TeacherView/TeacherTopicsView/EditTopicModal.vue'

const subjectName = ref('Analiza Matematyczna I')

const topics = ref([
  { name: 'Granice (limity)' },
  { name: 'Ciągłość funkcji' },
  { name: 'Pochodne' },
  { name: 'Całki' },
])

const showModal = ref(false)
const showDeleteModal = ref(false)
const topicName = ref('')
const editingIndex = ref<number | null>(null)
const deletingIndex = ref<number | null>(null)

function openEditModal(index: number) {
  editingIndex.value = index
  topicName.value = topics.value[index].name
  showModal.value = true
}

function openAddModal() {
  editingIndex.value = null
  topicName.value = ''
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function saveTopic() {
  if (topicName.value.trim() === '')
    return
  if (editingIndex.value !== null) {
    topics.value[editingIndex.value].name = topicName.value
  }
  else {
    topics.value.push({ name: topicName.value })
  }
  closeModal()
}
function openDeleteModal(index: number) {
  deletingIndex.value = index
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  deletingIndex.value = null
}

function confirmDelete() {
  if (deletingIndex.value !== null) {
    topics.value.splice(deletingIndex.value, 1)
  }
  closeDeleteModal()
}
</script>

<style scoped>
  .teacher-topics-view {
    overflow-y: auto;
    overflow-x: hidden;
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
