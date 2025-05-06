import { Request, Response } from 'express';

import { z } from 'zod';

import { SignUpResponseDto } from '../../Auth/domain/dtos/signUp.DTO';
import { SignUpUseCase } from '../usecases/singUpUser.usecase';
import { LoginUseCase } from '../usecases/loginUser.usecase';
import { GetMeUseCase } from '../usecases/getMe.usecase';
import { LogoutUseCase } from '../usecases/logoutUser.usecase';
import { GetUserByIdUseCase } from '../../Users/usecases/getUserById.usecase';

export class ExpressAuthController {

  private readonly signUpUseCase: SignUpUseCase
  private readonly loginUseCase: LoginUseCase
  private readonly getMeUseCase: GetMeUseCase
  private readonly logoutUseCase: LogoutUseCase
  private readonly getUserByIdUseCase: GetUserByIdUseCase

  constructor (input: {
    readonly signUpUseCase: SignUpUseCase,
    readonly loginUseCase: LoginUseCase,
    readonly getMeUseCase: GetMeUseCase,
    readonly logoutUseCase: LogoutUseCase,
    readonly getUserByIdUseCase: GetUserByIdUseCase
  } 

  ) {
    this.signUpUseCase = input.signUpUseCase
    this.loginUseCase = input.loginUseCase
    this.getMeUseCase = input.getMeUseCase
    this.logoutUseCase = input.logoutUseCase
    this.getUserByIdUseCase = input.getUserByIdUseCase
  }

  httpSignUpUser = async (req: Request, res: Response): Promise<void> => {
    // 1 Extraer el usuario del body http.
    const user = req.body
    
    // 2 Validar que el usuario tenga los atributos y tipos requeridos.
    const userAttributes = z.object({
      id: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string()
    })

    const validatedUser = userAttributes.parse(user)

    // 3 Llamar al caso de uso para que cree el usuario en la db.
    try {
      const newUser: SignUpResponseDto = await this.signUpUseCase.execute(validatedUser)
  
    // 4 Responder con un 201 y el usuario creado. TODO: Hace falta devolverlo?
      console.log('users.controller.ts > httpSignUpUser > newUser: ', newUser)
      res.status(201).json({message: 'User created successfully', newUser})
    } catch (err: any) {
      console.error(`Error al registrarse ${err.message}`);  
      res.status(500).json({error: "Error al registrarse: " + err.message})
    }
  }

  httpLoginUser = async (req: Request, res: Response): Promise<void> => {
    
    // 1 Extract email and password
    const loginData = { 
      email: req.body.email, 
      password: req.body.password 
    }

    // 2 Validate the login data
    const loginFields = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
      })
      
      const validatedLoginData = loginFields.parse(loginData)
      
      try {
        
        // 3 Calls the login useCase to get the tokens.
        const loginResponse = await this.loginUseCase.execute(validatedLoginData)

        // 4 Send the Refresh Token via secure cookie.
        const { refreshToken, accessToken } = loginResponse

        const isProduction = process.env.NODE_ENV === "production";
        
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true, 
          secure: isProduction,
          sameSite: isProduction ? "strict" : "lax", 
          domain: isProduction ? "mydomain.com" : undefined, // TODO: Implement this when Refresh Token endpoint is ready.
          path: "/v1/users/refresh-token"
        });

        console.log("httpLoginUser > req.cookies: ", req.cookies)
      
        // 5 Send the Access Token.
        console.log('users.controller.ts > httpLoginUser > loginReponse: ', loginResponse)
        res.status(200).json({message: 'User created successfully', accessToken: accessToken})
      } catch (err: any) {
        console.error(`Error al loguear el usuario: ${err.message}`);  
        res.status(500).json({error: err.message})
      }
  }

  httpGetMe = async (req: Request, res: Response): Promise<void> => {
    // 1 Extract the user id
    const id = req.user

    // 2 Validate the user id
    const idField = z.string()
    const validId = idField.parse(id)

    try {
    // 3 Call the getUserById useCase to get the user
      const  user = await  this.getUserByIdUseCase.execute(validId)

    // 4 Send the user    
      res.status(200).json({message: "User data retrieved successfully", user})
    } catch (err: any) {
      console.error(`Error fetching user data: ${err.message}`);  
      res.status(500).json({error: err.message})
    }
  }

  httpLogoutUser = async (req: Request, res: Response): Promise<void> => {
    
    try {
      
    } catch (error) {
      
    }
  }
}