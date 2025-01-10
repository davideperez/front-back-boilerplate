export interface AuthRepository {
  register (): any,
  login(email: string, password:string):
}