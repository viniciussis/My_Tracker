<template>
  <header>
    <h1>
      <img class="logo" src="../assets/logo01.jpeg" alt="logo do tracker">
    </h1>
    <TimerButton :onclick="changeTheme" :button-name="buttonName" :icon="iconName" />
    <nav class="panel mt-5">
      <ul>
        <li>
          <RouterLink class="link button" to="/">
            <i class="fas fa-tasks"></i>
            Tarefas
          </RouterLink>
        </li>
        <li>
          <RouterLink class="link button" to="/projects">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimerButton from './TimerButton.vue';

export default defineComponent({
  name: 'SideBar',
  data() {
    return {
      darkModeOn: false,
    };
  },
  computed: {
    buttonName() {
      if (this.darkModeOn) {
        return 'Desativar Modo Escuro';
      }
      return 'Desativar Modo Claro';
    },
    iconName() {
      if (this.darkModeOn) {
        return 'fas fa-moon'
      }
      return 'fas fa-sun'
    }
  },
  methods: {
    changeTheme(): void {
      this.darkModeOn = !this.darkModeOn;
      this.$emit('onChangeTheme', this.darkModeOn);
    }
  },
  emits: ['onChangeTheme'],
  components: { TimerButton }
})
</script>

<style scoped>
.logo {
  border-radius: 1rem;
}

header {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background: #0d3b66;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  height: 100vh;
}

.panel li {
  margin: 0.5rem 0;
}

.link {
  font-variant: small-caps;
  font-weight: 700;
  padding: 1rem;
  color: black;
  gap: 0.5rem;
  background-color: white;
}

.link:hover {
  color: black;
}

.link.router-link-active {
  color: black;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>