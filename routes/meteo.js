var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
    var city = req.query.city;
    var apiKey = req.query.apiKey;

    if(apiKey === undefined || apiKey === ""){
        return res.status(401).send("API Key is missing. Required");
    }

    if(city === undefined || city === ""){
        return res.status(400).send("City is missing. Required");
    }


    // router.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, (req, res, next) =>{
    //     console.log(req.body);
    // })

    
    request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, function(error, response, body){
        // console.error('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        // console.log('body:', body);
        return res.status(response.statusCode).send(body);
    })


})

module.exports = router;