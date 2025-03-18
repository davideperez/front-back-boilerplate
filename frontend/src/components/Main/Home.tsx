// import { useGetUsers } from "@/hooks/useGetUsers"

import { Card } from "../ui/card"

export const Home = () => {
  // const [ users ] = useGetUsers()
  // console.log('Home > users: ', users)
  return (
    <div>
      <Card>
        <form>
          <input>
          </input>
        </form>
      </Card>
      {/* <div className='flex w-screen h-screen p-20 bg-gray-100 justify-normal align-middle'>
        <div className='flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
          <h1 className=''>Home</h1>
          <div>
            <p>This is Home</p>
            <ul>
              {
                users?.map((user) => {
                  return (
                    <li key={user.email}>
                      <p >{user.firstName}</p>
                    </li>
                    )
                })
              }
            </ul>
          </div>
        </div>
      </div> */}
    </div>
    
  )
}

