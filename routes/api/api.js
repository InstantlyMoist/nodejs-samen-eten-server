let express = require('express');
let router = express.Router();

let info = require("./info.js");
let login = require("./login");
let register = require("./register");

router.use("/info", info);
router.use("/login", login);
router.use("/register", register);

router.get('/', function(req, res){  
    console.log(req.cookies)  
    res.send("Welcome to Node JS V1");
});

module.exports = router;