// userService.js

import http from '@/services/http'

const API_URL = 'http://localhost:8080/api/v1'
const token = localStorage.getItem('token')
const config = {
  headers: { Authorization: `Bearer ${token}` }
}

export default {
  async getProducts(page, size) {
    try {
      const response = await http.get(`${API_URL}/products?page=${page}&size=${size}`, {}, config)
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async getProductById(id) {
    try {
      const response = await http.get(`${API_URL}/products/${id}`, {}, config)
      return response.data
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error)
      throw error
    }
  },

  async createProduct(productData) {
    try {
      const response = await http.post(`${API_URL}/products`, productData, config)
      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  async editProduct(id, productData) {
    try {
      const response = await http.put(`${API_URL}/products/${id}`, productData, config)
      return response.data
    } catch (error) {
      console.error(`Error editing product with id ${id}:`, error)
      throw error
    }
  },

  async deleteProduct(id) {
    try {
      const response = await http.delete(`${API_URL}/products/${id}`, {}, config)
      return response.data
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error)
      throw error
    }
  }
}
