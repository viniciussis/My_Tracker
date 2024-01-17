<template>
  <div class="column">
    <div class="is-flex is-align-items-center is-justify-content-space-between">
      <StopWatch :time-seconds="timeSeconds" />
      <button class="button" @click="start" :disabled="isActive">
        <span class="icon">
          <i class="fas fa-play"></i>
        </span>
        <span class="button-tag">play</span>
      </button>
      <button class="button" @click="stop" :disabled="!isActive">
        <span class="icon">
          <i class="fas fa-stop"></i>
        </span>
        <span class='button-tag'>stop</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StopWatch from './StopWatch.vue';

export default defineComponent({
  components: { StopWatch },
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

<style scoped>
.button-tag {
  font-variant: small-caps;
  font-weight: 700;
}
</style>