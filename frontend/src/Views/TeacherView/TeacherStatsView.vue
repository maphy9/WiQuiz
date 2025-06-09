<template>
  <div class="teacher-topics-view">
    <div class="background">
      <Header />

      <div class="body">
        <div class="container">
          <span class="title-text">{{ $t('stats.pio') }}
          </span>
        </div>

        <div class="container">
          <div class="topics">
            <div class="WiQuizWrapper">
              <span class="WiQuizText">{{ $t('stats.student-stats') }}</span>
            </div>

            <div class="user-table">
              <div class="user-table-header">
                <div>{{ $t('stats.student-name') }}</div>

                <div>{{ $t('stats.max-level') }}</div>

                <div>{{ $t('stats.correct-answers') }}</div>

                <div>{{ $t('stats.is-complete') }}</div>
              </div>

              <div
                v-for="(stat, index) in stats"
                :key="index"
                class="user-table-row"
              >
                <div>{{ stat.Name }}</div>

                <div>{{ stat.MaxLevelReached }}</div>

                <div>{{ stat.CorrectPercentage }}%</div>

                <div class="isComplete">
                  <img
                    v-if="stat.IsComplete"
                    src="@/images/green_checkmark.png"
                  >

                  <img
                    v-else
                    src="@/images/red_cross.png"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Footer from '@/components/TeacherViewComponents/Footer.vue'
import Header from '@/components/TeacherViewComponents/Header.vue'
import { getStats } from '@/utils/fetchUtils'

const stats = ref<any>([])

onMounted(async () => {
  stats.value = await getStats(1)
})
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

.WiQuizWrapper {
  border-bottom: 1px solid #dcdcdc;
  padding: 10px 20px;
}

.WiQuiz {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.WiQuiz span:hover {
  cursor: pointer;
  text-decoration: underline;
  display: flex;
}

.WiQuizIcon {
  font-family: 'Material Icons';
  height: 48px;
  width: 48px;
}

.WiQuizIcon-bebra {
  font-family: 'Material Icons';
  height: 32px;
  width: 32px;
}

.WiQuizIcon-bebra img {
  width: 100%;
  height: 100%;
}

.WiQuizIcon-bebra1 {
  font-family: 'Material Icons';
  height: 36px;
  width: 36px;
}

.WiQuizIcon-bebra1 img {
  width: 100%;
  height: 100%;
}

.WiQuizIcon img {
  width: 100%;
  height: 100%;
}

.WiQuizText {
  color: #1a237e;
  font-size: 32px;
}

.bebra {
  display: flex;
  flex-direction: row;
}

.user-table {
  width: 100%;
  margin-top: 20px;
  font-family: "Titillium Web", sans-serif;
  font-size: 18px;
  color: #333;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.user-table-header,
.user-table-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 16px 24px;
  align-items: center;
}

.user-table-header {
  background-color: #f5f5f5;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
}

.user-table-row {
  border-bottom: 1px solid #e0e0e0;
}

.user-table-row:last-child {
  border-bottom: none;
}

.user-table-header div {
  text-align: center;
}

.user-table-row div {
  text-align: center;
}

.isComplete {
  width: 100;
  text-align: center;
  height: 32px;
}

.isComplete img {
  text-align: center;
  height: 100%;
}
</style>
