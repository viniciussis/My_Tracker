<template>
  <EmptyTask>
    <div class="columns task" @click="taskSelected">
      <div class="column is-7">
        {{ task.description || 'Tarefa sem descrição' }}
      </div>
      <div class="column">
        {{ task.project.name }}
      </div>
      <div class="column">
        <StopWatch :time-seconds=task.timeInSeconds />
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
  },
  methods: {
    taskSelected(): void {
      this.$emit('onClickTask', this.task)
    }
  },
  emits: ['onClickTask']
})
</script>

<style scoped>
.task{
  cursor: pointer;
}
</style>