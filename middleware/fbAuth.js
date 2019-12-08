const admin = require('firebase-admin');

const fbAuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.replace('Bearer ','');
        
        const decodedToken = await admin.auth().verifyIdToken(token);
        if(decodedToken){
            req.email = decodedToken.email;
            req.fbUID = decodedToken.uid;
            req.userName = decodedToken.name;
            next();
    
        }
    }catch(e){
        res.status(401).send("No tienes autorización para ejecutar esta acción");
    }   
}

module.exports = fbAuth;