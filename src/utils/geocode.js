const request = require('request');
const geocode = (address, callback) =>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYW5odHVhbnNzc3MiLCJhIjoiY2s0M2tleGZ1MDh4MzNrcTQwa2R3OHp4ZSJ9.OU4xN-OhZ0Zz5UaRvv69iQ'
    request({url, json: true}, (err, {body}) => {
        if(err){
            callback("can't connect to server", undefined)
        }
        else if(body.features.length === 0){
            callback("can't find this address", undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
})
}
module.exports = geocode

