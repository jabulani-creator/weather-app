const request = require('postman-request')

const forecast = (longitude,latitude, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=7981ef644748db18aadf3a414a8febc3&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('unable to connect to weather service', undefined)
        } else if(body.error){
            callback('unable to find location. try another search', undefined)
        }else{
            const {weather_descriptions, temperature, feelslike} = body.current
            callback(undefined,`Weather is ${weather_descriptions}, it is ${temperature} degrees Fahreinheit, however it feels like ${feelslike} degrees Fahreinheit
              `)
        }
    })
  }

  module.exports = forecast