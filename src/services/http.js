import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://easy-manager-api.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000
})

export default axiosInstance
