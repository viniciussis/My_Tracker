<template>
  <button :type="buttonType" class="button">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span class="button-tag">{{ buttonName }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TimerButton',
  props: {
    icon: {
      type: String,
      required: true
    },
    buttonName: {
      type: String, 
      required: true
    },
    buttonType: {
      type: String as () => "button" | "submit" | "reset",
      default: 'button'
    }
  }
})
</script>

<style scoped>
.button-tag {
  font-variant: small-caps;
  font-weight: 700;
}
</style>