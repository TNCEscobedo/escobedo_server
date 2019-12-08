const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");
const moment = require("moment");
const {token} = require("../middleware/token");
const fbAuth = require("../middleware/fbAuth");

router.get("/", async (req,res)=>{
    try{
        if(req.query.fechaFin){
            const result = await db.rawQuery(`CALL getCobrosIntervalo("${req.query.fechaInicio}","${req.query.fechaFin}")`);
            res.send(result[0]);
        }else{
            const result = await db.rawQuery(`CALL getCobros()`);
            res.send(result[0]);
        }
        
        
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
router.get("/oferente",[token,fbAuth], async (req,res)=>{
    try{
        console.log
        const result = await db.rawQuery(`CALL getCobrosOferente(${req.fbUID},${req.query.limInf},${req.query.limSup})`);
        res.send(result[0]);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        let {idPuesto,idMercado,idInspector, nombre, monto, pagado, idTarifa, folio, fecha_hora} = req.body;
        let parsedFecha = moment.unix(fecha_hora).toISOString();
        //console.log(parsedFecha);
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
module.exports = router;