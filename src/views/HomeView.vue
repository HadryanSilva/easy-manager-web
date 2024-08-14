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
  <div v-if="authStore.isAuthenticated">
    <nav>
      <h1>Home</h1>
      <div>
        <p>{{ authStore.user }}</p>
      </div>
    </nav>
    <main>
      <h1>Welcome to the Home page</h1>
    </main>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    {{ router.push('/login') }}
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #9daa9b;
  width: 100%;
  height: 15vh;
  margin: 0 auto;
  padding: 0 2rem;
}

.profile-select {
  padding: 0.5rem;
  width: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #000;
  border-radius: 8px;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
}
</style>
