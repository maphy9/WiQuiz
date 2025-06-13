<template>
  <div class="teacher-topics-view">
    <div class="background">
      <Header />

      <div class="body">
        <div class="container">
          <span class="title-text">{{ courseTitle }}</span>
        </div>

        <div class="container">
          <div class="topics">
            <div class="WiQuizWrapper">
              <div class="WiQuiz">
                <span
                  class="bebra"
                  @click="router.push({'name': 'main'})"
                >
                  <span class="WiQuizIcon">
                    <img src="@/images/blue_logo.png">
                  </span>

                  <span class="WiQuizText">WiQuiz</span>
                </span>

                <span
                  class="bebra"
                  style="gap: 16px;"
                >
                  <span
                    class="WiQuizIcon-bebra1"
                    @click="router.push({'name': 'teacher-stats'})"
                  >
                    <img src="@/images/datasheet_icon.png">
                  </span>

                  <span
                    class="WiQuizIcon-bebra"
                    @click="router.push({'name': 'teacher-topics'})"
                  >
                    <img src="@/images/edit_icon.png">
                  </span>
                </span>
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
import { useRouter } from 'vue-router'
import Footer from '@/components/TeacherViewComponents/Footer.vue'
import Header from '@/components/TeacherViewComponents/Header.vue'
import { getCourseName } from '@/utils/fetchUtils'

const router = useRouter()

const courseTitle = ref('')

onMounted(async () => {
  courseTitle.value = await getCourseName()
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
  border-top: 1px solid #dcdcdc;
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
</style>
