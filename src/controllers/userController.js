const {validationResult} = require('express-validator'); //validationResult es una funcion que tambien nos lo da express-validator 

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