<script setup>
import { useAuthStore } from '../stores/auth'
import router from '@/router'
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Welcome to the Home page</p>
    <button @click="logout">Logout</button>
  </div>
</template>
