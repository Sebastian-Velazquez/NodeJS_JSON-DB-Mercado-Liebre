
//va siempre
//llama expres y guarda la ejecucion de router
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");//para multer
const {body} = require("express-validator");//para validar solo lo que nos pasa el body//Tambien en vez de body podemos usar check()

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

// llamamos a la ruta de controlador
const userController = require("../controllers/userController.js");

//ponemos en una variable las validaciones que necesitamos
//https://github.com/validatorjs/validator.js Para buscar
const validations =[
    body('firstName').notEmpty().withMessage('Tienes que escribir tu nombre'),  //firstName sale del name de ejs. notEmty es una validacion, valida si el campo esta vacio
    body('lastName').notEmpty().withMessage('Tienes que escribir tu apellido'),//withMessage: para cambiar el mesaje de error
    body('email').notEmpty().withMessage('Tienes que escribir tu email').bail()//bail para que cote la ejecicion, en este caso si hay un campo vacio
                .isEmail().withMessage('Debes escribir un formato de email correcto. Ejemplo, info@mail.com'),
    body('password').notEmpty().withMessage('Tienes que escribir un password'),
    body('repeatPassword').notEmpty().withMessage('Tienes que escribir un password'),
    body('image').custom((value, {req})=> {
        let file = req.file;
        /* console.log(file) */
        let aceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
        
        if (!file){
            throw new Error('Tenes que subir una imagen'); //sacado directamente de express-validator
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!aceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidos son ${aceptedExtensions.join(', ')}`)
            }
        }
        return true
    })
];


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