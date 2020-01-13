const request = require('request');

const forecast = (latitude, longitude, callback) => {
    url = `https://api.darksky.net/forecast/62b6406580375872c9b39aab19f15a24/${latitude},${longitude}`

    
    request({url, json: true}, (error, {body}) => {
        if (error) callback("can't connect to server", undefined)
        else if (body.error) callback("wrong latitude or longitude")
        else {
             callback(undefined, {
                temperature: body.currently.temperature,
                summary: body.currently.summary
            })
        }
    })
}
module.exports = forecast;