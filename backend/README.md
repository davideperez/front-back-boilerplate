# A Backend Boilerplate
Server Node listo para usar. Incluye además un tutorial que describe paso a paso como fue construido con el que podés construirlo vos mismo.

Tiene las siguientes librerías configuradas:
- pnpm
- typescript
- express
- Morgan
- Nodemonþ
- dotenv
- gitignore
## 1 Setup Inicial del proyecto
### 1.1 crear la carpeta
```dirtree
- /backend
```
### 1.2 inicializar package.json
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
### 1.3 Instalar dependencias
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
### 1.4 Archivo de configuración de Typescript
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
### 1.5 Crear el archivo de entrada
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

### 1.6 configurar module en package.json
En el *package.json*
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
### 1.7 Agregar scripts en el package.json
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
### 1.8 Iniciar el server
```shell
pnpm start
```
Devolverá:
![](Pasted%20image%2020241129143059.png)
Si deseas compilar el código TypeScript y luego ejecutar el servidor, usa:
```shell
pnpm build
pnpm start
```
Devolverá:
![](Pasted%20image%2020241129143136.png)
#### 1.8.1 Chequear que corra en localhost:3000
## 2 Setup de Funciones extra básicas
### 2.1 .env
#### 2.1.1 Instalarlo
```shell
pnpm add dotenv
```
#### 2.1.2 Crear el archivo .env en la raíz del proyecto
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
#### 2.1.3 Configurar .env en el código
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
#### 2.1.4 Configurar el ignore
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
### 2.2 morgan
#### 2.2.1 Instalar
```shell
pnpm add morgan
pnpm add -D @types/morgan
```
#### 2.2.2 Configurar morgan en Express
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
#### 2.2.3 Configurar morgan segun si el entorno es dev o prod
##### 2.2.3.1 Configuramos el .env
Asegurate de tener configurado un archivo .env con la variable NODE_ENV.
```env
PORT=3000
NODE_ENV=development // Cambia a 'production' en producción
```
##### 2.2.3.2 Configuramos el index.ts
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
#### 2.2.4 Verificá el log de solicitudes cada vez que accedes al servidor.
```shell
pnpm start
```
### 2.3 nodemon
#### 2.3.1 Instalar nodemon
```json
pnpm add -D nodemon
```
#### 2.3.2 Configurar nodemon para typescript
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
#### Agregar un script a package.json
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
### 2.4 CORS
#### 2.4.1 Instalar CORS y sus tipos
```json
pnpm install cors @types/cors
```
#### 2.4.2 Activar CORS en el app.ts
```json
app.use(cors()) // Enables CORS.
```
#### 2.4.3 Configurar CORS en el app.ts
```js
app.use(cors({
    credentials: true,
}));
```
## 3 Creación de un endpoint post

### 3.1 Template del endpoint

```tsx
app.post('/api/files', async (req, res) => {
	//1. Extract files from request. 
	//2. Validate that we have file.
	//3. Validate the mimetype (csv)
	//4. Transform the File (Buffer/Bytes) to string
	//5. Transform the string to JSON
	//6. Save the JSON to db (or memory)
	//7. Return 200 with the message and the JSON.

	return res.status(200).json({data: [], message: "El archivo se cargo correctamente"})
})
```

#### 3.1.1 Instalar multer

Multer sirve para que el endpoint pueda recibir un file y lo guarde en el servidor o en un buffer.

Tutorial basico de Multer

[How to Upload Files in Node.js Using Express and Multer](https://www.youtube.com/watch?v=i8yxx6V9UdM)

```json
pnpm i multer
```

Instalar los tipos
```tsx
pnpm i @types/multer -D
```

#### 3.1.2 Instalar convert-csv-to-json

```json
pnpm i convert-csv-to-json
```

#### 3.1.3 importar ambas librerias

agregar en server.ts

```tsx
import multer from 'multer';
import csvToJson from 'convert-csv-to-json';
```

#### 3.1.4 Configurar multer

Seteamos multer para que el archivo lo guarde en un buffer de memoria, NO en nuestra maquina local.

```tsx
const storage = multer.memoryStorage()
const upload = multer({ storage })
```

#### 3.1.5 Agregar el middleware multer en el endpoint post

pasamos de:

```tsx
app.post('/api/files', async (req, res) => {
```

a:

```tsx
app.post('/api/files', upload.single('file'), async (req, res) => {
```

#### 3.1.6 Logica del endpoint post

1. Se crea una variable userData a modo de db provisioria:

```
let userData: Array<Record<string, string>> = []
```

1. Logica del endpoint post:

```tsx

app.post('/api/files', upload.single('file'), async (req, res) => {
	//1. Extract files from request.
	const { file } = req
	//2. Validate that we have file.
	if (!file) {
		return res.status(500).json({message:"File is required"})
	}
	//3. Validate the mimetype (csv)
	if (file.mimetype !== 'text/csv') {
		return res.status(500).json({message: 'File must be CSV'})
	}
	//4.
	let json: Array<Record<string, string>> = []

	try {
		//4. Transform the File (Buffer/Bytes) to string
		const rawCSV = Buffer.from(file.buffer).toString('utf-8')
		console.log('This is rawCSV: ', rawCSV)
		//5. Parse the rawCSV string to JSON
		json = csvToJson.csvStringToJson(rawCSV)
	} catch (error) {
		return res.status(500).json({message: "Error parsing the file to JSON"})
	}

	//6. Save the JSON to db (or memory)
	userData = json
	
	//7. Return 200 with the message and the JSON.

	return res.status(200).json({data: json, message: "El archivo se cargo correctamente"})
})
```

### 3.2 Creación de un endpoint get

#### 3.2.1 Template

```json
app.get('/api/users', async (req, res) => {
	//1. Extract the query param ´q´ from the request.
	//2. Validate that we have the query param.
	//3. Filter the data from the db (or memory) with the query param. 
	//4. Return 200 with the filtered data.

	return res.status(200).json({data: []})
})
```

#### 3.2.2 Logica del endpoint get

```tsx
app.get('/api/users', async (req, res) => {
	//1. Extract the query param ´q´ from the request.
	const { q } = req.query
	//2. Validate that we have the query param is offered. That is in case that someone decides not to filter.
	if (!q) {
		return res.status(500).json({
			message: 'Query param `q` is required'
		})
	}
	//2.1 To avoid receiving an array of strings or a parsed strings
	if (Array.isArray(q)) {
		return res.status(500).json({
			message: 'Query param `q` must be a string.'
		})
	}
	//3. Filter the data from the db (or memory) with the query param. 
	//toString in order to avoid QueryString.ParsedQs types.
	const search = q.toString().toLowerCase()

	//
	const filteredData = userData.filter(row => {
		return Object
			.values(row)
			.some(value => value.toLowerCase().includes(search))
	})

	//4. Return 200 with the filtered data.

	return res.status(200).json({data: []})
})
```