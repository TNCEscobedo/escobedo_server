const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");

router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getOferentes()`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.get("/:idPersona", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getPuestosOferente("${req.params.idPersona}")`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {nombre, telefono, idColonia} = req.body;
        const result = await db.rawQuery(`CALL insertOferente("${nombre}", "${telefono}",${idColonia})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/:idOferente", async (req,res)=>{
    try{
        const {nombre, telefono, idColonia} = req.body;
        const result = await db.rawQuery(`CALL updateOferente(${idColonia},"${nombre}", "${telefono}",${idColonia})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;