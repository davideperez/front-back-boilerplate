import { Request, Response, NextFunction } from 'express'
import { JwtUtil } from './jwt.util'

// I/O: Receives a token, executes a next(), returns

export function authenticateToken (req: Request, res: Response, next: NextFunction) {
  console.log('authenticateToken > req.cookies: ', req.cookies)
  console.log('authenticateToken > req.header(Authorization): ', req.header('Authorization'))
  
  // 1 Extract the token from the cookie.
  const token = req.cookies?.accessToken || req.header('Authorization')?.split('')[1];
  
  // 2 Validate there is a token.
  if (!token) {
    res.status(401).json({ message: "No token provided"})
  }

  try {
  // 3 Validate the token and extract the info from the payload.
    const decodedTokenPayload = JwtUtil.verifyToken(token)
    console.log('authenticateToken > decodedTokenPayload: ', decodedTokenPayload)
    
  // 4 Add the payload data to the request?.
    req.user = { ...decodedTokenPayload }
  
  // 5 Execute the next() method.
    next();

  } catch (error) {
    console.error('Invalid Token, error: ', error)
    res.status(403).json({ message: 'Invalid token' })
  }
}
