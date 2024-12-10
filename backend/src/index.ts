import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';

import api from './api';

// Injects the enviroment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Creates the whitelist from the .env
const whitelist = process.env.CORS_WHITELIST?.split(',') || [];

// CORS Configuration
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

// 1 Cors
app.use(cors(corsOptions));

// 2 helmet
app.use(helmet());

// 3 Morgan: The style changes 
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));  // Para producción, más detallado
} else {
  app.use(morgan('dev'));  // Para desarrollo, más compacto y con colores
}

// 4 Parses incoming requests to json
app.use(express.json());

// Routes

app.use('/v1', api);

// Server Start
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

