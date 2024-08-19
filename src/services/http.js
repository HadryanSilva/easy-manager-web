import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1', //'https://easy-manager-api.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
})

export default axiosInstance
