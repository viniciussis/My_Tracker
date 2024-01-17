<template>
  <EmptyTask>
    <div class="box has-text-weight-bold">
      <div class="columns">
        <div class="column is-7">
          {{ task.description || 'Tarefa sem descrição' }}
        </div>
        <div class="column">
          <StopWatch :time-seconds=task.timeInSeconds />
        </div>
      </div>
    </div>
  </EmptyTask>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import StopWatch from './StopWatch.vue';
import ITask from '@/interfaces/ITask';
import EmptyTask from './EmptyTask.vue';

export default defineComponent({
  name: 'NewTask',
  components: { StopWatch, EmptyTask },
  props: {
    task: {
      type: Object as PropType<ITask>,
      required: true
    }
  }
})
</script>

<style scoped>
.box {
  background-color: #FAF0CA;
  margin: 1rem;
}
</style>