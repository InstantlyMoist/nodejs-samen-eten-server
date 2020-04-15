let http = require('http');



let server = http.createServer((req, res) => {
    let result = {
        'response': 'Hello World!',
        'status': 'Alles OK!'
    };
    res.statusCode = 200
    res.setHeader('Content-Type', 'applicationjson')
    res.end(JSON.stringify(result));
})

let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
