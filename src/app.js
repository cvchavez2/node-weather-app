const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
// allows us to set a value for a given express setting - in this case we use 'view engine' as the value and 'hbs' as the module
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
// static directory to put our assets 
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Carlos Chavez'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Carlos Chavez'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Carlos Chavez',
    helpText: 'This is some random text'
  })
})


app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  const placeName = req.query.address

  geocode(placeName, (error, { latitude, longitude, location } = {} ) => {
    if(error){
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, { weather, units, weatherDescription }) => {
      if(error){
        return res.send({ error })
      }
      return res.send({
        location,
        weatherMessage: 'Current temperature is: ' + weather.temperature + ' ' + units,
        weatherFeelsLikeMessage: 'outside it feels like: ' + weather.feelslike + ' ' + units,
        address: placeName,
        weatherDescription
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Carlos Chavez',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Carlos Chavez',
    errorMessage: 'Page Not Found'
  })
})

app.listen(port, () => {
  console.log('server is running on port: ' + port);
})