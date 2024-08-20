<script setup>
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import productService from '@/services/productService'

const addVisibleDialog = ref(false)
const selectedProduct = ref(null)
const loadingProducts = ref(false)
const searchValue = ref('')
const toast = useToast()
const confirm = useConfirm()
const products = ref([])

const categories = ref(['Category 1', 'Category 2', 'Category 3', 'Category 4'])
const product = ref({})

const hasSelectedProducts = computed(() => {
  return selectedProduct.value && selectedProduct.value.length > 0
})

const getSeverity = (product) => {
  switch (product.stockStatus) {
    case 'Em Estoque':
      return 'success'

    case 'Estoque Baixo':
      return 'warn'

    case 'Sem Estoque':
      return 'danger'

    default:
      return 'Sem Estoque'
  }
}

onMounted(() => {
  loadingProducts.value = true
  productService
    .getProducts()
    .then((data) => {
      products.value = data
      loadingProducts.value = false
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error loading products',
        life: 3000
      })
      loadingProducts.value = false
    })
})

const deleteProduct = (id) => {
  confirm.require({
    message: 'você deseja deletar este produto?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Deletar',
      severity: 'danger'
    },
    accept: () => {
      const index = products.value.findIndex((product) => product.id === id)
      products.value.splice(index, 1)
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto deletado',
        life: 3000
      })
    },
    reject: () => {
      toast.add({
        severity: 'info',
        summary: 'Info',
        detail: 'Cancelado',
        life: 3000
      })
    }
  })
}

const saveProduct = () => {
  products.value.push = productService
    .createProduct(product.value)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Produto cadastrado com sucesso',
        life: 3000
      })
      products.value.push(product.value)
    })
    .catch(() => {
      toast.add({
        severity: 'error',
        summary: 'Erro ao salvar produto',
        detail: 'Verifique os logs para mais informações',
        life: 3000
      })
    })
  addVisibleDialog.value = false
}
</script>
<template>
  <div class="product-container">
    <div class="product-options">
      <Button size="small" icon="pi pi-plus" label="Adicionar" @click="addVisibleDialog = true" />
      <Dialog
        v-model:visible="addVisibleDialog"
        modal
        header="Cadastrar Produto"
        :style="{ width: '25rem' }"
      >
        <span class="text-surface-500 dark:text-surface-400 block mb-8"
          >Adicione os dados do produto.</span
        >
        <div class="dialog-form">
          <div class="p-field">
            <label for="name">Nome</label>
            <InputText id="name" v-model="product.name" />
          </div>
          <div class="p-field">
            <label for="brand">Marca</label>
            <InputText id="brand" v-model="product.brand" />
          </div>
          <div class="p-field">
            <label for="price">Preço</label>
            <InputNumber id="price" v-model="product.price" mode="currency" currency="BRL" />
          </div>
          <div class="p-field">
            <label for="category">Categoria</label>
            <Select
              v-model="product.category"
              :options="categories"
              placeholder="Escolha a Categoria"
              checkmark
            />
          </div>
        </div>
        <div class="dialog-footer">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="addVisibleDialog = false"
          ></Button>
          <Button type="button" label="Save" @click="saveProduct()"></Button>
        </div>
      </Dialog>
      <ConfirmDialog></ConfirmDialog>
      <Button
        @click="deleteProduct(selectedProduct)"
        size="small"
        label="Deletar"
        icon="pi pi-trash"
        :disabled="!hasSelectedProducts"
      ></Button>
    </div>
    <div class="product-header">
      <p>Manage products</p>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="searchValue" placeholder="Search" />
      </IconField>
    </div>
    <DataTable
      v-model:selection="selectedProduct"
      :lazy="true"
      :totalRecords="products.length"
      :loading="loadingProducts"
      :value="products"
      dataKey="id"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 60rem"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="id" header="Id"></Column>
      <Column field="name" header="Nome"></Column>
      <Column field="brand" header="Marca"></Column>
      <Column field="price" header="Preço"></Column>
      <Column field="category" header="Categoria"></Column>
      <Column header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.stockStatus" :severity="getSeverity(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
}

.product-options {
  display: flex;
  flex-direction: row;
  gap: 10px;
  border: 1px solid #dedede;
  border-radius: 5px;
  min-width: 60rem;
  padding: 1rem;
  color: #2c2c2c;
}

.product-header {
  min-width: 60rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: bold;
  color: #dedede;
}

.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.p-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 2rem;
}
</style>
