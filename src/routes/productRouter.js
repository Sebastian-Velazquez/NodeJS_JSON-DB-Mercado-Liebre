
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");//para multer

//-----------------Multer--------------------
const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null,"public/img/products") //se pone la tura como si estariamos en la raiz del proyecto.
    },
    filename : function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) //se pone la tura como si estariamos en la raiz del proyecto.
    }
})
const upload = multer({storage:storage})
//-----------------Multer Fin--------------------
//importante en el form del ejs el enctype
//<form action="/product/create" method="POST" enctype="multipart/form-data">
// procesa pedido de get. Ahora usamos router en MVC. son tutas 
/* router.get("/list", mainController.list); */ //EJEMPLO DE PRAMETRO COMPARTIDO


// llamamos a la ruta de controlador
const productController = require("../controllers/productController.js");
// procesa pedido de get. Ahora usamos router en MVC. son tutas 
router.get("/ofertas/", productController.oferta);

//devolver o mandar un producto a detalle de producto
router.get("/detail/:id", productController.detail);

//Crear producto //upload.single("productImage")... productImage es el name del input tipo file//es para manejar multer y que solo revise ese pedido.. si queremos que lo tenga otro pedidom ponemos lo mismo
router.get("/create/", productController.create);//muestra la vista o pagina
router.post("/create/", upload.single("productImage"),productController.processCreate);//se encarga de procesar los datos cuando se ejecuta el boton comit

//manda toda la lista de productos Lista de producto sd asd
router.get("/list", productController.list);

//Editar prducto get y put
router.get("/edit/:id/", productController.edit);
router.put("/edit/:id/", upload.single("productImage"), productController.processEdit);//en el form se usa POST -- pero se usa ?_method=PUT en action

//Eliminar un prducto
router.delete("/delete/:id/", productController.delete);

module.exports = router;