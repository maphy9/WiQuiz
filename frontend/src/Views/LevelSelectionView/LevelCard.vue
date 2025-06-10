<script setup lang="ts">
import { computed, toRefs, ref } from 'vue'
import { useSoundStore } from '@/stores/useSoundStore'

const props = defineProps<{
  level: any
}>()

const emit = defineEmits<{
  levelClicked: [levelIndex: number]
}>()

const { playButtonSound } = useSoundStore()
const { level } = toRefs(props)
const isClicked = ref(false)

const bgColour = computed(() => {
  switch (level.value.state) {
    case 'passed': return '#80C997'
    case 'locked': return '#8B231D'
    case 'repeat': return '#FFD966'
    default: return '#ccc'
  }
})

const imageSrc = computed(() => {
  switch (level.value.state) {
    case 'passed': return new URL('@/images/arrow.png', import.meta.url).href
    case 'locked': return new URL('@/images/lock.png', import.meta.url).href
    case 'repeat': return new URL('@/images/circleArrow.png', import.meta.url).href
    default: return ''
  }
})

const dynamicFontSize = computed(() => {
  return level.value.LevelTitle.length > 10
    ? '25px'
    : '32px'
})

function handleClick() {
  if (level.value.state === 'locked') return
  
  playButtonSound()
  isClicked.value = true
  
  setTimeout(() => {
    emit('levelClicked', level.value.OrderNumber - 1)
  }, 300)
}
</script>

<template>
  <div
    :class="`card-container ${level.state} ${isClicked ? 'clicked' : ''}`"
    @click="handleClick"
  >
    <div v-if="level.state !== 'locked'" class="glow-effect"></div>
    
    <div v-if="isClicked" class="overlay-effect"></div>
    
    <div
      class="card-circle"
      :style="{'backgroundColor': bgColour}"
    >
      <img
        :src="imageSrc"
        alt="arrow"
        class="card-img"
      >
    </div>

    <span
      class="card-text"
      :style="{'fontSize': dynamicFontSize}"
    >
      {{ level.LevelTitle }}
    </span>
    
    <div v-if="isClicked" class="particles-explosion">
      <div v-for="i in 8" :key="i" class="particle" :style="{
        '--delay': i * 0.05 + 's',
        '--angle': i * 45 + 'deg'
      }"></div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  width: 180px;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  backdrop-filter: blur(5px);
  background-color: rgba(178, 196, 217, 0.7);
  border: black 2px solid;
  border-radius: 8px;
  transform-style: preserve-3d;
  perspective: 1000px;
  overflow: hidden;
}

.card-container:hover {
  background-color: rgba(158, 180, 202, 0.9);
  transform: rotateY(8deg) rotateX(5deg) translateY(-5px);
  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.25),
    0 0 15px rgba(255, 255, 255, 0.1) inset;
}

.card-container:active,
.card-container.clicked {
  transform: rotateY(0deg) rotateX(0deg) translateY(0px) scale(0.95);
  background-color: rgba(141, 155, 170, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
}

.card-container.passed {
  border-color: #000000;
  box-shadow: 0 0 15px rgba(128, 201, 151, 0.3);
}

.card-container.repeat {
  border-color: #000000;
  box-shadow: 0 0 15px rgba(255, 217, 102, 0.3);
  animation: pulse-repeat 2s infinite;
}

.card-container.locked {
  cursor: not-allowed;
  filter: grayscale(0.7);
  border-color: #8B231D;
}

.card-container.locked:hover {
  transform: none;
  background-color: rgba(178, 196, 217, 0.7);
  box-shadow: none;
}

@keyframes pulse-repeat {
  0%, 100% {
    box-shadow: 0 0 15px rgba(255, 217, 102, 0.3);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 217, 102, 0.6);
  }
}

.glow-effect {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent,
    rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.card-container:hover .glow-effect {
  opacity: 1;
}

.overlay-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%);
  animation: fadeOverlay 0.6s ease-out forwards;
  z-index: 10;
  pointer-events: none;
}

.card-circle {
  width: 115px;
  height: 115px;
  position: absolute;
  transform: scaleX(-1);
  background-size: cover;
  border-radius: 50%;
  bottom: 10%;
  transition: all 0.3s ease;
  z-index: 2;
}

.card-container:hover .card-circle {
  transform: scaleX(-1) scale(1.05);
}

.card-img {
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

.card-text {
  color: white;
  user-select: none;
  position: absolute;
  text-align: center;
  -webkit-text-stroke-color: black;
  -webkit-text-stroke-width: 1px;
  font-weight: 700;
  font-family: "Titillium Web", sans-serif;
  bottom: 65%;
  transition: all 0.3s ease;
  z-index: 2;
}

.card-container:hover .card-text {
  transform: translateY(-5px);
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.particles-explosion {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 5;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: linear-gradient(45deg, #FFD700, #FFA500, #FF6B6B);
  border-radius: 50%;
  animation: particleBurst 0.8s ease-out forwards;
  animation-delay: var(--delay);
  transform: rotate(var(--angle));
}

@keyframes particleBurst {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px) scale(0.3);
  }
}

@media (max-width: 550px) {
  .card-container {
    width: 160px;
    height: 180px;
  }

  .card-container:hover {
    transform: rotateY(5deg) rotateX(3deg) translateY(-3px);
  }
}

.card-container {
  animation: cardAppear 0.6s ease-out forwards;
}

@keyframes cardAppear {
  0% {
    opacity: 0;
    transform: translateY(20px) rotateX(-15deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}
</style>
