let express = require('express');
let router = express.Router();
let user = require("./../user.js");

router.get('/', (req, res) => {    
    res.send("Welcome to LOGIN JS V1");
});

router.post('/', (req, res) => {
    let receivedUser = new user(req.body);
    if (receivedUser.firstName == null) res.end("MISSING_FIELD");
    if (receivedUser.lastName == null) res.end("MISSING_FIELD");
    if (receivedUser.email == null) res.end("MISSING_FIELD");
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(receivedUser.email).toLowerCase())) res.end("INVALID_EMAIL");
    if (receivedUser.studentNr == null) res.end("MISSING_FIELD");
    if (receivedUser.password == null) res.end("MISSING_FIELD");
    res.end("ok");
});

module.exports = router;