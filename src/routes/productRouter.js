
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();
//const multer = require("multer");

//Controllers
const productController = require("../controllers/productController.js");

router.get("/ofertas/", productController.oferta);// procesa pedido de get. Ahora usamos router en MVC. son tutas 

//Middleware
const upload = require("../middlewares/productRouter/multerMiddlewareProducts");
const validations = require("../middlewares/productRouter/validationsMiddleware")
const validationsEdit = require("../middlewares/productRouter/validationsMiddlewareProductEdit")
const authMiddlewares = require("../middlewares/userRouter/authMiddlewares");//si no tengo a nadie en session

//devolver o mandar un producto a detalle de producto
router.get("/detail/:id", productController.detail);
//Crear producto //upload.single("productImage")... productImage es el name del input tipo file//es para manejar multer y que solo revise ese pedido.. si queremos que lo tenga otro pedidom ponemos lo mismo
router.get("/create/",authMiddlewares, productController.create);//muestra la vista o pagina
router.post("/create/", upload.single("image"),validations,productController.processCreate);//se encarga de procesar los datos cuando se ejecuta el boton comi
//manda toda la lista de productos Lista de producto sd asd
router.get("/list", productController.list);
//Editar prducto get y put
router.get("/edit/:id/",authMiddlewares, productController.edit);
router.put("/edit/:id/", upload.single("image"),validationsEdit, productController.processEdit);//en el form se usa POST -- pero se usa ?_method=PUT en action
//Eliminar un prducto
router.delete("/delete/:id/",authMiddlewares, productController.delete);

module.exports = router;




//importante en el form del ejs el enctype con multer para subir imagenes
//<form action="/product/create" method="POST" enctype="multipart/form-data">
// procesa pedido de get. Ahora usamos router en MVC. son tutas 
/* router.get("/list", mainController.list); */ //EJEMPLO DE PRAMETRO COMPARTIDO