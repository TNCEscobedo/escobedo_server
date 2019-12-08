const express = require("express");
const router = express.Router();
const { query } = require("../db.js");

router.get("/", async (req,res)=>{
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
router.post("/", async (req,res)=>{
    try{
        const  {idPuesto,idMercado,idInspecto,nombre,monto,pagado,idTarifa,folio,fecha_hora}= req.body;
        query(
            `CALL insertCobro(${idPuesto},${idMercado},${idInspecto},${nombre},${monto},${pagado},${idTarifa},${folio},${fecha_hora})`,
            function(err, results, fields) {
                if(err) return res.status(500).send(err.message);
                res.send(results);
            }
        );
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.put("/", async (req,res)=>{
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