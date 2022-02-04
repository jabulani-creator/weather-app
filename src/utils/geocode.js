const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamFidWxhbmktY3JlYXRvciIsImEiOiJja3o1bHhpa3QwbjdxMnBxZnhiZnNsb3F1In0.A8gHaOeHC543NGJBnkv33A&limit=1`
    request({url, json: true}, (error , {body} ={}) => {
    if(error){
        callback('unable to connect to location service', undefined)
    }else if(body.features.length === 0){
        callback('unable to find location. try another search', undefined)
    }else{
        const {center, place_name} = body.features[0]
        callback(undefined, {
           latitude : center[1],
           longitude: center[0],
           location: place_name
        })
    }
    })
   }

   module.exports = geocode