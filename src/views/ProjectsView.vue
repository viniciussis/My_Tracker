<template>
  <section class="projects">
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="onSave">
      <div class="field">
        <label for="projectName" class="label">Nome do Projeto</label>
        <input type="text" placeholder="Dê um nome ao projeto" class="input" id="projectName" v-model="projectName">
      </div>
      <div class="field">
        <TimerButton icon="fas fa-check " button-name="Salvar" button-type="submit"/>
      </div>
    </form>
    <table class="table is-full-width">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <th>{{ project.id }}</th>
          <th>{{ project.name }}</th>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import TimerButton from '@/components/TimerButton.vue';
import IProject from '@/interfaces/IProject';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ProjectsView',
    data() {
        return {
            projectName: '',
            projects: [] as IProject[]
        };
    },
    methods: {
        onSave() {
            const project: IProject = {
                name: this.projectName,
                id: new Date().toISOString()
            };
            this.projects.push(project);
            this.projectName = '';
        }
    },
    components: { TimerButton }
})
</script>
<style scoped> 
.projects{
  padding: 2rem;
}
.title, .label{
  color: inherit
}
</style>