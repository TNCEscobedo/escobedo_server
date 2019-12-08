const express = require("express");
const router = express.Router();
const { query } = require("../db.js");
const db = require("tnc_mysql_connector2");
router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL insertDescuento("${razon}", ${idOferente})`);
        res.send(result);
        
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
        const{idColonia,nombre} = req.body;
        const result = await db.rawQuery(`CALL updateColonia(${idColonia},"${nombre}")`);
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