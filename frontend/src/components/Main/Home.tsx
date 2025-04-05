// import { useGetUsers } from "@/hooks/useGetUsers"

import { Card } from "../ui/card"



export const Home = () => {
  const mockUser = {
    firstName: "David",
    lastName: "Gonzalez",
    email: "mock@email.com"
  }  

  return (
    <div>
     <h1>Bienvenido {mockUser.firstName}</h1>
    </div>
  )
}

