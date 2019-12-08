const inspectores = require("../routes/inspectores");

module.exports = function(app){
    app.use('/inspectores', inspectores);
}