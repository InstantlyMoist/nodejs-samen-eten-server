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
    if (receivedUser.studentNr == null) res.end("MISSING_FIELD");
    if (receivedUser.password == null) res.end("MISSING_FIELD");
    res.end("ok");
});

module.exports = router;