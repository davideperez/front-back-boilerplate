import app from './app';

const port = process.env.PORT || 3000;

// Server Start
app.listen(port, () => {
  console.log(`🌎 Servidor corriendo en http://localhost:${port}`);
});