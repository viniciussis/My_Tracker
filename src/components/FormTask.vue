<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" name="description" class="input" v-model="description" placeholder="Qual tarefa você deseja iniciar?" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select name="selectProjects" v-model="idProject">
            <option hidden value="">Selecione o projeto</option>
            <option :value="project.id" v-for="project in projects" :key="project.id">
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <TimeController @end-task="saveTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import TimeController from './TimeController.vue';
import { key } from '@/store';
import { TypeNotification } from '@/interfaces/INotification';
import { SHOW_NOTIFICATION } from '@/store/mutationsType';

export default defineComponent({
  name: 'FormTask',
  components: { TimeController },
  setup(props, { emit }) {

    const store = useStore(key)
    const projects = computed(() => store.state.projects);
    const idProject = ref('')
    const description = ref('')

    const saveTask = (pastTime: number) => {
      const project = projects.value.find(proj => proj.id == idProject.value)
      if (!project) {
        store.commit(SHOW_NOTIFICATION, {
          title: 'Falha!',
          text: 'Falha ao finalizar tarefa pois não há nenhum projeto vinculado!',
          type: TypeNotification.FAIL
        })
        return
      }
      emit('onSaveTask', {
        timeInSeconds: pastTime,
        description: description.value,
        project: project
      })
    }

    return {
      saveTask,
      projects,
      idProject,
      description
    }
  },
  emits: ['onSaveTask']
})
</script>

<style>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>
