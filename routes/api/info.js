let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {    
    res.status(200).json({
        name: "Kyllian Warmerdam",
        studentNumber: "2158151",
        description: "This application is designed to bring people together, with food.",
        sonarCube: null
    });
});

module.exports = router;