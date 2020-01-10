const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/79edbcd22f042317d10d24cc83e22286/${lat},${long}`
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })

}

module.exports = forecast