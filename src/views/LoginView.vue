<script setup>
import router from '@/router'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const username = ref('')
const password = ref('')
const authStore = useAuthStore()

const login = async () => {
  const auth = {
    username: username.value,
    password: password.value
  }
  console.log(auth)
  const success = await authStore.login(auth)
  if (success) {
    router.push('/')
  } else {
    toast.add({
      severity: 'error',
      summary: 'Erro no Login',
      detail: 'Verifique suas credenciais',
      closable: false,
      life: 5000
    })
  }
}
</script>

<template>
  <main>
    <div class="login-container">
      <form @submit.prevent="login">
        <h1>Acesse sua conta</h1>
        <FloatLabel>
          <InputText class="input" id="username" v-model="username" />
          <label for="username">Username</label>
        </FloatLabel>
        <FloatLabel>
          <InputText type="password" class="input" id="password" v-model="password" />
          <label for="password">Password</label>
        </FloatLabel>
        <Button type="submit" label="Login" />
        <router-link to="/register"><span>Não tem uma conta? Cadastre-se</span></router-link>
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

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  width: 600px;
  margin: auto;
  box-shadow: 0px 0px 14px 10px rgba(125, 118, 118, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  gap: 2rem;
}

button {
  cursor: pointer;
  margin-top: 1rem;
}

.button-style {
  padding: 15px 30px;
  border: 2px solid #2c2c2c;
  background-color: #1a1a1a;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.4s ease;
  outline: none;
  position: relative;
  overflow: hidden;
  font-weight: bold;
}

.button-style::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
}

.button-style:hover::after {
  transform: scale(4);
}

.button-style:hover {
  border-color: #666666;
  background: #292929;
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
