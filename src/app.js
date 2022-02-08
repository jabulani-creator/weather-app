const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serv
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Laoying"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error){
        return res.send({error})
    }
    forecast(latitude, longitude, (error, forcastData) => {
        if(error){
           return res.send({error})
        }

        res.send({
            forecast: forcastData,
            location,
            address: req.query.address
        })
    })
    })

})

app.get('*',(req, res) =>{
 res.render('404',{
     title: '404',
     name: "Jabulani Charinga",
     errorMessage: 'Page Not Found'
 })
})

app.listen("3000", () => {
    console.log("server connected port 3000")
})