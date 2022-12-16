
const express = require('express');
const app = express();
const path = require('path');// para accder a las paginas

app.use(express.static('public'));// nose para que es

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log('Servidor corriendo en http://localhost:3030'));

//Creación de rutas

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './views/home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, './views/login.html')));
app.get('/registro', (req, res) => res.sendFile(path.join(__dirname, './views/registro.html')));
