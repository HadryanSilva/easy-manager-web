<script setup>
import router from '@/router'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const username = ref('')
const password = ref('')
const email = ref('')
const loading = ref(false)
const authStore = useAuthStore()

const register = async () => {
  loading.value = true
  const userData = {
    username: username.value,
    password: password.value,
    email: email.value
  }
  console.log(userData)
  const success = await authStore.register(userData)
  if (success) {
    router.push('/login')
  } else {
    toast.add({
      severity: 'error',
      summary: 'Erro ao Registrar',
      detail: 'Verifique os dados informados',
      closable: false,
      life: 5000
    })
    return false
  }
  loading.value = false
}
</script>

<template>
  <main>
    <div class="register-container">
      <form @submit.prevent="register">
        <h1>Crie sua conta</h1>
        <FloatLabel>
          <InputText class="input" id="username" v-model="username" />
          <label for="username">Username</label>
        </FloatLabel>
        <FloatLabel>
          <InputText type="password" class="input" id="password" v-model="password" />
          <label for="password">Password</label>
        </FloatLabel>
        <FloatLabel>
          <InputText type="email" class="input" id="email" v-model="email" />
          <label for="email">Email</label>
        </FloatLabel>
        <Button type="submit" label="Registrar-se" :loading="loading" />
        <router-link to="/login"><span>Já tem uma conta? Login</span></router-link>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  width: 600px;
  margin: auto;
  box-shadow: 0px 0px 14px 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  gap: 2rem;
}

a {
  font-size: small;
  cursor: pointer;
  color: #b5e4a6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
