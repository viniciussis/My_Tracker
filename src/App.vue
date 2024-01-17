<template>
  <main class="columns is-gapless is-multiline" :class="{'dark-mode': darkModeOn}" >
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <FormTask @onSaveTask="saveTask" />
      <div class="task-list">
        <NewTask v-for="(task, index) in tasks" :key="index" :task=task />
        <EmptyTask v-if="onEmptyList">
          Você não está muito produtivo hoje! 😿
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
      tasks: [] as ITask[],
      darkModeOn: false
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
    },
    changeTheme(darkModeOn: boolean){
      this.darkModeOn = darkModeOn
    }
  }
});
</script>

<style>
@import '~@fortawesome/fontawesome-free/css/all.css';
.task-list {
  padding: 1.25rem;
}

main {
  --bg-primary: white;
  --text-primary: black;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: white;
}

.content {
  background-color: var(--bg-primary);
}
</style>
