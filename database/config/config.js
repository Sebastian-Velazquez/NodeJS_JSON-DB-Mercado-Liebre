module.exports = {
  "development": {//base de tatos para desarrollo
    "username": "root",//editar
    "password": "123",//editar
    "database": "database_nombre",//editar
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {//base de tatos para testing
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {//base de tatos para producción
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
