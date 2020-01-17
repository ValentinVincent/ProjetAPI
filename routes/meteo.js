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

    request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, function(error, response, body){
        // console.error('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        // console.log('body:', body);
        return res.status(response.statusCode).send(body);
    })
})

router.get('/coord', (req, res, next) => {
    var lat = req.query.lat;
    var long = req.query.long;
    var apiKey = req.query.apiKey;


    if(apiKey === undefined || apiKey === ""){
        return res.status(401).send("API Key is missing. Required");
    }

    if(lat === undefined || lat === "" || long === undefined || long === ""){
        return res.status(400).send("Nothing to Geocode.");
    }

    request(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`, function(error, response, body){
        return res.status(200).send(body);
    })
})

module.exports = router;