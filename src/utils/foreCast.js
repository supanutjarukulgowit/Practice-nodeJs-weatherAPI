const request = require('postman-request')

const foreCast = (latitude ,longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e32cf30d9e6cc05f42784d187b83a97a&query="+latitude+","+longitude+"&units=m"

    request({url : url, json : true}, (error, {body}) => {
        if(error){
            callback('cannot connect to forecast api.',undefined)
        }else if(body.error){
            callback('Unable to find location.',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions + " It is currently "+ body.current.temperature +" degrees.")
        }
    })
}

module.exports = foreCast