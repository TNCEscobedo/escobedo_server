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
        const {nombre, uid, tipo} = req.body;
        query(
            `CALL insertUsuario("${nombre}","${uid}",${tipo})`,
            function(err, results, fields) {
                if(err) return res.status(500).send(err.message);
                res.send();
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
router.delete("/:uidUsuario", async (req,res)=>{
    try{
        const {uidUsuario} = req.params;
        query(
            `CALL deleteUsuario("${uidUsuario}")`,
            function(err, results, fields) {
                if(err) return res.status(500).send(err.message);
                res.send("Inspector con ID: "+uidUsuario+" ELIMINADO");
            }
        );
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;