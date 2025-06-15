<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, toRefs } from 'vue'
import { useGame } from '@/stores/gameStore'

const props = defineProps<{
  bonus: any
}>()

const { bonus } = toRefs(props)
const isAnimating = ref(false)
const showEffect = ref(false)
const effectText = ref('')
const effectColor = ref('')

const gameStore = useGame()
const { team } = storeToRefs(gameStore)

function handleClick() {
  if (!bonus.value.isAvailable)
    return

  isAnimating.value = true

  if (bonus.value.image.includes('timeBonus')) {
    showEffect.value = true
    effectText.value = '+15s'
    effectColor.value = '#4CAF50'
  }
  else if (bonus.value.image.includes('mistakeBonus')) {
    showEffect.value = true
    effectText.value = 'Wrong Answer Removed!'
    effectColor.value = '#FF6B6B'
  }
  else if (bonus.value.image.includes('reviveBonus')) {
    const hasDeadPlayers = team.value.some(teammate => !teammate.isAlive)
    if (hasDeadPlayers) {
      showEffect.value = true
      effectText.value = 'Player Revived!'
      effectColor.value = '#FFD700'
    }
  }

  bonus.value.onClick()

  setTimeout(() => {
    isAnimating.value = false
    showEffect.value = false
  }, 1500)
}
</script>

<template>
  <div class="bonus-container">
    <img
      :class="`bonus-icon ${bonus.isAvailable
        ? 'available'
        : 'unavailable'} ${isAnimating
        ? 'animating'
        : ''}`"
      :src="bonus.image"
      @click="handleClick"
    >

    <div
      v-if="showEffect"
      class="particles-container"
    >
      <div
        v-for="i in 12"
        :key="i"
        class="particle"
        :style="{
          '--delay': `${i * 0.1}s`,
          '--angle': `${i * 30}deg`,
        }"
      />
    </div>

    <div
      v-if="showEffect"
      class="effect-text"
      :style="{'color': effectColor}"
    >
      {{ effectText }}
    </div>

    <div
      v-if="showEffect"
      class="ring-effect"
    />
  </div>
</template>

<style scoped>
.bonus-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bonus-icon {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: relative;
  z-index: 2;
}

.bonus-icon:hover {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.available {
  opacity: 1;
  cursor: pointer;
}

.unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(1);
}

.animating {
  animation: bonusActivation 0.6s ease-out;
}

@keyframes bonusActivation {
  0% { transform: scale(1); }
  30% { transform: scale(1.3) rotate(10deg); }
  60% { transform: scale(0.9) rotate(-5deg); }
  100% { transform: scale(1) rotate(0deg); }
}

.particles-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B, #4CAF50, #2196F3);
  border-radius: 50%;
  animation: particleExplosion 1.5s ease-out forwards;
  animation-delay: var(--delay);
  transform: rotate(var(--angle));
}

@keyframes particleExplosion {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-40px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-80px) scale(0.5);
  }
}

.effect-text {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  animation: textEffect 1.5s ease-out forwards;
  pointer-events: none;
  z-index: 3;
  white-space: nowrap;
}

@keyframes textEffect {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translateX(-50%) translateY(-20px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-60px) scale(1);
  }
}

.ring-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: 3px solid #FFD700;
  border-radius: 50%;
  animation: ringExpansion 0.8s ease-out forwards;
  pointer-events: none;
  z-index: 1;
}

@keyframes ringExpansion {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.5);
    border-width: 4px;
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.5);
    border-width: 2px;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2.5);
    border-width: 1px;
  }
}

.bonus-icon[src*="timeBonus"] {
  filter: drop-shadow(0 0 8px #4CAF50);
}

.bonus-icon[src*="mistakeBonus"] {
  filter: drop-shadow(0 0 8px #FF6B6B);
}

.bonus-icon[src*="reviveBonus"] {
  filter: drop-shadow(0 0 8px #FFD700);
}

.available {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
  }
}

@media only screen and (max-width: 800px) {
  .bonus-container {
    width: 30vw;
    height: 30vw;
  }

  .bonus-icon {
    width: 100%;
    height: 100%;
  }

  .effect-text {
    font-size: 14px;
    top: -30px;
  }

  .ring-effect {
    width: 40px;
    height: 40px;
  }

  .particle {
    width: 4px;
    height: 4px;
  }
}
</style>
