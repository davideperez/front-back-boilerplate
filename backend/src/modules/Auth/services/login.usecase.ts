import { AuthRepository } from "../auth.repository"


export class LoginUseCase {
  repository: AuthRepository
  
  constructor (repository: AuthRepository) {
    this.repository = repository
  }

  async execute(){
    try {
      // const userAdaptado = separarNombreyApellido(user)
      this.repository.login()
    } catch (error) {
      // TODO: Este error es bueno mostrarlo? Porque probablemente no.
      console.error(`No se pudo registrar el usuario.${error}`) 
    }
  }
}
