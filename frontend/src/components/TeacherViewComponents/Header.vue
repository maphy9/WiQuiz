<template>
  <div class="header">
    <div
      class="header-logo"
      @click="router.push({'name': 'teacher-view'})"
    >
      <img src="@/images/logoPL.png">

      <h1>WIKAMP WEEIA</h1>
    </div>

    <nav class="nav">
      <div class="nav-button">
        <span class="department-text">{{ $t('teacher-views-header.platforms') }}</span>

        <img
          class="header-arrow"
          src="@/images/arrowDown_icon.png"
        >
      </div>

      <div class="nav-button">
        <img
          class="nav-button-img"
          src="@/images/language_icon.png"
        >

        <span
          class="header-language-text"
          @click="toggleLanguage"
        >{{ language }}</span>
      </div>

      <div class="nav-button">
        <img
          class="nav-button-img"
          src="@/images/search_icon.png"
        >
      </div>

      <div class="nav-button">
        <img
          class="nav-button-img"
          src="@/images/accessibility_icon.png"
        >
      </div>

      <div class="nav-button">
        <img
          class="nav-button-img"
          src="@/images/bell_icon.png"
        >
      </div>

      <div class="nav-button">
        <img
          class="nav-button-img"
          src="@/images/msg_icon.png"
        >
      </div>

      <div class="nav-button">
        <img
          class="nav-button-img"
          src="@/images/star_icon.png"
        >
      </div>

      <div
        v-if="user"
        class="header-user"
      >
        <span class="header-user-name">{{ user.name }}</span>

        <img
          class="header-user-img"
          src="@/images/emptyPfp.png"
        >

        <img
          class="header-arrow"
          src="@/images/arrowDown_icon.png"
        >
      </div>

      <div
        v-else
        class="header-user"
        :style="{'textDecoration': 'underline'}"
        @click="router.push({'name': 'login'})"
      >
        Login
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/userStore'

const language = ref('')
const { locale } = useI18n()
const { user } = storeToRefs(useUser())
const router = useRouter()

onMounted(() => {
  if (locale.value === 'pl') {
    language.value = 'Polski (PL)'
  }
  else {
    language.value = 'English (EN)'
  }
})

function toggleLanguage() {
  if (language.value === 'English (EN)') {
    language.value = 'Polski (PL)'
    locale.value = 'pl'
  }
  else {
    language.value = 'English (EN)'
    locale.value = 'en'
  }
}
</script>

<style scoped>
  .header {
    position: fixed;
    top: 2vh;
    width: 95vw;
    height: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #ffffff;
    border-bottom: 3px solid #1a4a9d;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .header-logo {
    display: flex;
    align-items: center;
  }

  .header-logo img {
    height: 75px;
    margin-right: 15px;
  }

  .header-logo h1 {
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
    font-size: 36px;
    color: #1a4a9d;
    cursor: pointer;
  }
  .header-user{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .header-user-img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .header-user-name{
    font-family: "Titillium Web", sans-serif;
    font-weight: 320;
    font-size: 17px;
    margin-right: 10px;
    padding-left: 10px;
  }
  .nav {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .nav-button-img {
    width: 20px;
    height: 20px;
    display: block;
  }
  .nav-button {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .header-arrow{
    width: 15px;
    height: 15px;
    vertical-align: middle;
    display: inline-block;
    margin-left: 5px;
  }
  .header-language-text{
    font-family: "Titillium Web", sans-serif;
    font-weight: 320;
    font-size: 17px;
  }
  .nav-button i {
    font-size: 20px;
  }
</style>
