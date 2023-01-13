
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const homeController = require("../controllers/homeController.js")

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
/* router.get("/list", mainController.list); */ //EJEMPLO DE PRAMETRO COMPARTIDO

// procesa pedido de get. Ahora usamos router en MVC. son tutas  //asd
router.get("/", homeController.index);

module.exports = router;