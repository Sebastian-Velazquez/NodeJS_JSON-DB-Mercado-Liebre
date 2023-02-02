const fs = require('fs');
const path = require('path'); 
const {validationResult} = require('express-validator'); //validationResult es una funcion que tambien nos lo da express-validator 

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
        //validacion
        const resultValidation = validationResult(req);//validacion
        if (resultValidation.errors.length > 0){//resultValidation.errors es un objeto literal//mapped: pasa la variable resultValidation a literiario
            return res.render('product-create-form', {errors: resultValidation.mapped(), oldData: req.body }) //Para mostrar los datos bien ingresados
            }//si todo esta bien se guarda
            //return res.send('Te registrarte con exito')
        
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
            image: req.file ? req.file.filename : "default-image.png" //if ternario
        }
        // Push - 
        products.push(productoNuevo);
        
        //Grabamos en la BD
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null," "));//Es para suscribir en la base de datos json
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
        //validation
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
           let id = req.params.id //esto es lo que nos llega por parametro
            const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
           //Retorna el producto con el id mandado del req.params.id
            let productFiltrado = products.find(producto=>{
                return producto.id == id;
            })
           //Listo para mandar a .ejs//se pone el nombre del ejs entre ''.
            return res.render('product-edit-form',{
                producto:productFiltrado,
                errors: resultValidation.mapped()
            });
        }


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
            image: req.file ? req.file.filename : productoIdBody.image
        }
        // MOdificar el array en el Id que esta posicionado - 
        let indice = products.findIndex(producto =>{
            return producto.id == id;
        })
        //en products donde se encontro el indice se va a reemplazar por el producto editado en la pagina ejs req.body
        products[indice] = productoEditado
        //Grabamos en la BD
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null," "));//
        // la barra es porque vamos a una direccion que es la de lista de productos -- controller list
        res.redirect("/product/list")
    },
    //-----------------------------FIN  Editar Producto--------------------------


    //-----------------------------DELETE------------------------------------
    delete:(req, res)=>{//eliminar de BD
        let id = req.params.id //esto es lo que nos llega por parametro
        
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //Retorna todos los id menos el que esta en la condicion
        let productFiltrado = products.filter(producto=>{
            return producto.id != id;
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(productFiltrado, null," "));//
        res.redirect("/product/list")
    }
}

        //exportamos el objeto literal con sus metodos
        module.exports = controlador;
