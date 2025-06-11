<template>
  <div class="background">
    <LeafesAnimation />

    <LanguageButton />

    <div class="team-card">
      <div class="team-card-top">
        <h3>{{ $t('main-view.your-team') }}</h3>
      </div>

      <div
        v-if="isConnected"
        class="team-members"
      >
        <div
          v-for="(teammate, index) in team"
          :key="index"
          class="member-slot"
          @click="playButtonSound"
        >
          <img
            class="avatar"
            :src="teammate.user.avatar || '/images/emptyPfp.png'"
          >

          <div>{{ teammate.user.name }}</div>
        </div>

        <router-link
          v-for="i in (3 - team.length)"
          :key="i"
          :to="{'name': 'join'}"
          class="member-slot"
          @click="playButtonSound"
        >
          <img
            class="add avatar"
            src="@/images/plus.png"
          >

          <div>{{ $t('main-view.invite-or-join') }}</div>
        </router-link>
      </div>
    </div>

    <div
      class="logo-card"
      @click="handleLogoClick"
    >
      <img
        class="logo-img"
        src="@/images/logo.png"
        :class="{'rotate': rotateLogo}"
      >

      <div class="logo-text">
        WIKQUIZ
      </div>
    </div>

    <div class="buttons-card">
      <router-link :to="{'name': 'level-selection'}">
        <div
          class="button play-button"
          @click="playButtonSound"
        >
          <div>{{ $t('main-view.play') }}</div>

          <img
            class="button-img"
            src="@/images/play.png"
          >
        </div>
      </router-link>

      <router-link :to="{'name': 'about'}">
        <div
          class="about-button button"
          @click="playButtonSound"
        >
          <div>{{ $t('main-view.about') }}</div>

          <img
            class="button-img"
            src="@/images/handshake.png"
          >
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeafesAnimation from './LeafesAnimation.vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import LanguageButton from '@/components/SharedComponents/LanguageButton.vue'
import { useGame } from '@/stores/gameStore'
import { useSoundStore } from '@/stores/useSoundStore'

const gameStore = useGame()
const { team, isConnected } = storeToRefs(gameStore)

const logoClickCount = ref(0)
const rotateLogo = ref(false)
const { playButtonSound } = useSoundStore()
const { onMountMainTheme } = useSoundStore()

onMounted(() => {
  onMountMainTheme()
})

function handleLogoClick() {
  logoClickCount.value++
  if (logoClickCount.value >= 5) {
    rotateLogo.value = true
    setTimeout(() => {
      rotateLogo.value = false
      logoClickCount.value = 0
    }, 1000)
  }
}
</script>

<style scoped src="./MainView.css"></style>
