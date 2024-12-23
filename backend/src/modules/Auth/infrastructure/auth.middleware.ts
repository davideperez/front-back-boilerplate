// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';

import { AuthRepository } from "../auth.repository";

export class AuthPassportPassport implements AuthRepository {
  async register(): Promise<void> {
    try {
      
    } catch (error) {
      
    }
} // TODO: Esto es absolutamente temporal en principio.


/* 
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => { // TODO: este tipado esta ok?
  // 1 Extracts the token from a HTTP Request.
  // It splits the strings that comes on the Authroization header from after the space,
  // to isolate the token itself from the Authroization http header.
  // Example of Authroization Header: Authorization: Bearer <token>
  const token: string | undefined = req.headers.authorization?.split(' ')[1]; // hay tipado de jwt token?
  // 2 Validates the token exists
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
  try {
    // 3 jwt.verify desencripta el token jwt y devuelve la informacion decodificada.
    // Ejemplo, un usuario:  { id: string, email: string }
    //TODO: No se tendria que usar aqui el servicio verifyToken del modulo auth.service.ts????
    // TODO: Decoded no deberia usar una DTO?
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
	  
    // 4 Se adjunta el user decodificado en el Request...
    // ..que sera pasado al siguiente endpoint o middleware.
    (req as any).user = decoded;
	  
    // 5 Si el token es válido, se llama al siguiente método o gestor de ruta.
    next();
  } catch (err) {
	  return res.status(403).json({ message: 'Forbidden' });
  }
};
 */