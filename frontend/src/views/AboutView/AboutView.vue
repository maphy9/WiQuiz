<script setup lang="ts">
import { onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import LanguageButton from '@/components/SharedComponents/LanguageButton.vue'
import ReturnButton from '@/components/SharedComponents/ReturnButton.vue'
import { useSoundStore } from '@/stores/useSoundStore'
import LeavesAnimation from '@/views/MainView/LeavesAnimation.vue'

const { onMountMainTheme } = useSoundStore()

onBeforeRouteLeave((to) => {
  if (to.name === 'main') {
    return true
  }

  return { name: 'main' }
})

onMounted(() => {
  onMountMainTheme()
})
</script>

<template>
  <div class="main">
    <LeavesAnimation />

    <LanguageButton />

    <div class="container">
      <div class="title">
        {{ $t('about-view.creators') }}
      </div>

      <ul class="content">
        <li>Andrii Bialkovskyi - 253190</li>

        <li>Dmytro Malinovskyi - 252501</li>

        <li>Aliaksandr Yurusau - 253811</li>

        <li>Mikita Dzeviatau - 253805</li>
      </ul>
    </div>

    <ReturnButton />
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/images/mainBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.container {
  border: 1px solid black;
  padding: 10px;
  padding-bottom: 64px;
  width: calc(92.5% - 22px);
  background-color: rgba(69, 80, 97, 0.8);
  backdrop-filter: blur(5px);
}

.title {
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 64px;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.content {
  padding-left: 64px;
  color: white;
  font-size: 48px;
  list-style: square;
}

@media only screen and (max-width: 800px) {
  .title {
    font-size: 10vw;
  }

  .container {
    padding-bottom: 40px;
  }

  .content {
    font-size: 6vw;
    padding-left: 10vw;
  }
}
</style>
