
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const userController = require("../controllers/userController.js")

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
/* router.get("/list", mainController.list); */ //EJEMPLO DE PRAMETRO COMPARTIDO

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
//para ir a la pagina de registro
router.get("/register/", userController.register);
//para ir a la pagina de login
router.get("/login/", userController.loguearse);


module.exports = router;