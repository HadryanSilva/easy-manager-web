// userService.js

import http from '@/services/http'
import { useAuthStore } from '@/stores/auth'

const API_URL = 'http://localhost:8080/api/v1'
const authStore = useAuthStore()
const token = authStore.getToken

export default {
  async getProducts() {
    console.log(token)
    try {
      const response = await http.get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page: 0,
          size: 5
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async getProductById(id) {
    try {
      const response = await http.get(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error)
      throw error
    }
  },

  async createProduct(productData) {
    try {
      productData.stockStatus = 'Sem Estoque'
      console.log('Dados do produto: ', productData)
      const response = await http.post(`${API_URL}/products`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  async editProduct(id, productData) {
    try {
      const response = await http.put(`${API_URL}/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      console.error(`Error editing product with id ${id}:`, error)
      throw error
    }
  },

  async deleteProduct(id) {
    try {
      const response = await http.delete(
        `${API_URL}/products/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      return response.data
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error)
      throw error
    }
  }
}
