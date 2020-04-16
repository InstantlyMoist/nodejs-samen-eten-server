let express = require('express');
let router = express.Router();
let user = require("../../user.js");
let errorhandler = require("../../error_handler.js");
let tokenhandler = require("../../token_handler.js");

router.get('/', (req, res) => {    
    res.send("Welcome to LOGIN JS V1");
});

router.post('/', (req, res) => {
    let receivedUser = new user(req.body);
    if (receivedUser.firstName == null) errorhandler.createError(res, "MISSING_FIELD_FIRSTNAME", 400);
    if (receivedUser.lastName == null) errorhandler.createError(res, "MISSING_FIELD_LASTNAME", 400);
    if (receivedUser.email == null) errorhandler.createError(res, "MISSING_FIELD_EMAIL", 400);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(receivedUser.email).toLowerCase())) errorhandler.createError(res, "INVALID_EMAIL", 400);
    if (receivedUser.studentNr == null) errorhandler.createError(res, "MISSING_FIELD_STUDENTNR", 400);
    //TODO: Reverse hash
    if (receivedUser.password == null) errorhandler.createError(res, "MISSING_FIELD_PASSWORD", 400);
    console.log(tokenhandler);
    let token = tokenhandler.createAndCacheToken(res, 1, receivedUser.email);

    res.status(200).end(JSON.stringify({
        username: `${receivedUser.firstName} ${receivedUser.lastName}`,
        token: token,
    }));
});

module.exports = router;