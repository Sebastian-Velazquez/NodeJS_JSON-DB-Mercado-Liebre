const fs = require('fs');
const path = require('path'); 

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
/* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

const controlador ={ //
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

     //-----------------------------INICIO Crear Producto---------------------
    //-----------------------------CREATE-------------------------------------
    //nos manda a la pagina de vender.. Osea crear un producto para vender
    create:(req, res)=>{//va a una pagina
        res.render('product-create-form');
    },


    //-----------------------------PROCESSCREATE-------------------------------
        //Llenamos la pagina para crear un producto para vender y lo guadamos en la BD
    processCreate:(req, res)=>{
        //llamamos a todos lo datos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        //un array para guardar la informacion que vinene re.body
        //Estos campos entan en el name en el html.. Son los que toma el req.body
        //Tiene que cioncidir tanto tanto en BD como en el html en la etiqueta name=""
        let productoNuevo ={
            id: products.length + 1, //revisa el ultimo en la BD y le suma 1. para no pisar los ID que son valores unicios y secuencial
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            image: 'default-image.png'
        }
        // Push - 
        products.push(productoNuevo);
        
        //Grabamos en la BD
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null," "));//??
        // la barra es porque vamos a una direccion que es la de lista de productos -- controller list
        res.redirect("/product/list")//se hace un nuevo pedido al servidor y se va o nos refresca en la patalla una vez guardado el lista de producto controlloer list
    },
    //-----------------------------FIN  Crear Producto------------------------



    //-----------------------------LIST---------------------------------------
    list:(req, res)=>{//muestra todos los productos de la lista
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('products',{'listaProductos':products})//es 'prodct' porque acordate que es el archivo .ejs el que.. antes coincidia.. se cambio para ser mas claros.
    },


     //-----------------------------INICIO Editar Producto---------------------
    //-----------------------------EDIT----------------------------------------
    edit:(req, res)=>{
        let id = req.params.id //esto es lo que nos llega por parametro
        
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //Retorna el producto con el id mandado del req.params.id
        let productFiltrado = products.find(producto=>{
            return producto.id == id;
        })

        //Listo para mandar a .ejs//se pone el nombre del ejs entre ''.
        res.render('product-edit-form',{producto:productFiltrado,});
    },
    //-----------------------------processEdit----------------------------------
    processEdit:(req, res)=>{
        //llamamos a todos lo datos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let id = req.params.id; 
        let productoIdBody = products.find(producto=>{
            return producto.id == id;
        })
    
        let productoEditado ={
            id: productoIdBody.id, 
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            image: productoIdBody.image
        }
        // MOdificar el array en el Id que esta posicionado - 
        let indice = products.findIndex(producto =>{
            return producto.id == id;
        })
        console.log(indice);
        console.log(productoEditado);
        //Grabamos en la BD
        /* fs.writeFileSync(productsFilePath, JSON.stringify(products, null," "));//?? */
        // la barra es porque vamos a una direccion que es la de lista de productos -- controller list
        res.redirect("/product/list")
    },
    //-----------------------------FIN  Crear Producto--------------------------


    //-----------------------------DELETE------------------------------------
    delete:(req, res)=>{//eliminar de BD
        let id = req.params.id //esto es lo que nos llega por parametro
        
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //Retorna el producto con el id mandado del req.params.id
        let productFiltrado = products.find(producto=>{
            return producto.id == id;
        });
        res.send("Producto " + productFiltrado.name + " eliminado");
        
    }
}

        //exportamos el objeto literal con sus metodos
        module.exports = controlador;
