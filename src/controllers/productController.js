const controlador ={ //IMPORTANTE
    oferta:(req, res)=>{
            let listaOferta = [
                'lavadora',
                'licuadora',
                'destornillador'
            ];

            res.render('ofertas',{'listaOferta':listaOferta})
    },
}

        //exportamos el objeto literal con sus metodos
        module.exports = controlador;
