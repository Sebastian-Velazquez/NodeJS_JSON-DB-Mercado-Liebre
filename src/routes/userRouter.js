
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();
//const path = require("path");//para multer


// llamamos a la ruta de controlador
const userController = require("../controllers/userController.js");

//Middleware
const upload = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/userRouter/validationMiddlewares");




// procesa pedido de get. Ahora usamos router en MVC. son tutas 
/* router.get("/list", mainController.list); */ //EJEMPLO DE PRAMETRO COMPARTIDO

// procesa pedido de get. Ahora usamos router en MVC. son tutas 
//para ir a la pagina de registro
router.get("/register/", userController.register);
router.post("/register/", upload.single("image"), validations, userController.processRegister);//Validarios entre la direccion el controlador
//para ir a la pagina de login
router.get("/login/", userController.loguearse);
router.post("/login/", userController.processLoguearse);


module.exports = router;