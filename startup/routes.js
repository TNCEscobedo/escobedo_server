const usuarios = require("../routes/usuarios");
const colonias = require("../routes/colonias");
const cobros = require("../routes/cobros");
const mercados = require("../routes/mercados");
const puestos = require("../routes/puestos");
const descuentos = require("../routes/descuentos");
module.exports = function(app){
    app.use('/usuarios', usuarios);
    app.use('/cobros', cobros);
    app.use('/colonias', colonias);
    app.use('/mercados', mercados);
    app.use('/puestos', puestos);
    app.use('/descuentos', descuentos);
}