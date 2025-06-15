<template>
  <div class="falling-leaves">
    <div
      v-for="i in 4"
      :key="`leaf-left-${i}`"
      class="green-leaf leaf"
      :style="{
        '--delay': `${i * 2}s`,
        '--duration': `${12 + Math.random() * 6}s`,
        '--x-start': `${Math.random() * 40}%`,
        '--x-end': `${Math.random() * 45}%`,
        '--rotation': `${Math.random() * 360}deg`,
        '--wind-intensity': 0.3 + Math.random() * 0.5,
      }"
    >
      🍃
    </div>

    <div
      v-for="i in 3"
      :key="`big-leaf-left-${i}`"
      class="big-green-leaf leaf"
      :style="{
        '--delay': `${i * 3.5}s`,
        '--duration': `${14 + Math.random() * 4}s`,
        '--x-start': `${Math.random() * 35}%`,
        '--x-end': `${Math.random() * 40}%`,
        '--rotation': `${Math.random() * 360}deg`,
        '--wind-intensity': 0.4 + Math.random() * 0.4,
      }"
    >
      🌿
    </div>

    <div
      v-for="i in 4"
      :key="`leaf-right-${i}`"
      class="green-leaf leaf"
      :style="{
        '--delay': `${i * 2.2}s`,
        '--duration': `${12 + Math.random() * 6}s`,
        '--x-start': `${55 + Math.random() * 40}%`,
        '--x-end': `${50 + Math.random() * 45}%`,
        '--rotation': `${Math.random() * 360}deg`,
        '--wind-intensity': 0.3 + Math.random() * 0.5,
      }"
    >
      🍃
    </div>

    <div
      v-for="i in 3"
      :key="`big-leaf-right-${i}`"
      class="big-green-leaf leaf"
      :style="{
        '--delay': `${i * 3.8}s`,
        '--duration': `${14 + Math.random() * 4}s`,
        '--x-start': `${60 + Math.random() * 35}%`,
        '--x-end': `${55 + Math.random() * 40}%`,
        '--rotation': `${Math.random() * 360}deg`,
        '--wind-intensity': 0.4 + Math.random() * 0.4,
      }"
    >
      🌿
    </div>
  </div>
</template>

<style scoped>
.falling-leaves {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.leaf {
  position: absolute;
  top: -50px;
  font-size: 28px;
  animation: fallWithWind var(--duration) linear infinite;
  animation-delay: var(--delay);
  opacity: 0.8;
  transform: rotate(var(--rotation));
  left: var(--x-start);
}

.leaf.green-leaf {
  font-size: 32px;
  opacity: 0.9;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}

.leaf.big-green-leaf {
  font-size: 40px;
  opacity: 0.85;
  filter: drop-shadow(3px 3px 6px rgba(0, 0, 0, 0.3));
}

@keyframes fallWithWind {
  0% {
    transform: translateY(-50px) translateX(0) rotate(var(--rotation)) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(10vh) translateX(calc(10px * var(--wind-intensity))) rotate(calc(var(--rotation) + 45deg)) scale(1);
  }
  25% {
    transform: translateY(25vh) translateX(calc(-20px * var(--wind-intensity))) rotate(calc(var(--rotation) + 120deg)) scale(1.1);
  }
  40% {
    transform: translateY(40vh) translateX(calc(30px * var(--wind-intensity))) rotate(calc(var(--rotation) + 200deg)) scale(0.9);
  }
  55% {
    transform: translateY(55vh) translateX(calc(-15px * var(--wind-intensity))) rotate(calc(var(--rotation) + 280deg)) scale(1.05);
  }
  70% {
    transform: translateY(70vh) translateX(calc(25px * var(--wind-intensity))) rotate(calc(var(--rotation) + 360deg)) scale(0.95);
  }
  85% {
    transform: translateY(85vh) translateX(calc(-10px * var(--wind-intensity))) rotate(calc(var(--rotation) + 440deg)) scale(1);
  }
  100% {
    transform: translateY(110vh) translateX(calc(5px * var(--wind-intensity))) rotate(calc(var(--rotation) + 520deg)) scale(0.7);
    opacity: 0;
  }
}
</style>
