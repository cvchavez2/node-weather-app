const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoiY3ZjaGF2ZXoyIiwiYSI6ImNreGh3eDJpNzF5YzQzMG80ZXI0Y2xodDMifQ.cPe6iRjbftrN_3FaWbbB-A'

  request({ url, json: true }, (error, { body }) => {
    if(error){
      callback('unable to connect to geocode service', undefined)
    }else if(body.message === 'Not Found'){
      callback('no place found, please enter a value', undefined)
    }else if(body.features.length === 0){
      callback('unable to find location, please try another query', undefined)
    }
    else{
      const features = body.features[0]
      callback(undefined, {
        longitude: features.center[0],
        latitude: features.center[1],
        location: features.place_name
      })
    }
  })
}

module.exports = geocode

// const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/12warache.json?limit=1&access_token=pk.eyJ1IjoiY3ZjaGF2ZXoyIiwiYSI6ImNreGh3eDJpNzF5YzQzMG80ZXI0Y2xodDMifQ.cPe6iRjbftrN_3FaWbbB-A"

// request({url: geocodeurl, json: true}, (error, response) => {
//   if(error){
//     console.log('unable to connect to geocode service');
//   }else if(response.body.message === 'Not Found'){
//     console.log('no place found, please enter a value');
//   }else if(response.body.features.length === 0){
//     console.log('unable to find location, please try another query');
//   }
//   else{
//     const features = response.body.features[0]
//     const placeName = features.place_name
//     const lon = features.center[0]
//     const lat = features.center[1]
//     console.log(placeName);
//     console.log(lon);
//   }
// })