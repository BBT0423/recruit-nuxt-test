<script setup lang="ts">
useHead({ title: 'Register' })

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

type Field = keyof RegisterForm

const form = reactive<RegisterForm>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive<Record<Field, string>>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const fields = Object.keys(form) as Field[]

// Clear a field's error as soon as the user changes it
fields.forEach((key) => {
  watch(() => form[key], () => { errors[key] = '' }, { flush: 'sync' })
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  const email = form.email.trim()

  errors.firstName = form.firstName.trim() ? '' : 'Please enter your first name'
  errors.lastName = form.lastName.trim() ? '' : 'Please enter your last name'
  errors.email = !email
    ? 'Please enter your email'
    : EMAIL_RE.test(email) ? '' : 'Email is not valid'
  errors.password = !form.password
    ? 'Please enter a password'
    : form.password.length >= 6 ? '' : 'Password must be at least 6 characters'
  errors.confirmPassword = !form.confirmPassword
    ? 'Please confirm your password'
    : form.confirmPassword === form.password ? '' : 'Passwords do not match'

  return fields.every((key) => !errors[key])
}

// Success popup
const popupOpen = ref(false)

function onSubmit() {
  if (!validate()) return
  // Keep the data in the form, just show the popup
  popupOpen.value = true
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="title">
        <span class="divider">Register</span>
        <small>Create your account. It's free and only takes a minute.</small>
      </div>

      <form novalidate @submit.prevent="onSubmit">
        <div class="row">
          <div class="field">
            <input v-model="form.firstName" type="text" name="firstName" placeholder="First Name"
              :class="{ invalid: errors.firstName }">
            <span class="error">{{ errors.firstName }}</span>
          </div>
          <div class="field">
            <input v-model="form.lastName" type="text" name="lastName" placeholder="Last Name"
              :class="{ invalid: errors.lastName }">
            <span class="error">{{ errors.lastName }}</span>
          </div>
        </div>
        <div class="field">
          <input v-model="form.email" type="email" name="email" placeholder="Email"
            :class="{ invalid: errors.email }">
          <span class="error">{{ errors.email }}</span>
        </div>
        <div class="field">
          <PasswordInput v-model="form.password" name="password" placeholder="Password"
            :invalid="!!errors.password" />
          <span class="error">{{ errors.password }}</span>
        </div>
        <div class="field">
          <PasswordInput v-model="form.confirmPassword" name="confirmPassword" placeholder="Confirm Password"
            :invalid="!!errors.confirmPassword" />
          <span class="error">{{ errors.confirmPassword }}</span>
        </div>
        <button type="submit" class="btn">Register Now</button>
      </form>
    </div>

    <SuccessPopup v-model:open="popupOpen" title="Register Success!"
      :message="`Welcome, ${form.firstName.trim()}! Your account has been created.`" />
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

@media (max-width: 480px) {
  .row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
