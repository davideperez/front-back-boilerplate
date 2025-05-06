import app from './app';
import connectMongoDB from './connections/mongodb.connection';
import dotenv from 'dotenv';

dotenv.config(); // Injects the enviroment variables

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_NAME_DEV

connectMongoDB(mongoURI); // Connect to MongoDB
  
app.listen(port, () => {
  console.log('---------------------------')
  console.log('Platform: ', process.platform)
  console.log('Node Version: ', process.version)
  console.log('Process ID: ', process.pid)
  console.log('---------------------------')
  console.log(`🌎 Servidor corriendo en http://localhost:${port}`);
  console.log('---------------------------')
});