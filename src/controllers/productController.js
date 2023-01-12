const fs = require('fs');
const path = require('path'); 

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

const controlador ={ //IMPORTANTE
    //-----------------------------OFERTA---------------------------------------
    oferta:(req, res)=>{
            let listaOferta = [
                'lavadora',
                'licuadora',
                'destornillador'
            ];

            res.render('ofertas',{'listaOferta':listaOferta})
    },
    //-----------------------------DETAIL------------------------------------------
    detail:(req, res)=>{//devolver un detalle de producto- Se usa GET
        let id = req.params.id //esto es lo que nos llega por parametro
        
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //Retorna el producto con el id mandado del req.params.id
        let productFiltrado = products.find(producto=>{
            return producto.id == id;
        })

        //cualculo del descuento de la pagina detalle de producto
        let totalPrice = productFiltrado.price - ((productFiltrado.price * productFiltrado.discount)/100);
        /* console.log(totalPrice); */

        //Listo para mandar a .ejs
        res.render('detail',{
            producto:productFiltrado,
            totalPrice:totalPrice});
    },

    //-----------------------------CREATE------------------------------------------
    //nos manda a la pagina de vender.. Osea crear un producto para vender
    create:(req, res)=>{//va a una pagina
        res.render('product-create-form');
    },

    //-----------------------------PROCESSCREATE------------------------------------
    //Llenamos la pagina para crear un producto para vender y lo guadamos en la BD
    processCreate:(req, res)=>{
        res.send(req.body);
    },

    //-----------------------------LIST------------------------------------
    list:(req, res)=>{//muestra todos los productos de la lista
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('products',{'listaProductos':products})//es 'prodct' porque acordate que es el archivo .ejs el que.. antes coincidia.. se cambio para ser mas claros.
    }
}

        //exportamos el objeto literal con sus metodos
        module.exports = controlador;
