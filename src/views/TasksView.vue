<template>
  <FormTask @onSaveTask="addTask" />
  <div class="task-list">
    <NewTask v-for="(task, index) in tasks" :key="index" :task=task @onClickTask="showModel(task)" />
    <EmptyTask v-if="onEmptyList">
      Você não está muito produtivo hoje! 😿
    </EmptyTask>
    <div class="modal" :class="{ 'is-active': taskSelected }" v-if="taskSelected">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa...</p>
          <button class="delete" aria-label="close" @click="showModel(null)"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="taskName" class="label">Descrição</label>
            <input type="text" placeholder="Dê um nome a tarefa..." v-model="taskSelected.description" class="input" id="taskName">
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="editTask" class="button is-success">Salvar Mudanças</button>
          <button @click="showModel(null)" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FormTask from '../components/FormTask.vue';
import NewTask from '../components/NewTask.vue';
import ITask from '../interfaces/ITask';
import EmptyTask from '../components/EmptyTask.vue';
import { useStore } from '@/store';
import { GET_TASKS, GET_PROJECTS, UPDATE_TASK, REGISTER_TASK } from '@/store/actionsType';

export default defineComponent({
  name: 'TasksView',
  components: { FormTask, NewTask, EmptyTask },
  data() {
    return {
      taskSelected: null as ITask | null
    }
  },
  computed: {
    onEmptyList(): boolean {
      return this.tasks.length === 0
    }
  },
  methods: {
    addTask(task: ITask): void {
      this.store.dispatch(REGISTER_TASK, task);
    },
    showModel(task: ITask | null): void {
      this.taskSelected = task;
    },
    editTask(): void {
      this.store.dispatch(UPDATE_TASK, this.taskSelected)
        .then(() => this.showModel(null))
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_TASKS)
    store.dispatch(GET_PROJECTS)
    return {
      tasks: computed(() => store.state.task.tasks),
      store
    };
  }
});
</script>

<style scoped>
.task-list {
  padding: 1.25rem;
}
</style>