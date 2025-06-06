import { fetchUsers } from "@/api/userService"
import { useEffect, useState } from "react"

export function useGetUsers () {
  const [users, setUsers] = useState<[]>([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data.users)
        // console.log('useGetUsers > data: ', data)    
      } catch (error) {
        console.error("Error fetching users: ", error)
      }
    }
    getUsers()
  }, [])

  return { users }
}