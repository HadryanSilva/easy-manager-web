<script setup>
import router from '@/router'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'

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
    // Mostrar mensagem de erro
  }
}
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <h1>Login</h1>
      <input type="text" placeholder="Username or Email" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <button>Login</button>
      <router-link to="/register"><span>Don't have an account? Register</span></router-link>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  gap: 1rem;
}

input {
  width: 250px;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

button {
  width: 250px;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

span {
  cursor: pointer;
  color: #007bff;
  text-decoration: none;
}
</style>
