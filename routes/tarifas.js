const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");

router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getTarifas()`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {monto, superficie} = req.body;
        const result = await db.rawQuery(`CALL insertTarifa(${monto},${superficie})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/:idTarifa", async (req,res)=>{
    try{
        const {monto, superficie} = req.body;
        await db.rawQuery(`CALL updateTarifa(${idTarifa},${monto},${superficie})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/:idTarifa", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL deleteTarifa(${req.params.idTarifa})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;