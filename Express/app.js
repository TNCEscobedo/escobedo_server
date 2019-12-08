const express = require("express");
const port = process.env.PORT || 4000; //Puerto 4000 o definido por Heroku
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


/*
HEROKU en root
git subtree push --prefix Express heroku master
*/