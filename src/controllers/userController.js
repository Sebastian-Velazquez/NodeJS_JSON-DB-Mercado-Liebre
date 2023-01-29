const {validationResult} = require('express-validator'); //validationResult es una funcion que tambien nos lo da express-validator 
const User = require('../models/User')

const controlador ={ //IMPORTANTE
    register:(req, res)=>{
        return res.render('register');
    },
    processRegister:(req,res)=>{
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){//resultValidation.errors es un objeto literal
        return res.render('register', {
            errors: resultValidation.mapped(), //mapped: pasa la variable resultValidation a literiario 
            oldData: req.body //Para mostrar los datos bien ingresados
            }) 
        }

        let userToCreate = {//no me qedo entendido .. creo que es oara sacar el pash y no mostrar toda la infomacion del la ruta
            ...req.body,
            image: req.file.filename
        }

        User.create(userToCreate);
        return res.send('Te registrarte con exito')
    },
    loguearse:(req, res)=>{
        return res.render('login');
    },
    processLoguearse:(req, res) => {
        return res.send("esta en el proceso de login")
    }
}

        //exportamos el objeto literal con sus metodos
        module.exports = controlador;