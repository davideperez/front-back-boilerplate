import { User } from '../../../Users/domain/entities/users.entity';
import jwt from 'jsonwebtoken';

export class GenerateAccessToken {
  private readonly accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
  
  //TODO: En esta clase deben ir trycatchs?
  async execute(user: Partial<User>): Promise<string | undefined> { // TODO: Esta bien el tipo?
    try {
      return jwt.sign({ id: user.id, email: user.email }, this.accessTokenSecret, { expiresIn: '15m' });
    } catch (error) {
      console.error(` ${error}`)
    }
  }
}
