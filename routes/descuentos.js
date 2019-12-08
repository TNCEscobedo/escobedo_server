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
router.put("/", async (req,res)=>{
    try{
        const{idDescuento,autorizacion} = req.body;
        const result = await db.rawQuery(`CALL updateDescuentos(${idDescuento},"${autorizacion}")`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/:idColonia", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL deleteColonia(${req.params.idColonia})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;