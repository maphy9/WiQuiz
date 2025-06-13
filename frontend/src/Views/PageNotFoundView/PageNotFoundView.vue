<template>
  <LanguageButton />

  <div class="notfound-bg">
    <div class="notfound-main-content">
      <div class="notfound-404">
        404
      </div>

      <div class="notfound-msg">
        {{ $t('page-not-found.page-not-found') }}
      </div>
    </div>

    <ReturnButton />
  </div>
</template>

<script lang="ts" setup>
import LanguageButton from '@/components/SharedComponents/LanguageButton.vue'
import ReturnButton from '@/components/SharedComponents/ReturnButton.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
.notfound-bg {
  min-height: 100vh;
  width: 100vw;
  background: url('@/images/mainBackground.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notfound-main-content {
  background-color: rgba(69, 80, 97, 0.8);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  padding: 64px 96px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.notfound-404 {
  font-size: 10rem;
  font-family: 'Press Start 2P', monospace;
  color: #fff;
  letter-spacing: 0.15em;
  text-shadow: 4px 4px 0 #222, 8px 8px 0 #444;
  margin-bottom: 40px;
  line-height: 1;
}

.notfound-msg {
  font-size: 3rem;
  font-family: 'Press Start 2P', monospace;
  color: #fff;
  text-shadow: 2px 2px 0 #222;
  margin-top: 8px;
}

@media (max-width: 600px) {
  .notfound-content {
    padding: 24px 8px;
  }
  .notfound-404 {
    font-size: 3rem;
  }
  .notfound-msg {
    font-size: 1rem;
  }
}
</style>
