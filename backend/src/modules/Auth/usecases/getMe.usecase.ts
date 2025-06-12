import { GetUserByIdUseCase } from '../../Users/usecases/getUserById.usecase'

export class GetMeUseCase {
  private GetUserByIdUseCase: GetUserByIdUseCase

  constructor (GetUserByIdUseCase: GetUserByIdUseCase) {
    this.GetUserByIdUseCase = GetUserByIdUseCase
  }

  async execute(id: string): Promise<void>   {
    // 1 Validate the id 
    if (!id) {
      console.error('Invalid user') //TODO: ERROR HANDLING: Check if this error is well handled.
      throw new Error('Invalid user')
    } 

    // 2 Validate user exists
    const userExists = await this.GetUserByIdUseCase.execute(id)
    
  }
}
