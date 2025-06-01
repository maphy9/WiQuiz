<template>
  <div class="student-card">
    <img
      :src="teammate.user.avatar"
      class="avatar"
    >

    <div class="text">
      <p class="text-name">
        {{ teammate.user.name }}
      </p>

      <p class="text-score">
        {{ teammate.score }} {{ $t('result-view.points') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Teammate from '@/types/Teammate'
import { toRefs } from 'vue'

const props = defineProps<{
  teammate: Teammate
}>()

const { teammate } = toRefs(props)
</script>

<style scoped>
.student-card {
  background: rgba(0, 0, 0, 0.3);
  padding: 0 10px;
  width: calc(100% - 20px);
  height: 112px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 200px;
  min-height: 50px;
}

.text {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.text-name {
  color: white;
  font-weight: 400;
  font-size: 32px;
}

.text-score {
  color: #80c997;
  font-weight: bold;
  font-size: 32px;
}

.avatar {
  width: 64px;
  height: 64px;
  background-color: #ccc;
  border-radius: 50%;
  transition: all 0.3s ease !important;
}

@media (max-width: 1200px) {
  .text-name {
    font-size: 28px;
  }

  .text-score {
    font-size: 28px;
  }
}

@media (max-width: 1100px) {
  .text-name {
    font-size: 24px;
  }

  .text-score {
    font-size: 24px;
  }
}

@media (max-width: 400px) {
  .text-name {
    font-size: 20px !important;
  }

  .text-score {
    font-size: 20px !important;
  }
}

@media (max-width: 550px){
  .student-card {
    background: rgba(0, 0, 0, 0.3);
    margin: 0;
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 48px;
    height: 48px;
    background-color: #ccc;
    border-radius: 50%;
    margin-bottom: 4px;
    transition: all 0.3s ease !important;
    margin-left: 15px;
  }

  .text-name {
    font-size: 24px;
  }

  .text-score {
    font-size: 24px;
  }
}
</style>
