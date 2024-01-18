<template>
  <section>
    <router-link to="/projects/new">
      <TimerButton button-name="Novo Projeto" icon="fas fa-plus" />
    </router-link>
    <table class="table is-full-width">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import TimerButton from '@/components/TimerButton.vue';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'ProjectsList',
  components: { TimerButton },
  setup() {
    const store = useStore()
    return {
      projects: computed(() => store.state.projects)
    }
  }
})
</script>
