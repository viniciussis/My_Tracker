<template>
  <form @submit.prevent="onSave">
    <div class="field">
      <label for="projectName" class="label">Nome do Projeto</label>
      <input type="text" placeholder="Dê um nome ao projeto" class="input" id="projectName" v-model="projectName">
    </div>
    <div class="field">
      <TimerButton icon="fas fa-check " button-name="Salvar" button-type="submit" />
    </div>
  </form>
</template>

<script lang="ts">
import TimerButton from '@/components/TimerButton.vue';
import { useStore } from '@/store';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ProjectsForm',
  data() {
    return {
      projectName: ""
    };
  },
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(proj => proj.id == this.id);
      this.projectName = project?.name || ""
    }
  },
  methods: {
    onSave() {
      if (this.id) {
        this.store.commit('EDIT_PROJECT', {
          id: this.id,
          name: this.projectName
        })
      }
      else {
        this.store.commit('ADD_PROJECT', this.projectName);
      }
      this.projectName = '';
      this.$router.push('/projects')
    }
  },
  setup() {
    const store = useStore();
    return {
      store
    };
  },
  components: { TimerButton }
})
</script>
<style scoped> .title,
 .label {
   color: inherit
 }
</style>