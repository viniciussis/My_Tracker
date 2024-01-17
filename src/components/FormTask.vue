<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" v-model="description" placeholder="Qual tarefa você deseja iniciar?" />
      </div>
      <TimeController @end-task="endTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimeController from './TimeController.vue';

export default defineComponent({
  name: 'FormTask',
  components: { TimeController },
  data() {
    return {
      description: ''
    }
  },
  methods: {
    endTask(pastTime: number): void {
      this.description = ''
    }
  }
})
</script>

<style scoped></style>
