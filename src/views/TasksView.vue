<template>
  <FormTask @onSaveTask="saveTask" />
  <div class="task-list">
    <NewTask v-for="(task, index) in tasks" :key="index" :task=task />
    <EmptyTask v-if="onEmptyList">
      Você não está muito produtivo hoje! 😿
    </EmptyTask>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormTask from '../components/FormTask.vue';
import NewTask from '../components/NewTask.vue';
import ITask from '../interfaces/ITask';
import EmptyTask from '../components/EmptyTask.vue';

export default defineComponent({
  name: 'TasksView',
  components: { FormTask, NewTask, EmptyTask },
  data() {
    return {
      tasks: [] as ITask[],
    }
  },
  computed: {
    onEmptyList(): boolean {
      return this.tasks.length === 0
    }
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task)
    }
  }
});
</script>

<style scoped>
.task-list {
  padding: 1.25rem;
}
</style>