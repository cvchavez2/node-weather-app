const request = require('request')

const forecast = (lat, lon, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=33cb6d56232b18d689460f5f60e210d4&query=' + lat + ',' + lon + '&units=f'

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('unable to fetch weather data', undefined)
    } else if(body.error){
      const weatherRequestErrorType = body.error.type
      callback('forecast request error: ' + weatherRequestErrorType, undefined)
    } else {
      const weather = body.current
      const location = body.location
      const units = body.request.unit
      callback(undefined, {
        weather,
        location,
        units
      })
    }
  })
}

module.exports = forecast

// const weatherurl = 'http://api.weatherstack.com/current?access_key=33cb6d56232b18d689460f5f60e210d4&query=79968&units=f'

// request({url: weatherurl, json: true}, (error, response) => {
//   if (error) {
//     console.log('unable to fetch weather data');
//   } else if(response.body.error){
//     const weatherRequestErrorType = response.body.error.type
//     console.log('request error: ' + weatherRequestErrorType);
//   } else {
//     const currentWeather = response.body.current
//     const location = response.body.location
//     const units = response.body.request.unit
//     console.log('location: ' + location.name);
//     console.log('current temperature is: ' + currentWeather.temperature + ' ' + units);
//     console.log('outside it feels like: ' + currentWeather.feelslike + ' ' + units);
//   }
// })