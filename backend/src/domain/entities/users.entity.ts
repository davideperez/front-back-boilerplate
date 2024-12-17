export interface User {
  id: string, // TODO: Este id esta ok ponerlo?: Xq entiendo que mongoose lo pone automaticamente..
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}