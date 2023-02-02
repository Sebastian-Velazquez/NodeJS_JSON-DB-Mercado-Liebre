
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();

// llamamos a la ruta de controlador
const userController = require("../controllers/userController.js");

//Middleware
const upload = require("../middlewares/userRouter/multerMiddlewaresUser");
const validations = require("../middlewares/userRouter/validationMiddlewares");
const guestMiddlewares = require("../middlewares/userRouter/guestMiddlewares");//si tengo alguein en session
const authMiddlewares = require("../middlewares/userRouter/authMiddlewares");//si no tengo a nadie en session


//para ir a la pagina de registro
router.get("/register/", guestMiddlewares, userController.register);
router.post("/register/", upload.single("image"), validations, userController.processRegister);//Validarios entre la direccion el controlador
//para ir a la pagina de login
router.get("/login/", guestMiddlewares, userController.loguearse);
router.post("/login/", userController.processLoguearse);
//para ir a la pagina de perfil de Usuario
router.get("/profile/", authMiddlewares,userController.profile);
//para salir del login.. crerrar ceunta
router.get("/logout/", userController.logout);

module.exports = router;