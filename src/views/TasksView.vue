<template>
  <FormTask @onSaveTask="addTask" />
  <div class="task-list">
    <div class="search field">
      <p class="control has-icons-left ">
        <input class="input" name="searchTask" v-model="filter" type="text" placeholder="Pesquise sua tarefa...">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <NewTask v-for="(task, index) in tasks" :key="index" :task=task @onClickTask="openTask" />
    <EmptyTask v-if="onEmptyList">
      Você não está muito produtivo hoje! 😿
    </EmptyTask>
    <CModal :show-modal="taskSelected != null">
      <template v-slot:header>
        <p class="modal-card-title">Editando uma tarefa...</p>
        <button class="delete" aria-label="close" @click="closeModel()"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="taskName" class="label">Descrição</label>
          <input type="text" placeholder="Dê um nome a tarefa..." v-model="taskSelected.description" class="input"
            id="taskName">
        </div>
      </template>
      <template v-slot:footer >
        <button @click="editTask" class="button is-success">Salvar Mudanças</button>
        <button @click="closeModel()" class="button">Cancelar</button>
      </template>
    </CModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watchEffect, ref } from 'vue';
import FormTask from '../components/FormTask.vue';
import NewTask from '../components/NewTask.vue';
import CModal from '../components/CModal.vue';
import ITask from '../interfaces/ITask';
import EmptyTask from '../components/EmptyTask.vue';
import { useStore } from '@/store';
import { GET_TASKS, GET_PROJECTS, UPDATE_TASK, REGISTER_TASK } from '@/store/actionsType';

export default defineComponent({
  name: 'TasksView',
  components: { FormTask, NewTask, EmptyTask, CModal },
  setup() {

    const store = useStore();
    const tasks = computed(() => store.state.tasks)
    const onEmptyList = computed(() => tasks.value.length === 0)
    const taskSelected = ref(null as ITask | null)
    const filter = ref("")

    store.dispatch(GET_TASKS)
    store.dispatch(GET_PROJECTS)

    const addTask = (task: ITask) => {
      store.dispatch(REGISTER_TASK, task);
    }
    const openTask = (task: ITask) => {
      taskSelected.value = task
    }
    const closeModel = () => {
      taskSelected.value = null;
    }
    const editTask = () => {
      store.dispatch(UPDATE_TASK, taskSelected.value)
        .then(() => closeModel())
    }

    watchEffect(() => {
      store.dispatch(GET_TASKS, filter.value)
    })

    return {
      editTask,
      addTask,
      openTask,
      closeModel,
      onEmptyList,
      tasks,
      taskSelected,
      filter
    };
  }
});
</script>

<style scoped>
.task-list {
  padding: 0 1.25rem;
}

.search{
  margin-bottom: 1.25rem;
}
</style>