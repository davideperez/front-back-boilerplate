import app from './app';

const port = process.env.PORT || 3000;

// --------------- Server Start ---------------  //

app.listen(port, () => {
  console.log('---------------------------')
  console.log('Platform: ', process.platform)
  console.log('Node Version: ', process.version)
  console.log('Process ID: ', process.pid)
  console.log('---------------------------')
  console.log(`🌎 Servidor corriendo en http://localhost:${port}`);
});


