const express = require("express");
const router = express.Router();
const { query } = require("../db.js");

router.get("/", async (req,res)=>{
    try{
        query(
            `CALL getColonias()`,
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
        const {nombre} = req.body;
        query(
            `CALL insertColonia("${nombre}")`,
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
        const{idColonia,nombre} = req.body;
        query(
            `CALL updateColonia(${idColonia},"${nombre}")`,
            function(err, results, fields) {
                if(err) return res.status(500).send(err.message);
                res.send(results);
            }
        );
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
router.delete("/:idColonia", async (req,res)=>{
    try{
        query(
            `CALL deleteColonia(${req.params.idColonia})`,
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