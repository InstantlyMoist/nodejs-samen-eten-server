let express = require('express');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
let moment = require('moment');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
let routes = require("./routes/route.js");
app.use("/", routes);
let port = process.env.PORT || 3000;
let secret = process.env.JWT_SECRET || "hello";

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

/*app.get('/', (req, res) => {
    try {
        let token = jwt.verify(req.cookies.access_token, secret);
        res.sendFile("index.html", {root: "."});
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
    try {
        let token = jwt.verify(req.cookies.access_token, secret);
        res.redirect("/");
    } catch (ex) {
        res.sendFile("login.html", { root: '.' });
    }

});

app.post('/login', (req, res) => {
    if (!req.body.email) {
        res.send("SPECIFY_EMAIL");
        return;
    }
    if (!req.body.password) {
        res.send("SPECIFY_PASSWORD");
        return;
    }
    if (!user.userExists(req.body.email)) {
        res.send("CHECK_EMAIL");
        return;
    }
    if (!user.passwordOk(req.body.email, req.body.password)) {
        res.send("CHECK_PASSWORD");
        return;
    }
    let token = user.generateToken(req.body.email, secret);
    res.header("Set-Cookie", `access_token=${token}`);
    res.send('OK');
});

app.get('/register', (req, res) => {
    res.sendFile("register.html", { root: '.' });
});

app.post('/register', (req, res) => {
    if (!req.body.email) {
        res.send("SPECIFY_EMAIL");
        return;
    }
    if (!req.body.password) {
        res.send("SPECIFY_PASSWORD");
        return;
    }
    if (user.userExists(req.body.email)) {
        res.send("EMAIL_EXISTS");
        return;
    }
    let token = user.generateToken(req.body.email, secret);
    user.insertUser(req.body.email, req.body.password);
    res.header("Set-Cookie", `access_token=${token}`);
    res.send("OK");
});*/

app.listen(port, () => console.log(`NodeJS Samen Eten Server is now running at http://localhost:${port}`));

