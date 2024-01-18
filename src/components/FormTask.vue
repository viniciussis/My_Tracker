<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" v-model="description" placeholder="Qual tarefa você deseja iniciar?" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProject">
            <option hidden value="">Selecione o projeto</option>
            <option :value="project.id" v-for="project in projects" :key="project.id">
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <TimeController @end-task="endTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import TimeController from './TimeController.vue';
import { key } from '@/store';
import { TypeNotification } from '@/interfaces/INotification';
import { SHOW_NOTIFICATION } from '@/store/mutationsType';

export default defineComponent({
  name: 'FormTask',
  components: { TimeController },
  data() {
    return {
      description: '',
      idProject: '',
    }
  },
  methods: {
    endTask(pastTime: number): void {
      const project = this.projects.find((proj) => proj.id == this.idProject)
      if (!project) {
        this.store.commit(SHOW_NOTIFICATION, {
          title: 'Falha!',
          text: 'Falha ao finalizar tarefa pois não há nenhum projeto vinculado!',
          type: TypeNotification.FAIL
        })
        return
      }
      this.$emit('onSaveTask', {
        timeInSeconds: pastTime,
        description: this.description,
        project: this.projects.find(project => this.idProject == project.id)
      })
    }
  },
  setup() {
    const store = useStore(key)
    return {
      projects: computed(() => store.state.projects),
      store
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
