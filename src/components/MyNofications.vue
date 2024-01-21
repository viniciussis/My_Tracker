<template>
  <div class="notifications">
    <article class="message" :class="context[notification.type]" v-for="notification in notifications"
      :key="notification.id">
      <div class="message-header">{{ notification.title }}</div>
      <div class="message-body">{{ notification.text }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { TypeNotification } from '@/interfaces/INotification';
import { useStore } from '@/store';
import { computed, ref, defineComponent } from 'vue'

export default defineComponent({
  name: "MyNotifications",
  setup() {
    
    const store = useStore()
    const notifications = computed(() => store.state.notifications)
    const context = ref({
      [TypeNotification.SUCCESS]: "is-success",
      [TypeNotification.FAIL]: "is-danger",
      [TypeNotification.ATTENTION]: "is-warning",
    })

    return {
      notifications,
      context
    }
  }
})
</script>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  z-index: 1;
}
</style>