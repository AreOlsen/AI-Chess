
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.listen(port, () => {
    console.log(`Running on port : ${port}`)
})
