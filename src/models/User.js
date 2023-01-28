//Se crea un metodo literal aca, que contendra todos lo metodos para el registro de usuario


const fs = require('fs');
const path = require('path'); 


const User = {
    fileName: path.join(__dirname, '../data/userDataBase.json'),
    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    create: function(userData){
    }
}
console.log(User.getData());