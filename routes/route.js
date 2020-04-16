let express = require('express');
let router = express.Router();

let login = require("./login");

router.use("/login", login);

router.get('/', function(req, res){    
    res.send("Welcome to Node JS V1");
});

module.exports = router;