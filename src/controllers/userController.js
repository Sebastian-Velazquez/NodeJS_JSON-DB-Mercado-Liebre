const controlador ={ //IMPORTANTE
    register:(req, res)=>{
        return res.render('register');
    },
    loguearse:(req, res)=>{
        return res.render('login');
    },
}

        //exportamos el objeto literal con sus metodos
        module.exports = controlador;