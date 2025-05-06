import { CorsOptions } from 'cors';

// 4 cors Configuration
const whitelist = process.env.CORS_WHITELIST?.split(',') || [];

const corsOptions = {
  origin: (
    origin: string | undefined, 
    callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin if they are included in the whitelist.
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.error('Origin not allowed by CORS:', origin);
        callback(new Error('Origin not allowed by CORS'), false);
      }
    },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allows cookies and Auth headers.
};

export default corsOptions;