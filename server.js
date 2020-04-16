let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
let moment = require('moment');
let app = express();
let user = require("./user");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
let port = process.env.PORT || 3000;
let secret = process.env.JWT_SECRET || "hello";

console.log(user.userExists("hi"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.get('/', (req, res) => {
    console.log(req.cookies);
    try {
        let token = jwt.verify(req.cookies.access_token, secret);
        res.send('hello world');
        //next();
    } catch (ex) {
        res.redirect("/login");
    }
});

app.get('/makerinfo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let creatorObject = {
        "name": "Kyllian Warmerdam",
        "studentNumber": "2158151",
        "description": "This application is designed to bring people together, with food.",
        "sonarCube": "COMING_SOON"
    }
    res.send(JSON.stringify(creatorObject));
});

app.get('/login', (req, res) => {
    res.sendFile("login.html", { root: '.' });
});

app.post('/login', (req, res) => {
    console.log(req.cookies);
    if (!req.body.email) {
        res.send("Please specify an email");
        return;
    }
    if (!req.body.password) {
        res.send("Please specify an password");
        return;
    }
    if (!user.userExists(req.body.email)) {
        res.send("Email does not exist");
        return;
    }
    if (!user.passwordOk(req.body.email, req.body.password)) {
        res.send("Password incorrect");
        return;
    }
    let token = user.generateToken(req.body.email, secret);
    res.header("Set-Cookie", `access_token=${token}`);
    res.send({
        user: req.body.email,
        token: token
    });
});

app.get('/register', (req, res) => {
    res.sendFile("register.html", { root: '.' });
});

app.post('/register', (req, res) => {
    console.log(req.cookies);
    if (!req.body.email) {
        res.send("Please specify an email");
        return;
    }
    if (!req.body.password) {
        res.send("Please specify an password");
        return;
    }
    if (user.userExists(req.body.email)) {
        res.send("Email already exists");
        return;
    }
    let token = user.generateToken(req.body.email, secret);
    user.insertUser(req.body.email, req.body.password);
    res.header("Set-Cookie", `access_token=${token}`);
    res.redirect("/login");
});

app.listen(port, () => console.log(`NodeJS Samen Eten Server is now running at http://localhost:${port}`));

