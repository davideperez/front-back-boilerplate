import { CorsOptions } from 'cors';

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

export default corsOptions;