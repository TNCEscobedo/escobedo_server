const express = require("express");
const router = express.Router();
const db = require("tnc_mysql_connector2");
const moment = require("moment");
const {token} = require("../middleware/token");
const fbAuth = require("../middleware/fbAuth");

router.get("/", async (req,res)=>{
    try{
        let {fecha,fechaInicio,fechaFin} = req.query;
        if(fecha){
            const result = await db.rawQuery(`CALL getInspectoresDia("${fecha}")`);
            res.send(result[0]);
        }else{
            
            const result = await db.rawQuery(`CALL getInspectoresIntervalo("${fechaInicio}", "${fechaFin}")`);
            res.send(result[0]);
        }
    }catch(error){
        res.status(500).send(error.message);
    }
});

module.exports = router;
