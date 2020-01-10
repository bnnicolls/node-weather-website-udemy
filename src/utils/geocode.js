const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYm5pY29sbHMiLCJhIjoiY2s1NW1zbTBpMDg4ajNvcW5ha2prYjd6MyJ9.kBx6_6Rrl2MaJuvWpvgmyQ&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to geolocation services!', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode