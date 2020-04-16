let express = require('express');
let router = express.Router();

let login = require("./api/login");

router.use("/api/login", login);

router.get('/', function(req, res){  
    console.log(req.cookies)  
    res.send("Welcome to Node JS V1");
});

module.exports = router;