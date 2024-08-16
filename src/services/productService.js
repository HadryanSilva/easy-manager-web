// userService.js

import http from 'http'

const API_URL = 'http://localhost:8080/api/v1'

export default {
  async getProducts(page, size) {
    try {
      const response = await http.get(`${API_URL}/products?page=${page}&size=${size}`)
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async getProductById(id) {
    try {
      const response = await http.get(`${API_URL}/products/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error)
      throw error
    }
  },

  async createProduct(productData) {
    try {
      const response = await http.post(`${API_URL}/products`, productData)
      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  async editProduct(id, productData) {
    try {
      const response = await http.put(`${API_URL}/products/${id}`, productData)
      return response.data
    } catch (error) {
      console.error(`Error editing product with id ${id}:`, error)
      throw error
    }
  },

  async deleteProduct(id) {
    try {
      const response = await http.delete(`${API_URL}/products/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error)
      throw error
    }
  }
}
