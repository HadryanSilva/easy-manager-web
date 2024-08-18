<script setup>
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const addVisibleDialog = ref(false)
const selectedProduct = ref(null)

const hasSelectedProducts = computed(() => {
  return selectedProduct.value && selectedProduct.value.length > 0
})

const toast = useToast()
const products = ref([
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand 1',
    price: 100,
    category: 'Category 1',
    inventoryStatus: 'INSTOCK'
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand 2',
    price: 200,
    category: 'Category 2',
    inventoryStatus: 'LOWSTOCK'
  },
  {
    id: 3,
    name: 'Product 3',
    brand: 'Brand 3',
    price: 300,
    category: 'Category 3',
    inventoryStatus: 'OUTOFSTOCK'
  },
  {
    id: 4,
    name: 'Product 4',
    brand: 'Brand 4',
    price: 400,
    category: 'Category 4',
    inventoryStatus: 'INSTOCK'
  },
  {
    id: 5,
    name: 'Product 5',
    brand: 'Brand 5',
    price: 500,
    category: 'Category 5',
    inventoryStatus: 'OUTOFSTOCK'
  },
  {
    id: 6,
    name: 'Product 6',
    brand: 'Brand 6',
    price: 600,
    category: 'Category 6',
    inventoryStatus: 'INSTOCK'
  }
])

const deleteDialog = () => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: () => {
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    }
  })
}

const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warn'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}

const searchValue = ref('')
</script>
<template>
  <div class="product-container">
    <div class="product-options">
      <Button size="small" icon="pi pi-plus" label="Adicionar" @click="addVisibleDialog = true" />
      <Dialog
        v-model:visible="addVisibleDialog"
        modal
        header="Edit Profile"
        :style="{ width: '25rem' }"
      >
        <span class="text-surface-500 dark:text-surface-400 block mb-8"
          >Update your information.</span
        >
        <div class="flex items-center gap-4 mb-4">
          <label for="username" class="font-semibold w-24">Username</label>
          <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="addVisibleDialog = false"
          ></Button>
          <Button type="button" label="Save" @click="addVisibleDialog = false"></Button>
        </div>
      </Dialog>
      <ConfirmDialog></ConfirmDialog>
      <Button
        @click="deleteDialog()"
        size="small"
        label="Deletar"
        icon="pi pi-trash"
        :disabled="!hasSelectedProducts"
      />
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
      :value="products"
      dataKey="id"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 60rem"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="id" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="brand" header="Brand"></Column>
      <Column field="price" header="Price"></Column>
      <Column field="category" header="Category"></Column>
      <Column header="Status">
        <template #body="slotProps">
          <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
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
</style>
