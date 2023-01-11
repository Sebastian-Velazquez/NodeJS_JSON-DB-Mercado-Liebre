
const express = require('express');
const morgan = require('morgan');//linea 9
const app = express();

// Importamos routers//const path = require('path');// para accder a las paginas
const homeRouter = require('./routes/homeRouter.js')
const userRouter = require('./routes/userRouter.js')
const productRouter = require('./routes/productRouter.js')

//muestra infomacion adicional en la consela si se esta enviando informacion 
app.use(morgan('dev'));

//es para que la carpeta del proyecto public sea publicom, van html ejs css
app.use(express.static('public'));

//para usar ejs
app.set('view engine', 'ejs'); 

// Usando los enrutadores importados linea 5
app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

//Creación de rutas - resion anterior
/* app.get('/', (req, res) => res.sendFile(path.join(__dirname, './views/home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, './views/login.html')));
app.get('/registro', (req, res) => res.sendFile(path.join(__dirname, './views/registro.html')));

 */



//Es para escuchar el servido  hacerlo que ande  en Tander
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log('Servidor corriendo en http://localhost:3000'));
