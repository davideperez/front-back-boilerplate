import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Leer el whitelist desde las variables de entorno
const whitelist = process.env.CORS_WHITELIST?.split(',') || [];

// Config de CORS
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Si hay origin y esta incluido en la whitelist devuelve true.
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
      // Sino devuelve un Err.
    } else {
      callback(new Error('Origen no permitido por CORS')); // Bloquear origen
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permitir cookies y encabezados de autorización
};

// Uses
app.use(cors(corsOptions));
app.use(helmet());

// Morgan según el entorno sea desarrollo o producción
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));  // Para producción, más detallado
} else {
  app.use(morgan('dev'));  // Para desarrollo, más compacto y con colores
}

// Rutas

app.get('/', (req, res) => {
  res.send('Hola Mundo desde Node.js con TypeScript y Express!!!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});