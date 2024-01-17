<template>
  <header>
    <h1>
      <img class="logo" src="../assets/logo01.jpeg" alt="logo do tracker">
    </h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar'
})
</script>

<style scoped>
.logo{
  border-radius: 1rem;
}
header {
  padding: 1rem;
  display: flex;
  justify-content: center;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>