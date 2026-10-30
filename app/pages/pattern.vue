<script setup lang="ts">
useHead({ title: 'Pattern' })

type Field = 'display' | 'max' | 'rounds'

interface InputDef {
  key: Field
  label: string
  min: number
  max: number
}

// Same prompts as the C# program
const inputs: InputDef[] = [
  { key: 'display', label: 'Enter your display number', min: 0, max: 999 },
  { key: 'max', label: 'Enter your maximum number', min: 1, max: 50 },
  { key: 'rounds', label: 'Enter your round display number', min: 1, max: 20 }
]

const values = reactive<Record<Field, string>>({ display: '', max: '', rounds: '' })
const errors = reactive<Record<Field, string>>({ display: '', max: '', rounds: '' })

inputs.forEach(({ key }) => {
  watch(() => values[key], () => { errors[key] = '' }, { flush: 'sync' })
})

// Keep only digits while typing / pasting
function onInput(key: Field, e: Event) {
  const el = e.target as HTMLInputElement
  const clean = el.value.replace(/\D/g, '')
  const stripped = clean !== el.value
  el.value = clean
  values[key] = clean
  if (stripped) errors[key] = 'Numbers only (0-9)'
}

const result = ref<{ numbers: number[], lines: string[] } | null>(null)

function parseField(def: InputDef): number | null {
  const raw = values[def.key].trim()
  if (!raw) {
    errors[def.key] = 'Please enter a number'
    return null
  }
  if (!/^\d+$/.test(raw)) {
    errors[def.key] = 'Please enter a whole number'
    return null
  }
  const n = Number(raw)
  if (n < def.min || n > def.max) {
    errors[def.key] = `Number must be between ${def.min} and ${def.max}`
    return null
  }
  errors[def.key] = ''
  return n
}

function onSubmit() {
  const parsed = inputs.map(parseField)
  if (parsed.some((n) => n === null)) {
    result.value = null
    return
  }
  const [display, max, rounds] = parsed as number[]
  result.value = {
    numbers: [display!, max!, rounds!],
    lines: buildPattern(display!, max!, rounds!)
  }
}
</script>

<template>
  <div class="page">
    <div class="layout">
      <div class="container">
        <div class="title">
          <span class="divider">Pattern</span>
          <small>Enter 3 numbers to draw the pattern.</small>
        </div>

        <form novalidate @submit.prevent="onSubmit">
          <div v-for="def in inputs" :key="def.key" class="field">
            <label :for="def.key">{{ def.label }}</label>
            <input :id="def.key" :value="values[def.key]" type="text" inputmode="numeric"
              pattern="[0-9]*" :maxlength="String(def.max).length" autocomplete="off"
              :placeholder="`${def.min} - ${def.max}`" :class="{ invalid: errors[def.key] }"
              @input="onInput(def.key, $event)">
            <span class="error">{{ errors[def.key] }}</span>
          </div>
          <button type="submit" class="btn">Display</button>
        </form>
      </div>

      <div class="container result">
        <div class="title">
          <span class="divider">Output</span>
          <small v-if="result">Your numbers are: {{ result.numbers.join(', ') }}</small>
          <small v-else>The pattern will show here.</small>
        </div>
        <pre v-if="result" class="output">{{ result.lines.join('\n') }}</pre>
        <div v-else class="output empty">No output yet</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.output {
  max-height: 420px;
  overflow: auto;
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  font-family: Consolas, 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
}

.output.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  font-family: inherit;
  color: #aaa;
}
</style>
