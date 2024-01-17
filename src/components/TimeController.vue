<template>
  <div class="column">
    <div class="is-flex is-align-items-center is-justify-content-space-between">
      <StopWatch :time-seconds="timeSeconds" />
      <TimerButton button-name="play" icon="fas fa-play" @click="start" :disabled="isActive" />
      <TimerButton button-name="stop" icon="fas fa-stop" @click="stop" :disabled="!isActive" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StopWatch from './StopWatch.vue';
import TimerButton from './TimerButton.vue';

export default defineComponent({
  components: { StopWatch, TimerButton },
  methods: {
    start() {
      this.isActive = true;
      this.interval = setInterval(() => {
        this.timeSeconds += 1;
      }, 1000);
    },
    stop() {
      this.isActive = false;
      clearInterval(this.interval);
      this.$emit('endTask', this.timeSeconds)
      this.timeSeconds = 0;
    }
  },
  data() {
    return {
      timeSeconds: 0,
      interval: 0,
      isActive: false
    };
  },
  emits: ['endTask']
})
</script>