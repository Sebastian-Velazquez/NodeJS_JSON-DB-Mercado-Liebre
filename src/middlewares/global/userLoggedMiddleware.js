//es un middleware de aplicaion o global. Se colocan en app.js// estos siempre estan ejecuandose, o cada vista y elementos.
function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    
    if(req.session && req.session.userLogged){
    res.locals.isLogged = true;
    //pasa las variables que tiene en session a locals
    res.locals.userLogged = req.session.userLogged;//para poder usar variables locales que puedan ser usadas en distitas vistas.
    }
    next(); 
}
module.exports = userLoggedMiddleware;