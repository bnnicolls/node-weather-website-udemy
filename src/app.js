const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '..//templates/partials')

//Setup Handlebars views and engine location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static Directory to Serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brandeezi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Brandeezi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Brandeezi',
        message: 'If you have any questions, reach out to me at brandeezi@appsarecool.com'
    })
})
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                forecastData,
                location,
                address
            })
        })
    })
    // res.send({
    //     forecast: "It is snwing",
    //     location: "New York",
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide search term"
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Whoops!',
        name: 'Brandeezi',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Whoops!',
        name: 'Brandeezi',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})