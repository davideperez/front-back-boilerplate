# A Backend Boilerplate - Parte I - Configuración Inicial


## 1 Intro
Server Node listo para usar. Incluye además un tutorial que describe paso a paso como fue construido con el que podés construirlo vos mismo.

Tiene las siguientes librerías configuradas:
- pnpm
- typescript
- express
- morgan
- nodemon
- dotenv
- gitignore

## 2 Setup Inicial del proyecto
### 2.1 carpetas iniciales
```dirtree
- /backend
```
### 2.2 package.json
```powershell
pnpm init
```
Nos devolvera un package json
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```
### 2.3 node, express y typescript

```shell
pnpm add express
```

```shell
pnpm add -D typescript ts-node @types/node @types/express
```

Esto instalará:
- `express`
- `typescript`: El compilador de TypeScript.
- `ts-node`: Para ejecutar TypeScript directamente desde la línea de comandos.
- `@types/node`: Tipos para trabajar con Node.js en TypeScript.
### 2.4 tsconfig.json
```shell
npx tsc --init
```
Modificarlo para que se vea así:

```json
{
  "compilerOptions": {
    "target": "ES6", 
    "module": "commonjs",
    "outDir": "./dist", 
    "rootDir": "./src",
    "esModuleInterop": true, 
    "strict": true 
  },
  "include": ["src/**/*"]
}
```
### 2.5 Entry Point: index.ts
```dirtree
- /backend
	- /src
		- index.ts
```
*index.ts*
```ts
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
```

### 2.6 configurar module en package.json
En el *package.json* agregar: 
` "type": "module",`

Quedará asi: 
```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node server.ts"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.21.1",
    "ts-node": "^10.9.2"
  }
}
```
### 2.7 Scripts en el package.json
Agregar el siguiente script en el package.json
```json
{
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/index.ts"
  }
}
```
Quedará asi:
*package.json*
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.21.1"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2"
  }
}

```
### 2.8 Iniciar el server
```shell
pnpm start
```
Devolverá:
![](Pasted%20image%2020241129143059.png)
Cuando quieras compilar el código TypeScript y luego ejecutar el servidor, usá:
```shell
pnpm build
pnpm start
```
Devolverá:
![](Pasted%20image%2020241129143136.png)
#### 2.8.1 Chequear que corra en localhost:3000
Ingresar a localhost:3000 para revisar que este funcionando.
## 3 .env
### 3.1 Instalarlo
```shell
pnpm add dotenv
```
### 3.2 Crear el archivo .env en la raíz del proyecto
```dirtree
- /backend
	- /src
		- index.ts
	- package.json
	- pnpm-lock.yaml
	- tsconfig.json
	- .env
```
*.env*
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
```
### 3.3 Configurar .env en el código
1. Se importa dotenv
2. Se cargan las variables de entorno
3. Se generan accesos a las variables de entorno donde corresponda.
```ts
// src/index.ts
import express from 'express';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Acceder a las variables de entorno
const port = process.env.PORT || 3000; // Si no se define PORT, usa 3000 por defecto

app.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

```
## 4 .gitignore

Crear un archivo .gitignore en la raíz del proyecto para que git no publique nuestra credenciales.
```dirtree
- /backend
	- /src
		- index.ts
	- package.json
	- pnpm-lock.yaml
	- tsconfig.json
	- .env
	- .gitignore
```
*.gitignore*
```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Runtime data
pids
*.pid
*.pid.lock

# Dependency directories
/node_modules

# TypeScript
*.tsbuildinfo

# Build outputs
dist/
build/
out/

# Environment variables
.env
.env.*

# System files
.DS_Store
Thumbs.db

# Editor and IDE configurations
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Temporary files
*.tmp
*.temp

# Coverage
coverage/
*.lcov

# Debugging
.vscode/launch.json

# Optional npm cache directory
.npm

# ESLint
.eslintcache

# Prettier
.prettiercache
```
## 5 morgan
### 5.1 Instalar
```shell
pnpm add morgan
pnpm add -D @types/morgan
```
### 5.2 Configurar morgan en Express
Agregar:
```ts
import morgan from 'morgan';
app.use(morgan('dev'));
```
Quedara así:
*index.ts*
```ts
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
```
### 5.3 Configurar morgan segun si el entorno es dev o prod
#### 5.3.1 Configuramos el .env
Asegurate de tener configurado un archivo .env con la variable NODE_ENV.
```env
PORT=3000
NODE_ENV=development // Cambia a 'production' en producción
```
#### 5.3.2 Configuramos el index.ts
Reemplazamos la linea que lo implementa, por lo siguiente:
```ts
// Usar morgan según el entorno (desarrollo o producción)
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));  // Para producción, más detallado
} else {
  app.use(morgan('dev'));  // Para desarrollo, más compacto y con colores
}
```
Nuestro server quedara así:

```ts
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Morgan según el entorno sea desarrollo o producción
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));  // Para producción, más detallado
} else {
  app.use(morgan('dev'));  // Para desarrollo, más compacto y con colores
}

app.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
```
### 5.4 Verificá el log de solicitudes cada vez que accedes al servidor.
```shell
pnpm start
```
## 6 nodemon
### 6.1 Instalarlo
```json
pnpm add -D nodemon
```
### 6.2 Configurar nodemon para typescript
Hay que decirle a nodemon que use ts-node para ejecutar el codigo typescript en lugar de javascript compilado. 

**Se crea un archivo de configuracion para nodemon**
Lo creamos en la raíz del proyecto. 

```dirtree
- /backend
	- /src
		- index.ts
	- package.json
	- pnpm-lock.yaml
	- tsconfig.json
	- .env
	- .gitignore
	- nodemon.json
```

Esto permitirá configurar Nodemon sin tener que escribir la configuración en la línea de comandos cada vez.
- exec: Comando para ejecutar el archivo principal con ts-node
- watch: Directorio que Nodemon debe observar
- ext: Extensiones de archivo que debe observar (en este caso, archivos TypeScript)
- ignore: // Ignorar la carpeta node_modules
*nodemon.json*
```json
{
  "exec": "ts-node src/index.ts",  
  "watch": ["src"],                
  "ext": "ts",
  "ignore": ["node_modules"]       
}
```
### 6.3 Agregar un script a package.json
Este servira para ejecutar Nodemon. 
Así, vas a poder iniciar el servidor con Nodemon usando `pnpm` de manera fácil.

```json
{
  "scripts": {
    "watch": "nodemon",   // Ejecuta nodemon según la configuración en nodemon.json
    "start": "ts-node src/index.ts"
  }
}
```

Con esto se puede iniciar en modo auto ejecución.
## 7 helmet
### 7.1 Instalarlo
```shell
pnpm add helmet
```
> **📝SOBRE LOS TIPOS**
> Los tipos no hace falta instalarlos al 2024-12-05, porque ya los incluye [[helmet]].

### 7.2 agregarlo al server
Agregá las siguientes lineas: el import y el use.
```ts
import helmet from 'helmet';

// Use Helmet to secure your app by setting various HTTP headers
app.use(helmet());
```

### 7.3 antes
***Antes***
![](Pasted%20image%2020241205191943.png)
*Request Headers*
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 52
ETag: W/"34-q0LmFeW9lpf0t+F62R2yrSjIMYE"
Date: Thu, 05 Dec 2024 22:15:51 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
*Response Headers*
```http
GET / HTTP/1.1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: en,es;q=0.9
Cache-Control: no-cache
Connection: keep-alive
DNT: 1
Host: localhost:3000
Pragma: no-cache
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
```
### 7.4 después
![](Pasted%20image%2020241205193604.png)
*Request Headers*
```http
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Content-Type: text/html; charset=utf-8
Content-Length: 52
ETag: W/"34-q0LmFeW9lpf0t+F62R2yrSjIMYE"
Date: Thu, 05 Dec 2024 22:35:24 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
*Response Headers*
```http
accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
accept-encoding:gzip, deflate, br, zstd
accept-language:en,es;q=0.9
cache-control:no-cache
connection:keep-alive
dnt:1
host:localhost:3000
pragma:no-cache
sec-ch-ua:"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile:?0
sec-ch-ua-platform:"Windows"
sec-fetch-dest:document
sec-fetch-mode:navigate
sec-fetch-site:none
sec-fetch-user:?1
upgrade-insecure-requests:1
user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
```
## 8 cors
[CORS](CORS.md)
### 8.1 Instalar cors y sus tipos
```json
pnpm install cors @types/cors
```
### 8.2 agregarlo al server express
#### 8.2.1 Crear whitelist
2. Se configura una whitelist en la variable de entorno .env. con la lista de sitios permitidos de comunicarse con nuestro backend api.
```.env
CORS_WHITELIST=http://localhost:3000,http://miurl.com
```
#### 8.2.2 Agregarlo al server
1. En el index.tsx se arma el array de la whitelist usando el string almacenado en la variable de entorno.
2. Se arma la configuración indicando origins permitidos, métodos y si se usan credenciales. 
3. Se implementa cors con .use() en express.
```ts
import express from 'express';
import cors from 'cors';

// 1. Leer el whitelist desde las variables de entorno
const whitelist = process.env.CORS_WHITELIST?.split(',') || [];

// 2. Configurar opciones de CORS
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); // Permitir origen
    } else {
      callback(new Error('Origen no permitido por CORS')); // Bloquear origen
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permitir cookies y encabezados de autorización
};

// 3. Aplicar middleware de CORS
app.use(cors(corsOptions));
```
#### 8.2.3 Resultado final
*Headers del Request HTTP: Ahora con el header Access-Control-Allow-Credentials.*
```http
HTTP/1.1 200 OK
Vary: Origin
Access-Control-Allow-Credentials: true
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Content-Type: text/html; charset=utf-8
Content-Length: 52
ETag: W/"34-q0LmFeW9lpf0t+F62R2yrSjIMYE"
Date: Fri, 06 Dec 2024 00:11:42 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
### 8.3 Methods: OPTION
#API #error
No hace falta agregar el método [[OPTIONS en CORS]] pero si el API tiene un error, puede servir ponerlo explícitamente.
## 9 express.json()
Parsea el body de los requests http a json, para poder usar los datos. 
Agregar al server express el siguiente middleware.
```ts
app.use(express.json());
```
## 10 api router con versionado
### 10.1 agregarlo al server express
On index.ts add the route:
```ts
app.use('/v1', api);
```
### 10.2 create the api router
- Create an `api.ts` file on the ??? folder en la raíz.
- Se agregaran aquí las rutas a los routers principales.
```ts
import express from 'express';

import usersRouters from './users/users-router'

const api = express.Router();

// Routes
api.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!!!');
});

api.use('/users', usersRouters);

export default api;
```