import { RegisterUseCase } from "../../services/register.usecase"

export class AuthController {
  private readonly register: RegisterUseCase 

  constructor (
    input: {
      readonly registerService: RegisterUseCase
    }
  ) {
    this.register = input.registerService
  }

  httpRegister = async () => {
    try {
      await this.register.execute()
    } catch (error) {

    } 
  }
}