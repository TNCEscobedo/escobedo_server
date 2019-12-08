const express = require("express");
const port = 4000;
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const { connect } = require("./db.js");
//const admin = require("firebase-admin");
//const serviceAccount = require("./firebaseKey.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-8afcb.firebaseio.com"
});
*/
connect(() => {
 require("./startup/routes.js")(app);
    http.listen(port, () =>
        console.log(`Hackathon Escobedo server running on Port:${port}!`)
    );
});
