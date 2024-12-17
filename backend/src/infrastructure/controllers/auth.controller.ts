import { Request, Response } from 'express';
import { GenerateAccessToken } from '../../services/auth/generateAccessToken.usecase';
import { GenerateRefr }


// 1 Se instancia AuthService TODO: Este instanciado no se hace en setup.ts?
const authService = new AuthService();

export class AuthController {
  constructor (
    private readonly login:  
    private readonly refresh: 
  )  
  login = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);
    res.json({ accessToken, refreshToken });
  };

  refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
      const decoded = authService.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
      const newAccessToken = authService.generateAccessToken(decoded);
      res.json({ accessToken: newAccessToken });
    } catch {
      res.status(403).json({ message: 'Invalid refresh token' });
    }
  };

}

