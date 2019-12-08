const express = require("express");
const port = 4000;
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const db = require("tnc_mysql_connector2");
//const admin = require("firebase-admin");
//const serviceAccount = require("./firebaseKey.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-8afcb.firebaseio.com"
});
*/
db.connect({
  host: "198.54.116.46",
  port: 21098,
  user: "merczqsp",
  password: "#Ironman19"
},{
  host: "127.0.0.1",
  user: "merczqsp_zablah",
  password: "#Ironman19",
  database: "merczqsp_mercash"
}).then(()=>{
  require("./startup/routes.js")(app);
  http.listen(port, () =>
        console.log(`Hackathon Escobedo server running on Port:${port}!`)
    );
});
