const fs = require('fs');
const path = require('path'); 

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controlador ={ //IMPORTANTE
    index: (req, res)=>{ //renderisar o mustrar una vista(pagina como antes)
       /*  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */
        return res.render('home'); //no es necesario la estencion, lo hago para recordar. es para mostrar un archivo en la pagina
    }, 
    register:(req, res)=>{
        return res.render('register');
    },
    loguearse:(req, res)=>{
        return res.render('login');
    },
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
