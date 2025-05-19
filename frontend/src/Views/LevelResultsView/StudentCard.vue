<template>
  <div class="student-card">
    <img
      src="@/images/emptyPfp.png"
      class="avatar"
    >

    <div class="text">
      <p class="text-name">
        {{ name }}
      </p>

      <p class="text-score">
        {{ score }} punktów
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps<{
  name: string
  score: number
}>()

const name = toRef(props, 'name')
const score = toRef(props, 'score')
</script>

<style scoped>
.student-card {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  margin: 0.5rem;
  min-width: 200px;
  max-width: 700px;
  display: flex;
  align-items: center;
}

.text {
  text-align: left;
  flex: 1;
  padding-left: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.text-name{
  color: white;
  font-weight: 400;
  font-size: 2rem;
}

.text-score{
  align-items: right;
  color:#80C997;
  font-weight: 600;
  font-size:2rem;
  font-size: 2rem;
  margin-left: 2rem;
}

.avatar {
  width: 9vh;
  height: 9vh;
  background-color: #ccc;
  border-radius: 50%;
  margin-bottom: 4px;
  transition: all 0.3s ease !important;
}
</style>
