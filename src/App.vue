<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeOn }">
    <div class="column is-one-quarter">
      <SideBar @onChangeTheme="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <RouterView />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: { SideBar, RouterView },
  data() {
    return {
      darkModeOn: false
    }
  },
  methods: {
    changeTheme(darkModeOn: boolean) {
      this.darkModeOn = darkModeOn
    }
  }
});
</script>

<style>
@import '~@fortawesome/fontawesome-free/css/all.css';

main {
  --bg-primary: white;
  --text-primary: black;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: white;
}

.content {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
</style>
