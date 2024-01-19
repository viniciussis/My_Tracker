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
import { TypeNotification } from '@/interfaces/INotification';
import { useStore } from '@/store';
import { defineComponent } from 'vue';
import useNotifier from "@/hooks/notify"
import { REGISTER_PROJECT, UPDATE_PROJECT } from '@/store/actionsType';
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
        this.store.dispatch(UPDATE_PROJECT, {
          id: this.id,
          name: this.projectName
        }).then(() => this.onSucess());
      }
      else {
        this.store
          .dispatch(REGISTER_PROJECT, this.projectName)
          .then(() => this.onSucess())
      }
    },
    onSucess() {
      this.projectName = '';
      this.notify(TypeNotification.SUCCESS, "Salvo com Sucesso!", "Prontinho, seu novo projeto foi salvo com sucesso!")
      this.$router.push('/projects')

    }
  },
  setup() {
    const store = useStore()
    const { notify } = useNotifier()
    return {
      notify,
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