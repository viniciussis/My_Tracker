<template>
  <div class="box has-text-weight-bold">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyTask'
})
</script>

<style scoped>
.box {
  background-color: #FAF0CA;
  margin: 1rem;
}
</style>