import jsonwebtoken from 'jsonwebtoken';

function checkJWTSecret () {
  if (!process.env.JWT_SECRET) {
    throw new Error('Secret is not defined');
  }

  return  process.env.JWT_SECRET;
}

export class JwtUtil {

  // TODO: Implement a secret by user, instead of a general secret.
  
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

/*

  static decodeToken(token: string): any {
    return jsonwebtoken.decode(token);
  }

  static getSecret(): string {
    return this.secret;
  }

  static setSecret(secret: string): void {
    this.secret = secret;
  }

  static getSecretOrThrow(): string {
    if (!this.secret) {
      throw new Error('Secret is not defined');
    }
    return this.secret;
  }

  static getSecretOrUndefined(): string {
    return this.secret;
  }

  static clearSecret(): void {
    this.secret = '';
  }

  static isSecretDefined(): boolean {
    return !!this.secret;
  }

  static isTokenValid(token: string): boolean {
    try {
      this.verifyToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      if (decoded.exp * 1000 < Date.now()) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  } 
  */

}
