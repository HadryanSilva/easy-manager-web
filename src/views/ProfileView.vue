<script setup>
import { useAuthStore } from '@/stores/auth'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore()
const toast = useToast()

const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

const editUser = async () => {
  loading.value = true
  const userData = {
    username: username.value || authStore.getUser.username,
    email: email.value || authStore.getUser.email,
    password: password.value || null
  }
  const success = await authStore.editUser(userData)
  if (success) {
    toast.add({
      severity: 'success',
      summary: 'Usuário Atualizado',
      detail: 'Seus dados foram atualizados com sucesso',
      closable: false,
      life: 5000
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Erro no Login',
      detail: 'Verifique suas credenciais',
      closable: false,
      life: 5000
    })
  }
  loading.value = false
}
</script>

<template>
  <main>
    <div class="profile-container">
      <div class="fieldset">
        <label for="username">Username</label>
        <Inplace>
          <template #display>
            {{ authStore.getUser.username || 'Click to Edit' }}
          </template>
          <template #content="{ closeCallback }">
            <span class="inline-flex items-center gap-2">
              <InputText v-model="username" autofocus />
              <Button icon="pi pi-times" text severity="danger" @click="closeCallback" />
            </span>
          </template>
        </Inplace>
      </div>
      <div class="fieldset">
        <label for="email">Email</label>
        <Inplace>
          <template #display>
            {{ authStore.getUser.email || 'Click to Edit' }}
          </template>
          <template #content="{ closeCallback }">
            <span class="inline-flex items-center gap-2">
              <InputText v-model="email" autofocus />
              <Button icon="pi pi-times" text severity="danger" @click="closeCallback" />
            </span>
          </template>
        </Inplace>
      </div>
      <div class="fieldset">
        <label for="password">Senha</label>
        <Inplace>
          <template #display>
            {{ 'Click to Edit' }}
          </template>
          <template #content="{ closeCallback }">
            <span class="inline-flex items-center gap-2">
              <InputText type="password" v-model="password" autofocus />
              <Button icon="pi pi-times" text severity="danger" @click="closeCallback" />
            </span>
          </template>
        </Inplace>
      </div>
      <div class="footer">
        <Button
          type="button"
          label="Salvar"
          icon="pi pi-save"
          :loading="loading"
          @click="editUser"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.profile-container {
  width: 50rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 14px 10px rgba(129, 128, 128, 0.1);
  border-radius: 10px;
}

.fieldset {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
