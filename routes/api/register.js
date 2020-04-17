let fs = require('fs');
let express = require('express');
let router = express.Router();
let user = require("../../user.js");
let users = require("../../users.json");
let errorhandler = require("../../error_handler.js");
let tokenhandler = require("../../token_handler.js");

router.get('/', (req, res) => {    
    res.send("Welcome to LOGIN JS V1");
});

router.post('/', (req, res) => {
    let receivedUser = new user(req.body);
    if (!res._headerSent && receivedUser.firstName == null) errorhandler.createError(res, "MISSING_FIELD_FIRSTNAME", 400);
    if (!res._headerSent && receivedUser.lastName == null) errorhandler.createError(res, "MISSING_FIELD_LASTNAME", 400);
    if (!res._headerSent && receivedUser.email == null) errorhandler.createError(res, "MISSING_FIELD_EMAIL", 400);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!res._headerSent && !re.test(String(receivedUser.email).toLowerCase())) errorhandler.createError(res, "INVALID_EMAIL", 400);
    if (!res._headerSent && receivedUser.studentNr == null) errorhandler.createError(res, "MISSING_FIELD_STUDENTNR", 400);
    if (!res._headerSent && receivedUser.password == null) errorhandler.createError(res, "MISSING_FIELD_PASSWORD", 400);
    //TODO: ! HASH BEFORE COMPARING !
    if (!res._headerSent && JSON.stringify(users['users']).includes(JSON.stringify(receivedUser))) errorhandler.createError(res, "USER_EXISTS", 400);
    if (res._headerSent) return;

    // Finish logic
    let token = tokenhandler.createAndCacheToken(res, 1, receivedUser.email);
    users['users'].push(receivedUser);
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.status(200).end(JSON.stringify({
        username: `${receivedUser.firstName} ${receivedUser.lastName}`,
        token: token,
    }));
});

module.exports = router;