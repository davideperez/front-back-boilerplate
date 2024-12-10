interface User {
  id: number,
  /* problem: undefined added cause when creating a user, 
   * the string parameter sent by on the request
   * could be empty. Is this the best way to handle this case?
   * alternative: To validate the type of userName using typeof.
   */
  name: string /* | undefined */
}

const users: User[] = [
  { id: 1, name: 'Juan' },
  { id: 2, name: 'María' },
  { id: 3, name: 'Carlos' },
  { id: 4, name: 'Ana' },
  { id: 5, name: 'Luis' },
  { id: 6, name: 'Sofía' },
  { id: 7, name: 'Pedro' },
  { id: 8, name: 'Lucía' },
  { id: 9, name: 'Miguel' },
  { id: 10, name: 'Laura' },
];


export async function  createUser(user: Partial<User>){ // TBD: Is Partial a good type for user?
  console.log('Hi from the createUserById function')
  console.log('This is user, from createUser service: ', user)
  
  // 1 Retrieves the user's name
  const userName = user.name

  // 2 Validates userName is a string.
  if (typeof userName !== 'string') {
    return
  }
  
  // 3 Builds the new user object to be added to the db.
  const newUser: User = { 
    id: users.length + 1,
    name: userName
  }

  // 4 Sends the new user record to the db.
  users.push(newUser)

  // 5 Returns the user created
  return user
}

export async function getAllUsers(){
  console.log('Hi from the getAllUsers function')
  return users
}
export async function getUserById(id: number): Promise<User | undefined>{
  console.log('Hi from the getUser function')
  const user = users.find( user => user.id === id)
  return user
}

export async function updateUserById(id: number){
  console.log('Hi from the updateUserById function, and this is the id:', id)

}
export async function deleteUserById(){
  console.log('Hi from the deleteUserById function')
}

