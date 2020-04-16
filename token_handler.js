let jwt = require("jsonwebtoken");
let secret = process.env.JWT_SECRET || "hello";

let createAndCacheToken = (res, id, email) => {
    let expiry = 10;
    let token = jwt.sign({ id, email }, secret, {
        algorithm: 'HS256',
        expiresIn: expiry
    });
    res.cookie('token', token, { maxAge: expiry * 1000 });
    return token;
}

exports.createAndCacheToken = createAndCacheToken;