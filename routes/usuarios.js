const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");

router.get("/", async (req,res)=>{
    try{
        const result = (await db.rawQuery(`CALL getUsuarios()`))[0];
        res.send(result);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.get("/:idTipo", async (req,res)=>{
    try{
        const result = (await db.rawQuery(`CALL getUsuariosTipo(${req.params.idTipo})`))[0];
        res.send(result);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {nombre, uid, correo, tipo} = req.body;
        const result = await db.rawQuery(`CALL insertUsuario("${nombre}","${uid}","${correo}",${tipo})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/:idUsuario", async (req,res)=>{
    try{
        const {nombre, uid, correo, tipo} = req.body;
        const result = await db.rawQuery(`CALL updateUsuario(${req.params.idUsuario},"${nombre}","${correo}",${tipo})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/:uidUsuario", async (req,res)=>{
    try{
        const {uidUsuario} = req.params;
        const result = await db.rawQuery(`CALL deleteUsuario("${uidUsuario}")`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;