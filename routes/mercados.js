const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");
const { token } = require("../middleware/token");
const fbAuth = require("../middleware/fbAuth");

router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getMercados()`);
        res.send(result[0]);     
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.get("/:idMercado", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getPuestosMercado(${req.params.idMercado})`);
        res.send(result[0]);     
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {idUsuario,idMercado,fecha} = req.body;
        const result = await db.rawQuery(`CALL getPuestosMercado(${idUsuario},${idMercado},${fecha})`);
        res.send(result[0]);     
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {idColonia, dia, turno, inicia, termina, anexo} = req.body;
        const result = await db.rawQuery(`CALL insertMercado(${idColonia}, ${parseInt(dia)}, "${turno}", "${inicia}", "${termina}", "${anexo}")`);
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/:idMercado", async (req,res)=>{
    try{
        const {colonia, dia, turno, inicia, termina, anexo} = req.body;
        const result = await db.rawQuery(`CALL updateMercado(${req.params.idMercado},${colonia}, ${parseInt(dia)}, "${turno}", "${inicia}", "${termina}", "${anexo}")`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/:idMercado", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL deleteMercado(${req.params.idMercado})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/inspector/:idMercado",[token,fbAuth], async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL deleteInspectorMercado(${req.fbUID},${req.params.idMercado})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/puesto/:idMercado/:idPuesto",[token,fbAuth], async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL deleteMercadoPuesto(${req.params.idPuesto},${req.params.idMercado})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;