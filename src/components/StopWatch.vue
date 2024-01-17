<template>
  <section >
    <strong class="stopwatch">
      {{ pastTime }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StopWatch',
  computed: {
    pastTime(): string {
      return new Date(this.timeSeconds * 1000).toISOString().substring(11, 19);
    }
  },
  props: {
    timeSeconds: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style>
.stopwatch{
  color: inherit;
}
</style>