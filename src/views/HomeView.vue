<script setup>
import Menubar from 'primevue/menubar'
import { useAuthStore } from '../stores/auth'
import router from '@/router'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const items = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-chart-bar',
    command: () => router.push('/dashboard')
  },
  {
    label: 'Estoque',
    icon: 'pi pi-warehouse',
    command: () => router.push('/stock')
  },
  {
    label: 'Produto',
    icon: 'pi pi-tags',
    command: () => router.push('/product')
  },
  {
    label: 'Usuários',
    icon: 'pi pi-users',
    command: () => router.push('/users')
  },
  {
    label: authStore.getUser.username || '',
    icon: 'pi pi-user',
    items: [
      {
        label: 'Perfil',
        icon: 'pi pi-user-edit',
        command: () => router.push('/profile')
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog'
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: logout
      }
    ]
  }
])
</script>

<template>
  <div class="main-container" v-if="authStore.isAuthenticated">
    <nav>
      <div class="logo">
        <h1>Easy Manager</h1>
      </div>
      <Menubar :model="items" />
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
  <div v-else>
    {{ router.push('/login') }}
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: 2px solid #2c2c2c;
  border-radius: 5px;
  font-weight: bold;
  padding: 15px;
  color: #fff;
}
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  width: 100%;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #9daa9b;
  width: 100%;
  height: 15vh;
  margin: 0 auto;
  padding: 0 5rem;
}
</style>
