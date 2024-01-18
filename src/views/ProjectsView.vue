<template>
  <div class="projects">
    <h1 class="title">Projetos</h1>
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectsList',
})
</script>

<style scoped> .projects {
   padding: 2rem;
 }
</style>