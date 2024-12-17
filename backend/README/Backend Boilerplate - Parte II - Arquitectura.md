# Backend Boilerplate - Parte II - Arquitectura

## 1 Crear Estructura de Carpetas
```dirtree
- /src
  - /domain
    - /entities
    - /dtos
    - /repositories
  - /infraestructure
    - /controllers
    - /repositories
    - /routes
  - /services
  - api.ts
  - index.ts
.env
.gitignore
nodemon.json
package.json
pnpm-lock.yaml
README.md
tsconfig.json
```
## 2 Agregar MongoDB
[[Agregar MongoDB]]
## 3 Postgres
[[Implementacion de postgres para borrar]]
## 4 Lógica de Usuarios
[[Implementación de lógica de usuarios]]
## 5 Orden para agregar un nuevo endpoint
[[Orden para agregar un nuevo endpoint]]
## 6 .excalidraw Arquitectura Hexagonal

![A Backend Boilerplate 2024-12-10 10.05.01.excalidraw](A%20Backend%20Boilerplate%202024-12-10%2010.05.01.excalidraw.md)

---
## 7 Auth con JWT y Passport 
[[Ejemplo Auth Bemoles Backend]]
[[Auth tuto 01]]
[[Auth Tuto 02]]
[[Auth Tuto 03]]

### 7.1 Diagrama de autentitcacion
![[Diagrama de autentitcacion]]
### 7.2 Estructura de carpetas y archivos
```dirtree
- /src
  - /domain
    - /dtos
      - auth.loginDto.ts
  - /infraestructure
    - /auth
      - local.strategy.ts
      - google.strategy.ts
      - auth.middleware.ts
    - /controllers
      - auth.controller.ts
    - /routes
      - auth.router.ts
  - /services
    - auth.service.ts
  - /utils
```
### 7.3 Instalación de dependencias
- passport 
- passport-local 
- passport-google-oauth20
- jsonwebtoken 
- bcryptjs
```bash
pnpm add passport passport-local passport-google-oauth20 jsonwebtoken bcryptjs
```
#### 7.3.1 De desarrollo
- @types/passport 
- @types/passport-local 
- @types/passport-google-oauth20 
- @types/jsonwebtoken 
- @types/bcryptjs 
```bash
pnpm add @types/passport @types/passport-local @types/passport-google-oauth20 @types/jsonwebtoken @types/bcryptjs -D
```
### 7.4 Utilidades (hashing y comparator)
Se crean las utilidades para:
- **hashPassword():** Hashear un password 
- **comparePassword():** Comparar un password con su hash.

![[password-utils-ts]]
### 7.5 Actualizacion del User entity
![[user-entity-ts]]
### 7.6 Login DTO
![[users-loginDto-ts]]
### 7.7 Local Strategy
![Desglose de la Local Strategy]]
![[localStrategy-ts]]
### 7.8 Google Auth Strategy
Coming soon!
### 7.9 Servicios
Se definen 3 métodos:
- **generateAccessToken():** Recibe un usuario y un secreto, devuelve un token JWT configurado para expirar en 15 minutos.
- **generateRefreshToken()**: Recibe un usuario y un secreto, devuelve un token JWT configurado para expirar en 7 días.
- **verifyToken()**: Recibe un token jwt y un secreto. Devuelve la data que estaba encriptada en el token, decodificada.

#### 7.9.1 ![[generateAccessToken-usecase-ts]]
#### 7.9.2 ![[generateRefreshToken-usecase-ts]]
#### 7.9.3 ![[verifyToken-usecase-ts]]
#### 7.9.4 ![[findUserByEmail-usecase-ts]]
### 7.10 Middleware de Autenticación con JWT
#### 7.10.1 One-liner:
Recibe un jwt token, valida devuelve el dato desencriptado.
#### 7.10.2 I/O
- Recibe:
	- **Un request HTTP** donde viene una cabecera de Autorización con un Bearer Token JWT, 
	- **Una respuesta HTTP** y 
	- **Un callback next()** que hace que el flujo continue hacia el siguiente middleware, o si no hay middleware, endpoint.
- Devuelve:
	- Nada, y ejecuta next(): haciendo que el flujo continue hacia el siguiente middleware.
	- Una respuesta http
#### 7.10.3 Que hace
  1 Extrae el JWT token del encabezado HTTP.
  2 Valida la existencia del token.
  3 Verifica el token, devolviéndolo desencriptado si esta ok.
  4 Continua con el flujo.
  
![[auth-middleware-ts]]
### 7.11 Controlador
![[auth-controller-ts]]
### 7.12 Rutas
![[auth-routes-ts]]
### 7.13 Implementacion en users.repository.ts
se le agrega findUser ByEmail
![[users-repository-ts]]

### 7.14 Implementacion en setup.ts
![[setup-ts]]
### 7.15 Implementacion en api.ts
![[api-ts]]
### 7.16 Implementacion en index.ts
![[index-ts]]
## 8 Manejo de Errores Centralizado
[[gpto manejo de errores - para borrar]]
## 9 Notas relacionadas
[[Logica search regex en MongoDB]]
[[Ejemplos de endpoints getAll en NodeJS y MongoDB]]