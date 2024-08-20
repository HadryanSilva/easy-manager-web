import { defineStore } from 'pinia'
import http from '@/services/http'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => {
    if (!localStorage.getItem('token')) {
      return {
        user: null,
        token: null,
        isAuthenticated: false
      }
    }
    return {
      user: JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token'),
      isAuthenticated: true
    }
  },

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    async login(auth) {
      try {
        const { username, password } = auth
        const { data } = await await http.post(
          '/auth/login',
          {},
          {
            auth: {
              username,
              password
            }
          }
        )
        this.user = data.user
        this.token = data.token
        this.isAuthenticated = true
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    async register(userData) {
      try {
        const { data, status } = await http.post('/auth/register', userData)
        if (status === 201) {
          console.log('Registration successful:', data)
          this.user = data.user
          this.email = data.email
        }
        return true
      } catch (error) {
        console.error('Registration failed:', error)
        return false
      }
    },

    async editUser(userData) {
      const token = this.getToken
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      try {
        console.log(config)
        const { data, status } = await http.put(`/users/${this.user.id}`, userData, config)
        if (status === 200) {
          console.log('Edit user successful:', data)
          this.user = data
          localStorage.setItem('user', JSON.stringify(this.user))
        }
        return true
      } catch (error) {
        console.log('Edit user failed:', error)
        return false
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          this.logout()
          router.push('/login')
        }
        this.user = JSON.parse(localStorage.getItem('user'))
        this.token = token
        this.isAuthenticated = true
      } catch (error) {
        this.logout()
      }
    }
  }
})
