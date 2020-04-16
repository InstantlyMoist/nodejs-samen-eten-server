let fs = require('fs');
let users = require("./users.json");
let jwt = require('jsonwebtoken');

let userExists = (email) => {
    return users[email.toLowerCase()] != null;
};

let passwordOk = (email, password) => {
    return users[email.toLowerCase()] == password;
};

let generateToken = (email, secret) => {
    let token = jwt.sign(
        {
            email: email
        },
        secret,
        {
            expiresIn: "1h"
        }
    );
    return token;
};

let insertUser = (email, password) => {
    users[email] = password;
    fs.writeFileSync("./users.json", JSON.stringify(users));
    return;
};

exports.insertUser = insertUser;
exports.generateToken = generateToken;
exports.userExists = userExists;
exports.passwordOk = passwordOk;