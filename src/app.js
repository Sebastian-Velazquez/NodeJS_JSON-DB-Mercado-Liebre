const express = require('express');
const session = require('express-session');//npm i express-session. Para tener link privados
const path = require('path');
const methodOverride = require('method-override'); // GRUD Para poder usar los métodos PUT y DELETE
const cookie = require('cookie-parser');//modulo para guardar datos del lado del servidor. cache

const app = express();

const userLoggedMiddleware = require("./middlewares/global/userLoggedMiddleware")

//muestra infomacion adicional en la consola si se esta enviando informacion 
const morgan = require('morgan');
app.use(morgan('dev'));//muestra infomacion adicional en la consela si se esta enviando informacion 

// Middlewares
app.use(session({ //npm i express-session. Para bloquear a alguno usuarios que no estan loguados
    secret: "Shh, It's a secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookie());
app.use(userLoggedMiddleware);//
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Para capturar el body
app.use(express.json()); // Para capturar el body
app.use(methodOverride('_method'));//Para crar, eliminar y modificar.. se puede poner cualquier nombre en '_method'

// Middlewares Propios// en app.js son globales. cada vez que pasamos por la pagina el app.js se ejecuta nuevamente
//app.use(middlewarePropio);

//es para que la carpeta del proyecto public sea publicom, van html ejs css
app.set('view engine', 'ejs'); //para usar ejs
app.set('views', path.join(__dirname, '/views')); //Es necesario para que la carpeta views pueda estar adentro de la carpeta src// Define la ubicación de la carpeta de las Vistas


// Importamos routers//const path = require('path');// para accder a las paginas
const homeRouter = require('./routes/homeRouter.js')
const userRouter = require('./routes/userRouter.js')
const productRouter = require('./routes/productRouter.js');


// Usando los enrutadores importados linea 5
app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

//Es para escuchar el servido  hacerlo que ande  en Tander
const port = process.env.PORT || 3001;
app.listen(port,()=> console.log('Servidor corriendo en http://localhost:3001'));


app.use(express.static('public'));//PAra poder poner carpeta en src