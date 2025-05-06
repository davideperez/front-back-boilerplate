import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';


import api from './api';
import connectMongoDB from './connections/mongodb.connection';

// ---------------- 1 Initial Setup ----------------  //

// 1 Injects the enviroment variables

// 2 express server instantiation
const app = express();

// 3 port retrieval
const port = process.env.PORT || 3000;

// 4 cors Configuration
const whitelist = process.env.CORS_WHITELIST?.split(',') || [];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log('-----------------------------> index.ts > origin: ', origin);
    // Si hay origin y esta incluido en la whitelist devuelve true.
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
  
    // Sino devuelve un Err.
    } else {
      console.error('Origen no permitido por CORS');
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allows cookies and Auth headers.
};

// -------------------- 2 Uses --------------------  //

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

// 5 Cookie parser.
app.use(cookieParser())



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Store files in the "uploads" directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate a unique suffix for the file name
//     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname); // Use the original file name and add a unique suffix
//   }
// });


// --------------- 3 DB connection ---------------  //

connectMongoDB()

// ------------------ 4 Routes ------------------  //

app.use('/v1', api);
app.get('/ping', (_req, res) => {
  res.send('pong');
});


// --------------- 5 Server Start ---------------  //

app.listen(port, () => {
  console.log('---------------------------')
  console.log('Platform: ', process.platform)
  console.log('Node Version: ', process.version)
  console.log('Process ID: ', process.pid)
  console.log('---------------------------')
  console.log(`🌎 Servidor corriendo en http://localhost:${port}`);
  console.log('---------------------------')
});
