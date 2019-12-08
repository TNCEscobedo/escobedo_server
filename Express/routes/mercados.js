const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");

router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getMercados()`);
        res.send(result[0]);     
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {idColonia, dia, turno, inicia, termina, anexo} = req.body;
        const result = await db.rawQuery(`CALL insertMercado(${idColonia}, ${dia}, "${turno}", "${inicia}", "${termina}", "${anexo}")`);
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/", async (req,res)=>{
    try{
        const {idMercado, idColonia, dia, turno, inicia, termina, anexo} = req.body;
        const result = await db.rawQuery(`CALL updateMercado(${idMercado},${idColonia}, ${dia}, "${turno}", "${inicia}", "${termina}", "${anexo}")`);
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
module.exports = router;