import { defineStore } from 'pinia'
import http from '@/services/http'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    async login(auth) {
      try {
        const { username, password } = auth
        const response = await await http.post(
          '/auth/login',
          {},
          {
            auth: {
              username,
              password
            }
          }
        )
        this.user = auth.username
        this.token = response.data.token
        this.isAuthenticated = true
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    async register(userData) {
      try {
        const response = await http.post('/auth/register', userData)
        if (response.status === 201) {
          console.log('Registration successful:', response.data)
        }
        return true
      } catch (error) {
        console.error('Registration failed:', error)
        return false
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },

    async checkAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await http.get('/user', {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.user = response.data
          this.token = token
          this.isAuthenticated = true
        } catch (error) {
          this.logout()
        }
      }
    }
  }
})
