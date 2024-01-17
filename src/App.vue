<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <FormTask @onSaveTask="saveTask" />
      <div class="task-list">
        <NewTask v-for="(task, index) in tasks" :key="index" :task=task />
        <EmptyTask v-if="onEmptyList">
          Você vão está muito produtivo hoje! 😿
        </EmptyTask>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import FormTask from './components/FormTask.vue';
import NewTask from './components/NewTask.vue';
import ITask from './interfaces/ITask';
import EmptyTask from './components/EmptyTask.vue';

export default defineComponent({
  name: 'App',
  components: { SideBar, FormTask, NewTask, EmptyTask },
  data() {
    return {
      tasks: [] as ITask[]
    }
  },
  computed: {
    onEmptyList(): boolean{
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

<style>
@import '~@fortawesome/fontawesome-free/css/all.css';
</style>
