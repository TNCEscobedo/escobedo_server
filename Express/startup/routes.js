const usuarios = require("../routes/usuarios");
const colonias = require("../routes/colonias");
const cobros = require("../routes/cobros");
const mercados = require("../routes/mercados");
module.exports = function(app){
    app.use('/usuarios', usuarios);
    app.use('/cobros', cobros);
    app.use('/colonias', colonias);
    app.use('/mercados', mercados);
}