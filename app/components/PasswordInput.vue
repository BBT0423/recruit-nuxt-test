<script setup lang="ts">
defineProps<{
  placeholder?: string
  name?: string
  invalid?: boolean
}>()

const model = defineModel<string>({ default: '' })
const show = ref(false)
</script>

<template>
  <div class="password-wrap">
    <input
      v-model="model"
      :type="show ? 'text' : 'password'"
      :name="name"
      :placeholder="placeholder"
      :class="{ invalid }"
    >
    <button
      type="button"
      class="toggle-eye"
      :aria-label="show ? 'Hide password' : 'Show password'"
      @click="show = !show"
    >
      <!-- eye-off (password visible) -->
      <svg v-if="show" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
      <!-- eye (password hidden) -->
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.password-wrap {
  position: relative;
}

.password-wrap input {
  padding-right: 40px;
}

.toggle-eye {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: #999;
  cursor: pointer;
}

.toggle-eye:hover,
.toggle-eye:focus-visible {
  color: #4cae4c;
  outline: none;
}

.toggle-eye svg {
  width: 18px;
  height: 18px;
}
</style>
