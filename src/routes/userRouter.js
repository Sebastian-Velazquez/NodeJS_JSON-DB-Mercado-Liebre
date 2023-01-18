
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();
const {body} = require("express-validator");//para validar solo lo que nos pasa el body//Tambien en vez de body podemos usar check()

// llamamos a la ruta de controlador
const userController = require("../controllers/userController.js");

//ponemos en una variable las validaciones que necesitamos
//https://github.com/validatorjs/validator.js Para buscar
const validations =[
    body('firstName').notEmpty().withMessage('Tienes que escribir tu nombre'),  //firstName sale del name de ejs. notEmty es una validacion, valida si el campo esta vacio
    body('lastName').notEmpty().withMessage('Tienes que escribir tu apellido'),//withMessage: para cambiar el mesaje de error
    body('email').notEmpty().withMessage('Tienes que escribir tu email'),
    body('password').notEmpty().withMessage('Tienes que escribir un password'),
    body('repeatPassword').notEmpty().withMessage('Tienes que escribir un password'),
];


// procesa pedido de get. Ahora usamos router en MVC. son tutas 
/* router.get("/list", mainController.list); */ //EJEMPLO DE PRAMETRO COMPARTIDO

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
//para ir a la pagina de registro
router.get("/register/", userController.register);
router.post("/register/", validations, userController.processRegister);//Validarios entre la direccion el controlador
//para ir a la pagina de login
router.get("/login/", userController.loguearse);
router.post("/login/", userController.processLoguearse);


module.exports = router;