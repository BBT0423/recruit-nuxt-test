<script setup lang="ts">
defineProps<{
  title: string
  message?: string
}>()

const open = defineModel<boolean>('open', { default: false })
const okButton = ref<HTMLButtonElement | null>(null)

function close() {
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (open.value && e.key === 'Escape') close()
}

watch(open, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    okButton.value?.focus()
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="popup" :class="{ open }" role="dialog" aria-modal="true" aria-labelledby="popupTitle"
    @click.self="close">
    <div class="popup-box">
      <div class="popup-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
          stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 id="popupTitle">{{ title }}</h2>
      <div class="popup-message">
        <slot>{{ message }}</slot>
      </div>
      <button ref="okButton" type="button" class="btn" @click="close">OK</button>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}

.popup.open {
  opacity: 1;
  visibility: visible;
}

.popup-box {
  width: 100%;
  max-width: 320px;
  padding: 28px 24px 24px;
  background: #fff;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transform: scale(0.9);
  transition: transform 0.2s;
}

.popup.open .popup-box {
  transform: scale(1);
}

.popup-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 14px;
  border-radius: 50%;
  background: #5cb85c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-icon svg {
  width: 28px;
  height: 28px;
}

.popup-box h2 {
  font-size: 22px;
  font-weight: 500;
  color: #444;
  margin-bottom: 6px;
}

.popup-message {
  font-size: 14px;
  line-height: 1.5;
  color: #888;
  margin-bottom: 20px;
}

.popup-box .btn {
  margin-top: 0;
}
</style>
