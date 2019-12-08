const Joi = require('@hapi/joi');

const schema = Joi.object({
    token: Joi.string().required()
});

const token = async (req, res, next) => {
    /*if(req.headers.authorization){
        const {error} = schema.validate(req.header.authorization);
        if(error) return res.send('El token es inválido', error);*/
        next();
    /*}
    else{
        return res.status(400).send('La solicitud no incluye un token');
    }*/
    
    
}

module.exports = { token };