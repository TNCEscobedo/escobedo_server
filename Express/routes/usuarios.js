const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");
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
        const result = await db.rawQuery(`CALL insertUsuario("${nombre}","${uid}",${tipo})`);
        res.sendStatus(200);
        
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
        const result = await db.rawQuery(`CALL deleteUsuario("${uidUsuario}")`);
        res.sendStatus(200);
        
    }catch(error){
        res.status(500).send(error.message);
    }
});
module.exports = router;