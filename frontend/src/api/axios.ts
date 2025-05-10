import axios from "axios"
import Cookies from "js-cookie"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/v1"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true, TODO: check if this is needed
  /* headers: {
    "Content-Type": "application/json"
  } */
})

type userRegistrationData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function register (userRegistrationData: userRegistrationData) {
  return axiosInstance.post("/auth", userRegistrationData)
}


type userLoginData = {
  email: string
  password: string
}

export async function login  (userLoginData: userLoginData) {
  const { email, password } = userLoginData
  const response = await axiosInstance.post("/auth/login", { email, password })
  
  if (response.status === 200) {

    // Store the JWT token in local storage
    // localStorage.setItem("token", response.data.accessToken)
    

    // Store the refresh token in secure cookie with js-cookie
    await Cookies.set("accessToken", response.data.accessToken , { secure: true, sameSite: "Strict" })
    // 
    return response.data
  } else {
    throw new Error("Login failed")
  }

  return 
}

type Users = [
  {
    id: string
    firstName: string
    lastName: string
    email: string
  }
]

export async function getAllUsers () {
  const response = await axiosInstance.get<Users>("/users")
  console.log("Response from getAllUsers: ", response)
  return response.data
}