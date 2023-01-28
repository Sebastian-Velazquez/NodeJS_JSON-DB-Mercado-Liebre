//Se crea un metodo literal aca, que contendra todos lo metodos para el registro de usuario


const fs = require('fs');
const path = require('path'); 


const User = {
    //ubucacion de la base de datos-
    fileName: path.join(__dirname, '../data/userDataBase.json'),
    //llamo a la DB y lo convierto en array para poder usarlo
    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    findAll: function(){ //lo mismo que getData. Puede que se use para poder editar la DB sin tocar el getData
        return this.getData();
    },
    //buscar por ID
    findByPk: function(id){
        let allUsers = this.findAll();//llamo a todos los usuarios
        let userFound = allUsers.find(oneUser => oneUser.id === id);//estoy viendo que el id de allusers es igual al id recibido.
        return userFound; //retorna el usuario con el id igual al pasado por parametro
    },
    //buscar por cualquier capo que yo ponga en el parametro
    //Recordemos que find busca el primero, por eso es conveniente usarlo en claves primarias y foraneas, osea compos cuyo dato no se repite.
    findByField: function(field,text){
        let allUsers = this.findAll();//llamo a todos los usuarios
        let userFound = allUsers.find(oneUser => oneUser[field] === text);//estoy valida cuando el field que me pasan es igual al texto que me pasan
        return userFound; //retorna el usuario con el id igual al pasado por parametro
            //ejemplo para entender(sacarlo del array): console.log(User.findByField('email','gsantora1@slideshare.net')); 
            //ejeturar en la consola: node src/models/User.js
    },
    create: function(userData){
    }
}
console.log(User.findByField('email','gsantora1@slideshare.net'));