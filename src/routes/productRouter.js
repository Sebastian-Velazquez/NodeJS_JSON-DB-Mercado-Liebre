
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const productController = require("../controllers/productController.js")

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
/* router.get("/list", mainController.list); */ //EJEMPLO DE PRAMETRO COMPARTIDO

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
router.get("/ofertas/", productController.oferta);

//devolver o mandar un producto a detalle de producto
router.get("/detail/:id", productController.detail);

//Va al pagina de crear producto
router.get("/create/", productController.create);//muestra la vista o pagina
router.post("/create/", productController.processCreate);//se encarga de procesar los datos cuando se ejecuta el boton comit

//manda toda la lista de productos Lista de producto sd asd
router.get("/list", productController.list);

//Editar prducto get y put
router.get("/edit/:id/", productController.edit);
router.put("/edit/:id/", productController.update);//en el form se usa PUT -- pero se usa ?_method=PUT en action

//Eliminar un prducto
router.delete("/delete/:id/", productController.delete);

module.exports = router;