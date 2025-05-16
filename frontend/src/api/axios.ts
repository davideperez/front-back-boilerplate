import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/v1"

export const axiosInstance = axios.create({

  baseURL: API_BASE_URL,
  // withCredentials: true, TODO: check if this is needed
  /* headers: {
    "Content-Type": "application/json"
  } */
})
