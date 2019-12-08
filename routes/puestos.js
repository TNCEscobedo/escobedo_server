const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");

router.get("/", async (req,res)=>{
    try{
        const result = await db.rawQuery(`CALL getPuestos()`);
        res.send(result);
        
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
        const {idPersona, idGiro,idTarifa} = req.body;
        const result = await db.rawQuery(`CALL insertPuesto(${idPersona},${idGiro},${idTarifa})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/", async (req,res)=>{
    try{
        const {idPuesto, idGiro,idTarifa} = req.body;
        await db.rawQuery(`CALL updatePuesto(${idPuesto},${idGiro},${idTarifa})`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/", async (req,res)=>{
    try{
        query(
            'SELECT * FROM cobro',
            function(err, results, fields) {
                if(err) return res.status(500).send(err.message);
                res.send(results);
            }
        );
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;