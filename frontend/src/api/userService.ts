import axios from "./axios"

export const fetchUsers = async () => {
  try {
    const response = await axios.get('/users');
    console.log("usersService.ts > fetchUsers > response: ", response)
    return response.data
  } catch (error){
    console.error("Error fetching users:", error);
    throw Error
  }
}
