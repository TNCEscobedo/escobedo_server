const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");
const moment = require("moment");
router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getGiros()`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {idPuesto,idMercado,idInspector, nombre, monto, pagado, idTarifa, folio, fecha_hora} = req.body;
        const result = await db.rawQuery(`CALL insertCobro(idPuesto,idMercado,idInspector, nombre, monto, pagado, idTarifa, folio, fecha_hora)`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/:idGiro", async (req,res)=>{
    try{
        const {nombre} = req.body;
        await db.rawQuery(`CALL updateGiro(${req.params.idGiro},"${nombre}")`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/:idGiro", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL deleteGiro(${req.params.idGiro})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;