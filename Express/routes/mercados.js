const express = require("express");
const router = express.Router();
const { query } = require("../db.js");

router.get("/", async (req,res)=>{
    try{
        query(
            `CALL getMercados()`,
            function(err, results, fields) {
                if(err) return res.status(500).send(err.message);
                res.send(results[0]);
            }
        );
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.post("/", async (req,res)=>{
    try{
        const {idColonia, dia, turno, inicia, termina, anexo} = req.body;
        query(
            `CALL insertMercado(${idColonia}, ${dia}, "${turno}", "${inicia}", "${termina}", "${anexo}")`,
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
        const {idMercado, idColonia, dia, turno, inicia, termina, anexo} = req.body;
        query(
            `CALL updateMercado(${idMercado},${idColonia}, ${dia}, "${turno}", "${inicia}", "${termina}", "${anexo}")`,
            function(err, results, fields) {
                if(err) return res.status(500).send(err.message);
                res.send(results);
            }
        );
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/:idMercado", async (req,res)=>{
    try{
        query(
            `CALL deleteMercado(${req.params.idMercado})`,
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