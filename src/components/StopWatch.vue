<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StopWatch',
  computed: {
        pastTime(): string {
            return new Date(this.timeSeconds * 1000).toISOString().substring(11, 19);
        }
    },
  props:{
    timeSeconds: {
      type: Number,
      default: 0
    }
  }
})
</script>

<template>
  <section>
    <strong>
      {{ pastTime }}
    </strong>
  </section>
</template>

<style scoped></style>