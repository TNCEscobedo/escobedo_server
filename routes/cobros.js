const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");
const moment = require("moment");
router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getCobros()`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.get("/fecha", async (req,res)=>{
    try{
        let parsedFecha = moment(req.query.fecha).toISOString();
        console.log(parsedFecha);   
        const result = await db.rawQuery(`CALL getCobrosFecha("${parsedFecha}")`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.get("/:uid", async (req,res)=>{
    try{
        let parsedFecha = moment(req.query.fecha).toISOString();
        console.log(parsedFecha);   
        const result = await db.rawQuery(`CALL getCobrosFecha("${parsedFecha}")`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        let {idPuesto,idMercado,idInspector, nombre, monto, pagado, idTarifa, folio, fecha_hora} = req.body;
        let parsedFecha = moment.unix(fecha_hora).toISOString();
        console.log(parsedFecha);
        if(pagado){
            pagado = 1;
        }else{pagado = 0;}
        console.log(`CALL insertCobro(${idPuesto},${idMercado},${idInspector}, "${nombre}", ${monto}, ${pagado}, ${idTarifa}, ${folio}, ${parsedFecha})`);
        const result = await db.rawQuery(`CALL insertCobro(${idPuesto},${idMercado},${idInspector}, "${nombre}", ${monto}, ${pagado}, ${idTarifa}, ${folio}, "${parsedFecha}")`);
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