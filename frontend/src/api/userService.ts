import axios from "./axios"

export const fetchUsers = async () => {
  try {
    console.log("usersService.ts > fetchUsers > axios: ", axios)
    const search = ''
    const page = ''
    const items = ''

    const response = await axios.get(`/users/?search=${search}&page=${page}&items=${items}`);
    console.log("usersService.ts > fetchUsers > response.data: ", response.data)
    console.log("usersService.ts > fetchUsers > response.config.url: ", response.config.url)

    const users = response.data
    
    return users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw Error("Error fetching users.")
  }
}