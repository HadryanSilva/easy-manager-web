<script setup>
import router from '@/router'
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const email = ref('')
const authStore = useAuthStore()

const register = async () => {
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
    // Mostrar mensagem de erro
  }
}
</script>

<template>
  <div class="register-container">
    <form @submit.prevent="register">
      <h1>Register</h1>
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="email" placeholder="Email" v-model="email" />
      <button>Register</button>
      <router-link to="/login"><span>Already have an account? Login</span></router-link>
    </form>
  </div>
</template>

<style scoped>
.register-container {
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
