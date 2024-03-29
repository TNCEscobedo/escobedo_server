const express = require("express");
const router = express.Router();
const { query } = require("../db.js");
const db = require("tnc_mysql_connector2");
router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getDescuentos()`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {razon, idOferente} = req.body;
        const result = await db.rawQuery(`CALL insertDescuento("${razon}", ${idOferente})`);
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/:idDescuento", async (req,res)=>{
    try{
        const{autorizacion, idUsuario} = req.body;
        const result = await db.rawQuery(`CALL updateDescuento(${req.params.idDescuento},"${autorizacion}","${idUsuario}")`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/:idDescuento", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL deleteDescuento(${req.params.idDescuento})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;