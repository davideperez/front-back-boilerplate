import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/v1"

console.log("axios.ts > API_BASE_URL: ", API_BASE_URL)
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json"
  }
})

export default axiosInstance;