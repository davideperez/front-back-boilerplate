import jsonwebtoken from 'jsonwebtoken';

function checkJWTSecret () {
  if (!process.env.JWT_SECRET) {
    throw new Error('Secret is not defined');
  }

  return  process.env.JWT_SECRET;
}

export class JwtUtil {

  // TODO: AUTHENTICATION: ImpIlement a secret by user, instead of a general secret.
  
  private static  secret: string = checkJWTSecret();
  
  static generateAccessToken(payload: any): string {
    const accessToken = jsonwebtoken.sign({ email: payload }, this.secret, { expiresIn: "15m" });
    return accessToken;
  }

  static generateRefreshToken(payload: any): string {
    const refreshToken = jsonwebtoken.sign({ email: payload }, this.secret, { expiresIn: "7d" });
    return refreshToken;
  }

  static verifyToken(token: string): any {
    const verifiedToken = jsonwebtoken.verify(token, this.secret);
    return verifiedToken;
  }

}
