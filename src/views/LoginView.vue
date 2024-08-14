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
      <h1>Acesse sua conta</h1>
      <div class="input-group">
        <input required="" type="text" name="text" class="input" v-model="username" />
        <label class="user-label">Username or Email</label>
      </div>
      <div class="input-group">
        <input required="" type="password" name="text" class="input" v-model="password" />
        <label class="password-label">Password</label>
      </div>
      <button class="button-style">Login</button>
      <router-link to="/register"><span>Não tem uma conta? Cadastre-se</span></router-link>
    </form>
  </div>
</template>

<style scoped>
.login-container {
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
  gap: 1rem;
}

.input-group {
  position: relative;
}

.input {
  border: solid 1.5px #9e9e9e;
  border-radius: 1rem;
  background: none;
  padding: 1rem;
  font-size: 1rem;
  color: #1a1717;
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.user-label {
  position: absolute;
  left: 15px;
  color: #e8e8e8;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.password-label {
  position: absolute;
  left: 15px;
  color: #e8e8e8;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.input:focus,
input:valid {
  outline: none;
  border: 1.5px solid #253852;
}

.input:focus ~ label,
input:valid ~ label {
  transform: translateY(-50%) scale(0.8);
  background-color: #f7f2f2;
  padding: 0 0.2em;
  color: #000000;
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
  color: #0d0d0d;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
